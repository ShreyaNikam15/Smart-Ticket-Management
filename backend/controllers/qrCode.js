// Import required modules
import crypto from 'crypto';
import QRCode from 'qrcode';
import mongoose from 'mongoose';
import User from '../models/User.js';  // Use the correct path with .js extension for ESM

// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Function to generate a hash value
function generateHash(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

// Function to generate QR code as a buffer
function generateQRCodeAsBuffer(data) {
    return new Promise((resolve, reject) => {
        QRCode.toBuffer(data, function (err, buffer) {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);  // Return the QR code as a buffer (binary data)
            }
        });
    });
}

// Function to create a new user and save the QR code image as binary
async function createUserWithQRCode() {
    try {
        // Input value for hashing
        const input = 'shrey shah - 3 - 4 - 7';
        const hashedValue = generateHash(input);
        console.log(`Hashed Value: ${hashedValue}`);

        // Generate the QR code as a binary buffer
        const qrCodeBuffer = await generateQRCodeAsBuffer(hashedValue);

        // Create a new user with the QR code image stored as binary data
        const newUser = new User({
            name: "Shrey Shah",
            phoneNo: "8978456512",
            isVerified: true,
            image: qrCodeBuffer.toString('base64'),  // Store the QR code as a base64 string
        });

        // Save the user to the database
        await newUser.save();
        console.log('User saved with QR code image successfully');
    } catch (error) {
        console.error('Error creating user with QR code:', error);
    }
}

// Call the function to create the user
createUserWithQRCode();
