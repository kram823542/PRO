// hash-password.js
const bcrypt = require('bcryptjs');

// यह फंक्शन सिर्फ पासवर्ड हैश करेगा
async function hashPassword() {
    const plainPassword = 'admin123'; // आपका असली पासवर्ड
    
    // Salt generate करें (10 rounds)
    const salt = await bcrypt.genSalt(10);
    
    // पासवर्ड हैश करें
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    
    console.log('=================================');
    console.log('Original Password:', plainPassword);
    console.log('Hashed Password:', hashedPassword);
    console.log('=================================');
    console.log('\n✅ यह हैश वैल्यू MongoDB में डालनी है:');
    console.log(hashedPassword);
}

// फंक्शन को कॉल करें
hashPassword();