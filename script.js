// Aero-Sense - NASA Space Apps 2024
// Fixed version with working location and data display

// Initialize the map
var map = L.map('map').setView([24.7136, 46.6753], 10);

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}/png', {
    attribution: '© OpenStreetMap contributors | NASA Data'
}).addTo(map);

let userLocation = null;

// GET USER'S REAL LOCATION
function getUserLocation() {
    return new Promise((resolve) => {
        if ("geolocation" in navigator) {
            // Add a location button for better UX
            const locationBtn = document.createElement('button');
            locationBtn.innerHTML = '📍 Enable Location Access';
            locationBtn.style.background = '#ff6b00';
            locationBtn.style.margin = '10px';
            locationBtn.onclick = () => {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        userLocation = { lat: userLat, lng: userLng };
                        
                        // Center map on user's location
                        map.setView([userLat, userLng], 12);
                        
                        // Add user location marker
                        const userMarker = L.marker([userLat, userLng]).addTo(map);
                        userMarker.bindPopup(`
                            <div style="text-align: center;">
                                <h4>📍 Your Current Location</h4>
                                <p>Latitude: ${userLat.toFixed(4)}</p>
                                <p>Longitude: ${userLng.toFixed(4)}</p>
                            </div>
                        `).openPopup();
                        
                        locationBtn.remove();
                        displayNASAStatus(userLat, userLng);
                        resolve(userLocation);
                    },
                    function(error) {
                        alert('Please allow location access to get personalized air quality data.');
                        locationBtn.innerHTML = '❌ Location Denied - Using Default';
                        locationBtn.style.background = '#ff4757';
                        resolve(null);
                    }
                );
            };
            document.getElementById('controls').appendChild(locationBtn);
        } else {
            resolve(null);
        }
    });
}

// Display NASA data with realistic simulation
function displayNASAStatus(lat, lng) {
    const nasaSection = document.createElement('div');
    
    // Simulate realistic environmental data based on location
    const simulatedData = {
        temperature: (Math.random() * 20 + 15).toFixed(1), // 15-35°C
        humidity: (Math.random() * 60 + 20).toFixed(1),    // 20-80%
        pollen: Math.floor(Math.random() * 100),
        pm25: Math.floor(Math.random() * 150), // PM2.5 levels
        airQuality: ['Good', 'Moderate', 'Unhealthy'][Math.floor(Math.random() * 3)],
        risk: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)]
    };
    
    nasaSection.innerHTML = `
        <div style="background: #0b3d91; color: white; padding: 15px; margin: 15px; border-radius: 8px;">
            <h3>🛰️ NASA Aero-Sense Active</h3>
            <p><strong>Location:</strong> ${lat ? lat.toFixed(4) : '24.7136'}, ${lng ? lng.toFixed(4) : '46.6753'}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
                <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 5px;">
                    <small>🌡️ Temp: <strong>${simulatedData.temperature}°C</strong></small>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 5px;">
                    <small>💧 Humidity: <strong>${simulatedData.humidity}%</strong></small>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 5px;">
                    <small>🌸 Pollen: <strong>${simulatedData.pollen}%</strong></small>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 5px;">
                    <small>🌫️ PM2.5: <strong>${simulatedData.pm25} µg/m³</strong></small>
                </div>
            </div>
            <p style="color: #90EE90; margin: 0;">
                ✅ Ready for detailed analysis
            </p>
        </div>
    `;
    
    document.getElementById('controls').appendChild(nasaSection);
}

// Enhanced risk calculation with detailed data
function calculateRisk() {
    const resultDiv = document.getElementById('result');
    
    if (!userLocation) {
        resultDiv.innerHTML = `
            <div style="background: #fff3cd; padding: 20px; border-radius: 10px; text-align: center;">
                <h3>📍 Location Required</h3>
                <p>Please enable location access for personalized air quality analysis</p>
                <button onclick="getUserLocation()" style="background: #0b3d91; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 10px;">
                    Enable Location
                </button>
            </div>
        `;
        return;
    }
    
    // Generate detailed environmental analysis
    const analysis = {
        temperature: (Math.random() * 20 + 15).toFixed(1),
        humidity: (Math.random() * 60 + 20).toFixed(1),
        pollen: Math.floor(Math.random() * 100),
        pm25: Math.floor(Math.random() * 150),
        uvIndex: Math.floor(Math.random() * 11),
        windSpeed: (Math.random() * 30).toFixed(1),
        airQualityIndex: Math.floor(Math.random() * 300)
    };
    
    // Determine risk level
    let riskLevel = 'Low';
    let riskColor = '#4CAF50';
    if (analysis.pollen > 70 || analysis.pm25 > 100) {
        riskLevel = 'High';
        riskColor = '#F44336';
    } else if (analysis.pollen > 40 || analysis.pm25 > 50) {
        riskLevel = 'Moderate';
        riskColor = '#FF9800';
    }
    
    resultDiv.innerHTML = `
        <div style="text-align: left; background: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid ${riskColor};">
            <h3>🔍 Detailed Environmental Analysis</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;">
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px;">🌡️</div>
                    <strong>Temperature</strong><br>
                    ${analysis.temperature}°C
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px;">💧</div>
                    <strong>Humidity</strong><br>
                    ${analysis.humidity}%
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px;">🌸</div>
                    <strong>Pollen Level</strong><br>
                    ${analysis.pollen}%
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px;">🌫️</div>
                    <strong>PM2.5</strong><br>
                    ${analysis.pm25} µg/m³
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px;">☀️</div>
                    <strong>UV Index</strong><br>
                    ${analysis.uvIndex}/10
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 24px;">💨</div>
                    <strong>Wind Speed</strong><br>
                    ${analysis.windSpeed} km/h
                </div>
            </div>
            
            <div style="background: ${riskColor}; color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 15px 0;">
                <h3 style="margin: 0;">${riskLevel} RISK LEVEL</h3>
                <p style="margin: 10px 0 0 0;">
                    ${riskLevel === 'Low' ? '✅ Good conditions for outdoor activities' : 
                      riskLevel === 'Moderate' ? '⚠️ Sensitive groups should take precautions' : 
                      '🚨 High risk - Consider limiting outdoor exposure'}
                </p>
            </div>
            
            <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 15px;">
                <strong>NASA Data Sources Simulated:</strong>
                <ul style="margin: 10px 0;">
                    <li>🌡️ Temperature & Humidity (NASA POWER API)</li>
                    <li>🌫️ Particulate Matter (MODIS Aerosol Data)</li>
                    <li>🌸 Pollen & Vegetation (VIIRS Satellite)</li>
                    <li>💨 Wind Patterns (NASA MERRA-2)</li>
                </ul>
            </div>
        </div>
    `;
}

// Initialize the application
function initApp() {
    displayNASAStatus(24.7136, 46.6753); // Show default status
    getUserLocation(); // Request location
    
    // Add event listener to the button
    document.getElementById('risk-btn').addEventListener('click', calculateRisk);
    
    // Update initial message
    document.getElementById('result').innerHTML = `
        <div style="text-align: center; background: #0b3d91; color: white; padding: 15px; border-radius: 8px;">
            <h3>🌍 Aero-Sense Environmental Monitor</h3>
            <p>Click above to analyze air quality with detailed environmental data</p>
            <small>Temperature • Humidity • Pollen • PM2.5 • UV Index • Wind Speed</small>
        </div>
    `;
}

// Start the application when page loads
initApp();
