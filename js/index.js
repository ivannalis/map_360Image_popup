const IMG_FOLDER = "assets/images/"
const GEOJSON_FOLDER = "assets/geojson/location3.geojson"
const IMG_FORMAT = '.jpg'

mapboxgl.accessToken =
    'pk.eyJ1IjoiaXZhbm5hbGlzIiwiYSI6ImNrbzM0Y2c5ZjBzOTAydmpudXdtcnBuZTYifQ.BRwjq1JbwZfZOty3CnXTXA';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [109.32, -0.040], // starting position [lng, lat]
    zoom: 13 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    map.addSource("location", {
        "type": "geojson",
        "data": GEOJSON_FOLDER
    });

    map.addLayer({
        "id": "location",
        "type": "circle",
        "source": "location",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#ff0000"
        }
    });
});

var p = 'assets/images/location_1.png'
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['location'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }
    let feature = features[0];
    let popup = new mapboxgl.Popup({
            offset: [0, -15]
        })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<p>Location </p><h3 style="font-size:18px; font-weight:bold;">${feature.properties.Address}</h3><iframe width="569" height="383" allowfullscreen style="border-style:none;" src="http://127.0.0.1:5500/p360image.html?images=${IMG_FOLDER + feature.properties.img_loc}"></iframe> `) // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);

});
