import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <>
      <div className='faucet-wrapper'>
        <div className='faucet'>
            <div className='balance-view is-size-2'>
              Current Balance: <strong>10</strong> ETH
            </div>
            <div className='btn mr-2'>Donate</div>
            <div className='btn'>Withdraw</div>
        </div>
      </div>
    </>
  );
}

export default App;
