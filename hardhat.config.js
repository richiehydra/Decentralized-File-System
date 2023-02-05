require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:
  {
    ganache:
    {
      url:"http://127.0.0.1:7545",
      account:["4225d5733f9c906cda8691b98b23ec0bc6d72df7ccc2129880a0c915f875306f"]
    }
  }
};
