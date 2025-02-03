const { query } = require('../config/db');
const jwt = require('jsonwebtoken');

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRadians = Math.PI / 180;

    if (
        typeof lat1 !== 'number' || typeof lon1 !== 'number' ||
        typeof lat2 !== 'number' || typeof lon2 !== 'number'
    ) {
        throw new Error('Invalid input: Coordinates must be numbers.');
    }

    const dLat = (lat2 - lat1) * toRadians;
    const dLon = (lon2 - lon1) * toRadians;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * toRadians) * Math.cos(lat2 * toRadians) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c * 1000;
};

const checkLocation = (userLat, userLon, allowedLocation) => {
    if (
        typeof userLat !== 'number' || typeof userLon !== 'number' ||
        !allowedLocation || typeof allowedLocation.latitude !== 'number' ||
        typeof allowedLocation.longitude !== 'number' || typeof allowedLocation.radius !== 'number'
    ) {
        throw new Error('Invalid input: Please provide valid coordinates and allowed location details.');
    }

    const { latitude, longitude, radius } = allowedLocation;
    const distance = calculateDistance(userLat, userLon, latitude, longitude);

    console.log(`Distance from allowed location: ${distance.toFixed(2)} meters`);

    return distance <= radius;
};

exports.checkIn = async (req, res) => {
    const id = req.user.id;
    const { location } = req.body;

    if (!id || !location || typeof location.latitude !== 'number' || typeof location.longitude !== 'number') {
        return res.status(400).json({ success: false, message: 'Missing or invalid fields: id or location.' });
    }
    let sql = "select employees.id as id from employees inner join users on employees.user_id = users.id where users.id = ?";
    const employee_id = await query(sql, id);

    const { latitude, longitude } = location;
    const allowedLocation = { latitude: 11.553558936718863, longitude: 104.9005196702826, radius: 1000 };

    if (!checkLocation(latitude, longitude, allowedLocation)) {
        return res.status(403).json({ success: false, message: 'You are not within the allowed location (1 km radius).' });
    }

    if (employee_id == 0) {
        return res.redirect(`/page-login?scanned=true&latitude=${latitude}&longitude=${longitude}`);
    }

    const currentTime = new Date();
    const hour = currentTime.getHours();
    const today = currentTime.toISOString().split('T')[0];

    try {
        const existingAttendance = await query(
            'SELECT * FROM attendances WHERE employee_id = ? AND DATE(checkin_time) = ?',
            [employee_id[0].id, today]
        );
        console.log(existingAttendance);

        console.log(hour);

        if (existingAttendance.length === 0) {
            let status;
            if (hour >= 1 && hour <= 2) {
                status = 2; // Present
            } else if (hour > 8 && hour <= 9) {
                status = 1; // Late
            } else if (hour >= 10 && hour < 13) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot check in after 10 AM. Try again after 1 PM.',
                });
            } else if (hour >= 13 && hour < 14) {
                status = 3; // Absent Half Day
            } else if (hour >= 14) {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot check in after 2 PM.',
                });
            } else {
                return res.status(400).json({ success: false, message: 'Outside valid check-in times.' });
            }

            await query(
                'INSERT INTO attendances (employee_id, status, checkin_time) VALUES (?, ?, ?)',
                [employee_id[0].id, status, currentTime]
            );

            return res.status(200).json({ success: true, message: 'Check-in recorded successfully' });
        } else {
            const record = existingAttendance[0];

            if (record.checkout_time != '0000-00-00 00:00:00') {
                return res.status(400).json({   
                    success: false,
                    message: 'You have already checked out today.',
                });
            }
            
            if (hour < 17 || hour > 18) {
                return res.status(400).json({
                    success: false,
                    message: 'Check-out is only allowed between 5 PM and 6 PM.',
                });
            }

            await query(
                'UPDATE attendances SET checkout_time = ? WHERE id = ?',
                [currentTime, record.id]
            );

            return res.status(200).json({ success: true, message: 'Check-out recorded successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error processing attendance.' });
    }
};