import { utils, Provider, Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

require("dotenv").config();

export default async function (hre: HardhatRuntimeEnvironment) {
  const provider = new Provider("https://testnet.era.zksync.dev");

  // The wallet that will deploy the token and the paymaster
  // It is assumed that this wallet already has sufficient funds on zkSync
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY);

  // The wallet that will receive ERC20 tokens
  const emptyWallet = Wallet.createRandom();
  console.log(`Empty wallet's address: ${emptyWallet.address}`);
  console.log(`Empty wallet's private key: ${emptyWallet.privateKey}`);

  const deployer = new Deployer(hre, wallet);

  // Deploying the ERC20 token
  const erc20Artifact = await deployer.loadArtifact("mUSDC");
  const erc20 = await deployer.deploy(erc20Artifact, ["mUSDC", "mUSDC", 18]);
  console.log(`ERC20 address: ${erc20.address}`);

  // Deploying the paymaster
  const paymasterArtifact = await deployer.loadArtifact("MyPaymaster");
  const paymaster = await deployer.deploy(paymasterArtifact, [erc20.address]);
  console.log(`Paymaster address: ${paymaster.address}`);

  console.log("Funding paymaster with ETH");
  // Supplying paymaster with ETH
  await (
    await deployer.zkWallet.sendTransaction({
      to: paymaster.address,
      value: ethers.utils.parseEther("0.01"),
    })
  ).wait();

  let paymasterBalance = await provider.getBalance(paymaster.address);

  console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

  // Deploying the Greeter contract
  const greeterContractArtifact = await deployer.loadArtifact("Greeter");
  const oldGreeting = "old greeting";
  const deployGreeter = await deployer.deploy(greeterContractArtifact, [
    oldGreeting,
  ]);
  console.log(`Greeter contract address: ${deployGreeter.address}`);

  // Supplying the ERC20 tokens to the empty wallet:
  await // We will give the empty wallet 5k mUSDC:
  (await erc20.mint(emptyWallet.address, "5000000000000000000000")).wait();

  console.log("Minted 5k mUSDC for the empty wallet");

  console.log(`Done!`);
}
