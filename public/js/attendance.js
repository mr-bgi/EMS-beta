
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
const decodedText = 'https://emsbeta.bgi.linkpc.net';

navigator.geolocation.getCurrentPosition(
    async (position) => {
        try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const jwtToken = getCookie('jwtToken');

            if (!jwtToken) {
                console.error("JWT Token is missing!");
                Swal.fire({
                    title: "Error",
                    text: "Authentication failed. Please log in again.",
                    icon: "error",
                    confirmButtonText: "OK"
                });
                return;
            }
            const response = await fetch(`${decodedText}/api/attendance/checkin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken}`
                },
                body: JSON.stringify({ location: { latitude, longitude } })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const currentTime = new Date().toLocaleTimeString();
                await Swal.fire({
                    title: "ស្កេនជោគជ័យ !!",
                    text: `${result.message} at ${currentTime}`,
                    icon: "success",
                    confirmButtonText: "ត្រឡប់ក្រោយ"
                });

                window.location.replace('http://emsbeta.bgi.linkpc.net/user/homepage');
            } else {
                throw new Error(result.message || "Unknown error occurred.");
            }
        } catch (error) {
            console.error("Check-in failed:", error.message);
            await Swal.fire({
                title: "ស្កេនបរាជ័យ !!",
                text: error.message || "Unable to process the request.",
                icon: "warning",
                confirmButtonText: "ត្រឡប់ក្រោយ"
            });
            window.location.replace('http://emsbeta.bgi.linkpc.net/user/scanner');
        }
    },
    (error) => {
        console.error("Geolocation error:", error.message);
        let errorMessage = "Failed to retrieve location. Please enable GPS and try again.";
        
        if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please enable location services for this site.";
            Swal.fire({
                title: "Permission Denied",
                text: "Please enable location services and allow location access for this site.",
                icon: "warning",
                confirmButtonText: "OK"
            });
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable. Try again later.";
        } else if (error.code === error.TIMEOUT) {
            errorMessage = "The request to get user location timed out. Please try again.";
        }

        Swal.fire({
            title: "Location Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK"
        });
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
);
