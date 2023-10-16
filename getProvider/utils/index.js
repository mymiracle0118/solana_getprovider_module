// const bs58 = require("bs58");
const { Keypair } = require("@solana/web3.js");
const bs58 = require("bs58");

function loadWallefFromSecretKey(key) {

    let byte_array = bs58.decode(key)
    const loaded = Keypair.fromSecretKey(
        new Uint8Array(byte_array),
    );
    return loaded;
}

module.exports = {
    loadWallefFromSecretKey
}