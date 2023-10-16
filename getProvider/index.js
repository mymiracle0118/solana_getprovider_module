const anchor = require("@project-serum/anchor");
const {initializeProvider} = require("./dist/anchorprovider");

const getProvider = (conn, key, confirmOption) => {
  const adminWallet = initializeProvider(key);
  const provider = new anchor.Provider(conn, adminWallet, confirmOption);
  return provider;
}

module.exports = {getProvider}