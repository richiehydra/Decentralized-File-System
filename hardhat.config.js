require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:
  {
    goerli:
    {
      url:"https://eth-goerli.g.alchemy.com/v2/EvCOjfXBeb07BFM6jxozCsiM_ZBPB3iX",
      accounts:["8052ef8ba1b55124aaa6a41dbedf40c4f767cadeeedb4facc0be3b8a697c5061"]
    }
  }
};
