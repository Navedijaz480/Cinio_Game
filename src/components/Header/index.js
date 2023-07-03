import React, { useEffect, useState } from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connectToMetaMask, handleNetworkSwitch, getAccountAddress } from "../Connectivity/Connectivity";


import './index.scss';
function HomePage() {

  // const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("0");
  const [btnTxt, setBtTxt] = useState("Connect Wallet");

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum == 'undefined') {
      alert("No Metamask!")
    }
  }, []);

  const connectWallet = async () => {
    const message = 'Hello, Ai-Blockchain!';

    await connectToMetaMask();
    const isConnected = await handleNetworkSwitch("bsc");

    if (isConnected) {
      const accountAddress = await getAccountAddress();
      if (accountAddress) {
        const acc = await getAccountAddress();
        // Request MetaMask to sign the message
        await window.ethereum.request({
          method: 'personal_sign',
          params: [message, acc]
        });

        console.log("message",message)
        if (acc == "No Wallet") {
          setBtTxt("No Wallet");
        } else if (acc == "Wrong Network") {
          setBtTxt("Wrong Network");
        } else {
          setAccount(acc);
          setBtTxt("connected");
          console.log("acc", acc);
        }
      }
    }

  }


  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        {' '}
        <img src={require('assets/img/logo.png')} />{' '}
      </Col>
      <Col xs="4" className="logo" >
        <Link to="/" className="margin-12">
          HOME
        </Link>{' '}
        <span>/</span>
        <Link to="/about" className="margin-12">
          ABOUT
        </Link>{' '}
        <span>/</span>
        <Link to="/loginpage" className="margin-12">
          LOGIN
        </Link>
      </Col>
      <Col xs="4" className="logo" style={{ display: 'flex', flexDirection: 'column' }} >
        <a className="margin-12" onClick={connectWallet}>
          {btnTxt}
        </a>
        <span className="">
          {account?.substring(0, 4) +
            "..." +
            account?.substring(account?.length - 4)}
        </span>
      </Col>
    </Row>
  );
}

export default HomePage;