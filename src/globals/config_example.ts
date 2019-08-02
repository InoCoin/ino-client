export const Environment = {
  production: false,
  api_version: 1,
  api_url: ''
}

export const FileTypes = {
  image: {
    type: 1,
    suportedTypes: ['image/jpeg', 'image/png', 'image/bmp'],
    maxSize: 10000000
  }
}

let contract = '';
let networkLink = '';
let chainId = 1;
let account = '';
let chainName = '';

if (Environment.production) {
  contract = "";
  networkLink = '';
  account = '';
  chainId = 1;
  chainName = '';
} else {
  contract = "";
  networkLink = '';
  account = '';
  chainId = 3;
  chainName = '';
}

export const PaymentMethods = {
  ether: {
    key: 'ether',
    name: 'Ethers',
    symbol: 'ETH'
  },
  bitcoin: {
    key: 'bitcoin',
    name: 'Bitcoins',
    symbol: 'BTC'
  }
}

export const Categories = {
  everything: {
    key: 'everything',
    name: 'Everything',
    color: '#2c96df'
  },
  technology: {
    key: 'technology',
    name: 'Technology',
    color: '#3F51B5'
  },
  mainStreet: {
    key: 'mainStreet',
    name: 'Main Street',
    color: '#FF9800'
  },
  food: {
    key: 'food',
    name: 'Food',
    color: '#10a267'
  },
  alcohol: {
    key: 'alcohol',
    name: 'Alcohol',
    color: '#dc2b1e'
  },
  hardware: {
    key: 'hardware',
    name: 'Hardware',
    color: '#053538'
  },
  software: {
    key: 'software',
    name: 'Software',
    color: '#0f7fce'
  },
  entertainment: {
    key: 'entertainment',
    name: 'Entertainment',
    colort: '#e47818'
  },
  retail: {
    key: 'retail',
    name: 'Retail',
    color: '#1871e4'
  },
  infrastructure: {
    key: 'infrastructure',
    name: 'Infrastructure',
    color: '#00823b'
  }
}

export const Sort = {
  popular: {
    key: 'popular',
    name: 'Popular'
  },
  new: {
    key: 'new',
    name: 'New Projects'
  },
  topFundedProjects: {
    key: 'topFundedProjects',
    name: 'Top Funded Projects'
  },
  financed: {
    key: 'financed',
    name: 'Financed Projects'
  }
}

export const Account = account;
export const Contract = contract;
export const NetworkLink = networkLink;
export const ChainId = chainId;
export const ChainName = chainName;
export const ScanTx = "https://etherscan.io/tx/";
export const PlayStoreUrl = `https://play.google.com/store/apps/details?id=platform.inocoin.eu`;
export const CoinLibAPI = 'https://coinlib.io/api/v1/coin';
export const Coin = 'INO';
export const Currency = 'USD';
export const ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_value", "type": "uint256" }], "name": "burn", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "burnFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "initialSupply", "type": "uint256" }, { "name": "tokenName", "type": "string" }, { "name": "tokenSymbol", "type": "string" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Burn", "type": "event" }];