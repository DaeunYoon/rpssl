import Head from 'next/head';
import Navbar from './Navbar';

export default function Header() {
  return (
    <>
      <Head>
        <title>RPSSL</title>
        <meta
          content="Web3 Rock Paper Scissors Spock Lizard Game"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Navbar />
    </>
  );
}
