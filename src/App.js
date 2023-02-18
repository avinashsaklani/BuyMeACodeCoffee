import abi from "./contract/coffee.json"
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import coffee from "./coffee.png";
import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x7d9b9e61060c3d58f6db15783930dfe2e69b7f96";
      const contractAbi = abi.abi;
      try {
        const { ethereum } = window;
        //connect metamask
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install Metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  // console.log(state);
  return (
    <div style={{ height: "100%" }}>
      <img src={coffee} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account: {account}</small>
      </p>
      <div className="container">
        <Buy state={state}></Buy>
        <Memos state={state}></Memos>
      </div>
    </div>
  );
}

export default App;
