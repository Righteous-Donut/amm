// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const config = require('../src/config.json')

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens
const shares = ether

async function main() {

  // Fetch accounts
  console.log(`Fetching accounts & network \n`)
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]
  const investor1 = accounts[1]
  const investor2 = accounts[2]
  const investor3 = accounts[3]
  const investor4 = accounts[4]

  // Fetch Network
  const { chainId } = await ethers.provider.getNetwork()

  console.log(`Fetching token and transferring to accounts... \n`)

  // Fetch Dapp token
  const dapp = await ethers.getContractAt('Token', config[chainId].dapp.address)
  console.log(`Dapp Token fetched: ${dapp.address}\n`)

  // Fetch USD token
  const usd = await ethers.getContractAt('Token', config[chainId].usd.address)
  console.log(`USD Token fetched: ${usd.address}\n`)


  ////////////////////////////////////////////////////
  // Distribute Tokens to Investors
  //

  let transaction

  // Send dapp tokens to investor 1
  transaction = await dapp.connect(deployer).transfer(investor1.address, tokens(10))
  await transaction.wait()

  // Send usd tokens to investor 2
  transaction = await usd.connect(deployer).transfer(investor2.address, tokens(10))
  await transaction.wait()

  // Send dapp tokens to investor 3
  transaction = await dapp.connect(deployer).transfer(investor3.address, tokens(10))
  await transaction.wait()

  // Send dapp tokens to investor 4
  transaction = await usd.connect(deployer).transfer(investor4.address, tokens(10))
  await transaction.wait()


  ////////////////////////////////////////////////////
  // Add Liquidity
  //

  let amount = tokens(100)
  console.log(`Fetching AMM...\n`)

  // Fetch AMM
  const amm = await ethers.getContractAt('AMM', config[chainId].amm.address)
  console.log(`AMM fetched: ${amm.address}\n`)

  transaction = await dapp.connect(deployer).approve(amm.address, amount)
  await transaction.wait()

  transaction = await usd.connect(deployer).approve(amm.address, amount)
  await transaction.wait()

  // Deployer adds liquidity
  console.log(`Adding liquidity...\n`)
  transaction = await amm.connect(deployer).addLiquidity(amount, amount)
  await transaction.wait()

  ////////////////////////////////////////////////////
  // Investor 1 Swaps: Dapp --> USD
  //

  console.log(`Investor 1 Swaps...\n`)

  // Investor approves all tokens
  transaction = await dapp.connect(investor1).approve(amm.address, tokens(10))
  await transaction.wait()

  // Investor swaps 1 token
  transaction = await amm.connect(investor1).swapToken1(tokens(1))
  await transaction.wait()


  ////////////////////////////////////////////////////
  // Investor 2 Swaps: USD --> Dapp
  //

  console.log(`Investor 2 Swaps...\n`)
  // Investor approves all tokens
  transaction = await usd.connect(investor2).approve(amm.address, tokens(10))
  await transaction.wait()

  // Investor swaps 1 token
  transaction = await amm.connect(investor2).swapToken2(tokens(1))
  await transaction.wait()


  ////////////////////////////////////////////////////
  // Investor 3 Swaps: Dapp --> USD
  //

  console.log(`Investor 3 Swaps...\n`)

  // Investor approves all tokens
  transaction = await dapp.connect(investor3).approve(amm.address, tokens(10))
  await transaction.wait()

  // Investor swaps all 10 tokens
  transaction = await amm.connect(investor3).swapToken1(tokens(10))
  await transaction.wait()


  ////////////////////////////////////////////////////
  // Investor 4 Swaps: USD --> Dapp
  //

  console.log(`Investor 4 Swaps...\n`)
  // Investor approves all tokens
  transaction = await usd.connect(investor4).approve(amm.address, tokens(10))
  await transaction.wait()

  // Investor swaps 5 tokens
  transaction = await amm.connect(investor4).swapToken2(tokens(5))
  await transaction.wait()

  console.log(`Finished.\n`)
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
