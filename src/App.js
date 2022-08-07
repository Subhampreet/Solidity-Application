import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import {loadContract} from './utils/load-contacts';


function App() {
  const [web3Api, setWeb3Api] = useState({
    provider : null,
    web3: null,
    contract: null
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract =  await loadContract("Faucet", provider);


      if(provider) {
        // provider.request({method : "eth_requestAccounts"});
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract
        })  
      }
      else {
        console.error("Please, install Metamask");
      }

      //// Old Code without using the detectEthereumProvider Method
      // let provider = null;
      // if(window.ethereum){
      //   provider = window.ethereum;
      //   try{
      //     await provider.request({method : "eth_requestAccounts"});
      //   }
      //   catch {
      //     console.error("User denied accounts access!");
      //   }
      // } else if(window.web3) {
      //   provider = window.web3.currentProvider;
      // }
      // else if(!process.env.production){
      //   provider = new Web3.providers.HttpProvider("http://localhost:7545")
      // }

      // setWeb3Api({
      //   web3: new Web3(provider),
      //   provider
      // })      
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
          <div className='is-flex is-align-items-center'>
              <span>
                  <strong>Account:</strong>
              </span>
              <div className='ml-2'>
                {
                  account ? 
                  account: 
                  <button className='button is-warning ml-3 is-small' 
                      onClick={() => {
                        web3Api.provider.request({method : "eth_requestAccounts"});
                      }}
                  >
                      Connect Wallet
                  </button>
                }
              </div>
          </div>            
            <div className='balance-view is-size-2 mb-3'>
              Current Balance: <strong>10</strong> ETH
            </div>
            {/* <button className='btn mr-2' onClick={async() => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts)
            }}>Enable Ethereum</button> */}
            <button className='button is-primary mr-2'>Donate</button>
            <button className='button is-link'>Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
