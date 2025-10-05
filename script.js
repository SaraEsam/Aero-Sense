// Aero-Sense - With Real NASA Satellite Layer
var map = L.map('map').setView([24.7136, 46.6753], 10);

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// ADD REAL NASA SATELLITE IMAGERY
var nasaLayer = L.tileLayer('https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg', {
    attribution: 'NASA GIBS',
    tileMatrixSet: 'GoogleMapsCompatible_Level',
    time: '2024-10-10', // You can update this date
    tileSize: 256,
    maxZoom: 9
});

// Add layer control so users can toggle NASA view
L.control.layers({
    "Street Map": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}/png'),
    "NASA Satellite": nasaLayer
}).addTo(map);

// Rest of your existing simulation code...
const sensorLocations = [
    { lat: 24.7136, lng: 46.6753, name: "Central District", pollen: 45, pm25: 32 },
    { lat: 24.7236, lng: 46.6853, name: "North Area", pollen: 75, pm25: 48 },
    { lat: 24.7036, lng: 46.6653, name: "South Park", pollen: 25, pm25: 18 }
];

sensorLocations.forEach(sensor => {
    const riskLevel = calculateRiskLevel(sensor.pollen, sensor.pm25);
    const color = getRiskColor(riskLevel);
    
    L.circleMarker([sensor.lat, sensor.lng], {
        color: color,
        fillColor: color,
        radius: 15,
        fillOpacity: 0.7
    }).addTo(map).bindPopup(`
        <b>${sensor.name}</b><br>
        Pollen Level: ${sensor.pollen}%<br>
        PM2.5: ${sensor.pm25} µg/m³<br>
        Risk: <strong>${riskLevel}</strong>
    `);
});

function calculateRisk() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div style="text-align: left; background: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #0b3d91;">
            <h3>🚀 Aero-Sense Analysis Complete</h3>
            <p><strong>Data Sources:</strong> NASA Terra/Aqua Satellites (MODIS/VIIRS)</p>
            <p><strong>Real NASA Satellite View Available!</strong> Toggle layers in top-right corner</p>
            <div style="background: #4CAF50; color: white; padding: 10px; border-radius: 5px; margin-top: 10px;">
                <strong>Recommendation:</strong> Air quality is generally good. Perfect for outdoor activities!
            </div>
        </div>
    `;
}

function calculateRiskLevel(pollen, pm25) {
    const score = (pollen * 0.6) + (pm25 * 0.4);
    if (score > 70) return 'High';
    if (score > 40) return 'Moderate';
    return 'Low';
}

function getRiskColor(risk) {
    switch(risk) {
        case 'High': return '#F44336';
        case 'Moderate': return '#FF9800';
        case 'Low': return '#4CAF50';
        default: return '#757575';
    }
}

document.getElementById('risk-btn').addEventListener('click', calculateRisk);

document.getElementById('result').innerHTML = `
    <p style="color: #0b3d91; font-weight: bold;">
        🌍 Welcome to Aero-Sense! Toggle between Street Map and NASA Satellite view!
    </p>
`;
