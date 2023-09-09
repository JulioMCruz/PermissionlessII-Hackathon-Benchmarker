import { useState, useEffect } from "react";
import { useAccount, useBlockNumber } from "wagmi";
import type { NextComponentType } from "next";
import styles from "../styles/Home.module.css";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import factoryAbi from "../abi/AAFactory.json";
const factoryAddress = process.env.NEXT_PUBLIC_AA_FACTORY;
const serverWalletAddress = process.env.NEXT_PUBLIC_SERVER_WALLET;
const testSalt =
  "0x00000000000000000000000000000000000000000000000000000000testSalt";

const TestAA: NextComponentType = () => {
  const { data: blockData, isLoading: blockLoading } = useBlockNumber();
  const { address, isConnected } = useAccount();
  const [salt, setSalt] = useState<string>("");
  const { config } = usePrepareContractWrite({
    address: factoryAddress,
    abi: factoryAbi.abi,
    functionName: "deployAccount",
    args: [salt, address, serverWalletAddress],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (blockData) {
      const blockNumber = blockData.toString(16);
      setSalt(
        testSalt.substring(0, testSalt.length - blockNumber.length) +
          blockNumber
      );
    }
  }, [blockData, blockLoading]);

  const createAAWallet = async () => {
    console.log("making wallet", write);
    write?.();
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>Connected: {isConnected?.toString()}</div>
        <div>Address: {address}</div>
        <button
          className={styles.btn}
          onClick={createAAWallet}
          disabled={isLoading || isSuccess}
        >
          Create Account
        </button>
      </main>
    </div>
  );
};

export default TestAA;
