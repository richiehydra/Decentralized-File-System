import ContractABI from "./Components/Drive.json"
import './App.css';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Display from "./Components/Display";
import Upload from "./Components/Upload";
import Modal from "./Components/Modal";
function App() {
  const[modalOpen,setmodalOpen]=useState(null);
  const [address, setAddress] = useState(" ");
  const [State, setState] = useState({ provider: null, signer: null, contract: null })
  const contractAddress = "0x89C780564345c640214994A2Ac3C376036732C75";
  useEffect(() => {
    const connectWallet = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          //get the account
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          let account = accounts[0];
          setAddress(account);

          //providers,signers,contract instance
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, ContractABI.abi, provider, signer);
          setState({ provider, signer, contract });

          //onchanging account reloads the screen
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          })
          console.log(provider, signer, contract)
        }
        else {
          alert("Ethereum not Injected");
        }
      }
      catch (err) {
        console.log(err);
      }
    }

    connectWallet();
  }, [])
  return (
    <div className="App">
      {/* //Calling Modal Component */}
      {!modalOpen && (
        <button className="share" onClick={() => setmodalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setmodalOpen={setmodalOpen} State={State}  address={address}></Modal>
      )}
      <div className="bg"></div>
      <div className="bg2"></div>
      <div className="bg3"></div>
      <h1 style={{ color: "Blue" }}>Decentralized Google Drive </h1>
      <p style={{ color: "white" }}>

        Connected Address is: {address ? address : "Please Connect Account"}
      </p>


      {/* Calling Upload Component  */}
      <Upload State={State} address={address} />
      {/* Calling Display Component */}
      <Display State={State} address={address} />

    </div>
  );
}

export default App;
