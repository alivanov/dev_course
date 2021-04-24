const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');

const myData = {
    firstName: 'John',
    lastName: 'Doe',
    securityNumber: 'NO! Never put personal info in a digitally signed message since this form of cryptography doen not hide the data!'
};

// String version of our data that can be hashed
const myDataString = JSON.stringify(myData);

// Sets the value on the hash object: requires string format, so we must convert our object to string
hash.update(myDataString);

// hashed data in Hexidecimal format
const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);

// the following data might be lagre... so we need to compress it like 'hashedData' above
// that work is done by JWT!
const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;