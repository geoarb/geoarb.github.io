const loadPlaces = function (coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    // const method = 'api';
    const method = 'static';

    const PLACES = [
        {
            name: "Hello!",
            location: {
                lat: coords.latitude, // add here latitude if using static data
                lng: coords.longitude, // add here longitude if using static data
            }
        },
        {
            name: "Your place name",
            location: {
                lat: 53.953894, // add here latitude if using static data
                lng: 27.666209, // add here longitude if using static data
            }
        },
    ];

    if (method === 'api') {
        return loadPlaceFromAPIs(coords);
    }

    return Promise.resolve(PLACES);
};

window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

            // than use it to load from remote APIs some places nearby
            loadPlaces(position.coords)
                .then((places) => {
                    places.forEach((place) => {
                        const latitude = place.location.lat;
                        const longitude = place.location.lng;

                        const text = document.createElement('a-text');
                        text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                        text.setAttribute('value', 'Жыве Беларусь!');
                        text.setAttribute('position', '-1 0 -3');
                        text.setAttribute('color', '#FF0000');
                        // text.setAttribute('scale', '120 120 120');
                        // text.setAttribute('look-at', "[gps-camera]");
                        text.setAttribute('font', "arial-msdf.json");
                        text.setAttribute('negate', "false");
                        // // add place name
                        // const text = document.createElement('a-link');
                        // text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                        // text.setAttribute('title', place.name);
                        // text.setAttribute('href', 'http://www.example.com/');
                        // text.setAttribute('scale', '20 20 20');

                        text.addEventListener('loaded', () => {
                            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                        });

                        scene.appendChild(text);
                    });
                })
        },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
