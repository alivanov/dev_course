// node createKeypair.js -> generate public & private keys
// node main.js -> scenarion 1: encode with public key, decode with private key
// node verifyIdentity.js -> scenario 2: encode with private key, decode with public key

const fs = require('fs');

const encrypt = require('./encrypt');

const publicKey = fs.readFileSync(__dirname + '/id_rsa_pub.pem', 'utf8');

// Stores a Buffer object
const encryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'Super secret message');

console.log(encryptedMessage.toString()); // garbage!

//==================================================

const privateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const decrypt = require('./decrypt');

const decryptedMessage = decrypt.decryptWithPrivateKey(privateKey, encryptedMessage);

console.log(decryptedMessage.toString()); // good message!
