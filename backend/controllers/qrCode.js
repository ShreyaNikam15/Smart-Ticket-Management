// Import required modules
import crypto from 'crypto';
import QRCode from 'qrcode';

// Function to generate a hash value
function generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

// Function to generate QR code
function generateQRCode(data) {
    QRCode.toFile('qrcode.png', data, function (err) {
        if (err) throw err;
        console.log('QR Code generated and saved as qrcode.png');
    });
}

// Input value for hashing
const input = 'shrey shah - 3 - 4 - 7';
const hashedValue = generateHash(input);
console.log(`Hashed Value: ${hashedValue}`);

// Generate the QR code for the hashed value
generateQRCode(hashedValue);
