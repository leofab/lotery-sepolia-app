import './App.css';
import web3 from './web3';
import lotery from './lotery';
import { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');
  let [players, setPlayers] = useState([]);
  let [balance, setBalance] = useState('');
  let [value, setValue] = useState(0);
  let [message, setMessage] = useState('');
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
  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage('Waiting on transaction success...');
    try {
      const accounts = await web3.eth.getAccounts();
      await lotery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
      setMessage('You have been entered!');
    } catch (error) {
      if (error.code === 4001) {
        console.error('User denied account access:', error);
        try {
          const errorMessage = JSON.parse(error.message).message;
          setMessage(errorMessage || 'User denied account access');
        } catch (parseError) {
          console.error('Error parsing error message:', parseError);
          setMessage('User denied account access');
        }
      } else {
        console.error('Error submitting data:', error);
        setMessage(error.message || 'Error submitting data');
      }
    }
  };

  return (
    <div className="App">
      <h2>Lotery Contract</h2>
      <p>
        This contract is managed by {manager}.<br />
        There are currently {players.length} people entered,
        competing to win {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <h4>Want to try your luck?</h4>
      <form onSubmit={onSubmit}>
        <label>Amount of ether to enter </label>
        <input type="number" value={value} onChange={event => setValue(event.target.value)} />
        <button>Enter</button>
      </form>
      <hr />
      <h1>{message}</h1>
    </div>
  );
}

export default App;
