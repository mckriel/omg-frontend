// Simple script to check raid progress data via API
const https = require('https');
const http = require('http');

// Use your existing backend API
const BACKEND_URL = 'http://iosws4sw80o408gc8k408g08.147.93.86.96.sslip.io';

// Function to make HTTP request
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        client.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function checkRaidProgressData() {
    try {
        console.log('Checking for raid progress data...\n');
        
        // Try to get general guild data first to see structure
        console.log('1. Checking main guild data structure:');
        const guildData = await makeRequest(`${BACKEND_URL}/data?limit=1`);
        
        if (guildData.data && guildData.data.length > 0) {
            const samplePlayer = guildData.data[0];
            console.log('Sample player fields:');
            console.log(Object.keys(samplePlayer).join(', '));
            
            // Check if there's any lockStatus data
            if (samplePlayer.lockStatus) {
                console.log('\nFound lockStatus data:');
                console.log(JSON.stringify(samplePlayer.lockStatus, null, 2));
            }
        }
        
        // Try the progression endpoint we added
        console.log('\n2. Trying guild/progression endpoint:');
        try {
            const progressData = await makeRequest(`${BACKEND_URL}/guild/progression`);
            console.log('Progression data:');
            console.log(JSON.stringify(progressData, null, 2));
        } catch (error) {
            console.log('Guild progression endpoint not available:', error.message);
        }
        
        // Check stats endpoints
        console.log('\n3. Checking available stats endpoints:');
        const endpoints = [
            '/stats/missing-enchants',
            '/stats/top-pvp', 
            '/stats/top-pve',
            '/stats/role-counts'
        ];
        
        for (const endpoint of endpoints) {
            try {
                const data = await makeRequest(`${BACKEND_URL}${endpoint}`);
                console.log(`\n${endpoint}:`, data.success ? 'Available' : 'Not available');
            } catch (error) {
                console.log(`${endpoint}: Error -`, error.message);
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

checkRaidProgressData();