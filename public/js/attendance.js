// let qrScanner;
// const startScanner = () => {
//     qrScanner = new Html5Qrcode("reader");
//     qrScanner.start(
//         { facingMode: "environment" },
//         {
//             fps: 10,
//             qrbox: { width: 300, height: 300 }
//         },
//         (decodedText, decodedResult) => {

//             if (!navigator.geolocation) {
//                 console.error("Geolocation is not supported by this browser.");
//                 return;
//             }


//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {

//                     const latitude = position.coords.latitude;
//                     const longitude = position.coords.longitude;
//                     const jwtToken = getCookie('jwtToken');

//                     if (!jwtToken) {
//                         console.error("JWT Token is missing!");
//                         return;
//                     }
//                     console.log(jwtToken);


//                     if (!decodedText || typeof decodedText !== "string") {
//                         console.error("Invalid backend URL:", decodedText);
//                         return;
//                     }

//                     const response = await fetch(decodedText, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             'Authorization': `Bearer ${jwtToken}`
//                         },
//                         body: JSON.stringify({ location: { latitude, longitude } })
//                     })
//                     stopScanner();
//                     const result = await response.json();
//                     if (result.success) {
//                         const currentTime = new Date();
//                         await Swal.fire({
//                             title: "ស្កេនជោគជ័យ !!",
//                             text: `${result.message} at ${currentTime}`,
//                             icon: "success",
//                             confirmButtonText: 'ត្រឡប់ក្រោយ'
//                         });
//                         window.location.href = 'http://localhost:3000/user/homepage';
//                     }
//                     else {
//                         await Swal.fire({
//                             title: "ស្កេនបរាជ័យ !!",
//                             text: result.message,
//                             icon: "warning",
//                             confirmButtonText: 'ត្រឡប់ក្រោយ'
//                         });
//                         window.location.href = 'http://localhost:3000/user/scanner';
//                     }

//                 },
//                 (error) => {
//                     console.error("Geolocation error:", error.message);
//                     messageElement.textContent = "Failed to retrieve location.";
//                 },
//                 { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//             );
//         }
//     ).catch(err => {
//         console.error("Camera Error:", err);
//     });

// };


// const stopScanner = () => {
//     if (qrScanner) {
//         qrScanner.stop().then(() => {
//             console.log("Scanner stopped.");
//         }).catch(err => {
//             console.error("Error stopping scanner: ", err);
//         });
//     }
// }


// function isValidUrl(url) {
//     try {
//         new URL(url);
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// window.onload = function () {
//     startScanner();
// };
// function Scanner() {
//     fetch('http://localhost:3000/user/homepage', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${jwtToken}`
//         },
//         body: JSON.stringify({ location: { latitude, longitude } })
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })
// }
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

const decodedText = 'http://localhost:3000';

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

                window.location.replace('http://localhost:3000/user/homepage');
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
            window.location.replace('http://localhost:3000/user/scanner');
        }
    },
    (error) => {
        console.error("Geolocation error:", error.message);
        let errorMessage = "Failed to retrieve location. Please enable GPS and try again.";

        // Handle specific error codes related to permissions
        if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access denied. Please enable location services.";
            // Suggest the user to enable the permission
            Swal.fire({
                title: "Permission Denied",
                text: "Please enable location services and allow location access for this site.",
                icon: "warning",
                confirmButtonText: "OK"
            });
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable. Try again later.";
        } else if (error.code === error.TIMEOUT) {
            errorMessage = "The request to get user location timed out.";
        }

        Swal.fire({
            title: "Location Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK"
        });
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
);
