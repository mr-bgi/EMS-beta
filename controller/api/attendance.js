const { checkIn } = require("../../resource/attendance");

exports.scanAttendance = async (req, res) => {
    try {
        await checkIn(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
