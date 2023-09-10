
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';

const LeaderBoard: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>LeaderBoard</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1>LeaderBoard</h1>
        
      </main>

    </div>
  );
};

export default LeaderBoard;
