import './App.css';
import web3 from './web3';
import lotery from './lotery';
import { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');
  let [players, setPlayers] = useState([]);
  let [balance, setBalance] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (web3 && web3.eth && web3.eth.net.isListening()) {
          const managerData = await lotery.methods.getManager().call();
          let playersData = await lotery.methods.getPlayers().call();
          let balanceData = await web3.eth.getBalance(lotery.options.address);
          setBalance(balanceData);
          setPlayers(playersData);
          setManager(managerData);
        } else {
          console.log('Web3 provider is not available or connected');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <h2>Lotery Contract</h2>
      <p>
        This contract is managed by {manager}.
        There are currently {players.length} people entered,
        competing to win {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
    </div>
  );
}

export default App;
