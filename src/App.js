import logo from './logo.svg';
import './App.css';
import web3 from './web3';

import lotery from './lotery';
import { useEffect } from 'react';
import { accounts } from 'web3/lib/commonjs/eth.exports';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const manager = await lotery.methods.getManager().call({ from: accounts[0] });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
