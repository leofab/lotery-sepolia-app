import Web3 from 'web3';

let web3;

// Check if MetaMask's Ethereum provider is available
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // Request account access if needed
    window.ethereum.enable().catch(error => {
        console.error('User denied account access:', error);
    });

    // Initialize Web3 with MetaMask's provider
    web3 = new Web3(window.ethereum);

    // Handle provider change (if MetaMask's provider changes)
    window.ethereum.on('accountsChanged', function (accounts) {
        // Reload the page or handle account change as needed
        window.location.reload();
    });
} else {
    // Fallback if no MetaMask is detected
    console.warn('MetaMask is not installed!');
    // Use Infura or other provider if MetaMask is not available
    const provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/c0e92b8c927e4421bf01f62fb85487d4');
    web3 = new Web3(provider);
}

export default web3;