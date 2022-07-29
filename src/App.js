import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider : null,
    web3: null
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;
      if(window.ethereum){
        provider = window.ethereum;
        try{
          await provider.request({method : "eth_requestAccounts"});
        }
        catch {
          console.error("User denied accounts access!");
        }
      } else if(window.web3) {
        provider = window.web3.currentProvider;
      }
      else if(!process.env.production){
        provider = new Web3.providers.HttpProvider("http://localhost:7545")
      }

      setWeb3Api({
        web3: new Web3(provider),
        provider
      })      
    }

    loadProvider()
  }, [])

  useEffect(() => {
    const getAccounts = async() => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }

    web3Api.web3 && getAccounts()
  }, [web3Api.web3])



  return (
    <>
      <div className='faucet-wrapper'>
        <div className='faucet'>
            <span>
              <strong>Account:</strong>
            </span>
            <h1>
              {account ? account: "not connected"}
            </h1>
            <div className='balance-view is-size-2'>
              Current Balance: <strong>10</strong> ETH
            </div>
            {/* <button className='btn mr-2' onClick={async() => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts)
            }}>Enable Ethereum</button> */}
            <button className='btn mr-2'>Donate</button>
            <button className='btn'>Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
