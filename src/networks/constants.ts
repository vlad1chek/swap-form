export const MAINNET_NETWORK_ID = 1
export const ROPSTEN_NETWORK_ID = 3

type Network = {
    [id: string]: {
        EXPLORER: string
        RPC_URI: string
        name: string
        accepted: boolean
        testnet: boolean
    }
}

const Networks: Network = {
    [MAINNET_NETWORK_ID]: {
        EXPLORER: 'https://etherscan.io',
        RPC_URI: 'https://mainnet.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY,
        name: 'Ethereum Mainnet',
        accepted: true,
        testnet: false,
    },
    [ROPSTEN_NETWORK_ID]: {
        EXPLORER: 'https://ropsten.etherscan.io',
        RPC_URI:
            'https://ropsten.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY,
        name: 'Ropsten Testnet',
        accepted: true,
        testnet: true,
    },
}

export default Networks
