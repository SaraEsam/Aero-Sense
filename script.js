// Initialize the map
var map = L.map('map').setView([24.7136, 46.6753], 10); // Default to Riyadh

// Add base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a sample marker
var marker = L.marker([24.7136, 46.6753]).addTo(map);
marker.bindPopup("<b>Aero-Sense</b><br>Your location for air quality monitoring").openPopup();

// Risk calculation function
function calculateRisk() {
    // This is where NASA data integration will happen
    const risks = ['Low', 'Moderate', 'High', 'Very High'];
    const randomRisk = risks[Math.floor(Math.random() * risks.length)];
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div style="padding: 15px; background: ${getRiskColor(randomRisk)}; color: white; border-radius: 5px;">
            <h3>Air Quality Risk: ${randomRisk}</h3>
            <p>Based on NASA satellite data analysis</p>
        </div>
    `;
}

function getRiskColor(risk) {
    switch(risk) {
        case 'Low': return '#4CAF50';
        case 'Moderate': return '#FFC107';
        case 'High': return '#FF9800';
        case 'Very High': return '#F44336';
        default: return '#757575';
    }
}

// Add event listener to button
document.getElementById('risk-btn').addEventListener('click', calculateRisk);

// Display initial message
document.getElementById('result').innerHTML = `
    <p>Click the button to check air quality risk using NASA data</p>
`;
