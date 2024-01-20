import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap'
import { ethers } from 'ethers'

// Components
import Navigation from './Navigation';
import Loading from './Loading';

import { 
  loadProvider,
  loadNetwork,
  loadAccount,
  loadTokens,
  loadAMM 
} from '../store/interactions'



function App() {

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = await loadProvider(dispatch)

    // Fetch curreent network's chainId (e.g. hardhat: 31337, kavan: 42)
    const chainId = await loadNetwork(provider, dispatch)

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // Fetch current accounts from Metamask when changed
    window.ethereum.on('accountsChanged', async () => {
      await loadAccount(dispatch)
    })

    // Initiate contracts
    await loadTokens(provider, chainId, dispatch)
    await loadAMM(provider,chainId, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  }, []);

  return(
    <Container>
      <Navigation />

      <h1 className='my-4 text-center'>React Hardhat Template</h1>
      <>
        <p className='text-center'><strong>Your ETH Balance:</strong> 0 ETH</p>
        <p className='text-center'>Edit App.js to add your code here.</p>
      </>
    
    </Container>
  )
}

export default App;
