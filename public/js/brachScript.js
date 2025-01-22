$(document).ready(init);

function init() {
    var mymap = L.map('map').setView([11.5564, 104.9282], 13),
        lonSpan = $('#lon'),
        latSpan = $('#lat');

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ['a', 'b', 'c']
    }).addTo(mymap);

    var marker = L.marker([51.5, -0.09]).addTo(mymap);

    mymap.on('click', function (e) {
        lonSpan.text(e.latlng.lng);
        latSpan.text(e.latlng.lat);
        marker.setLatLng(e.latlng);

        console.log(`${e.latlng.lng}, ${e.latlng.lat}`);
    });

    $('#locate').on('click', function () {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                mymap.setView([lat, lon], 13);
                marker.setLatLng([lat, lon]);

                lonSpan.text(lon);
                latSpan.text(lat);
                console.log(`${lat}, ${lon}`);
            }
        );
    });
}