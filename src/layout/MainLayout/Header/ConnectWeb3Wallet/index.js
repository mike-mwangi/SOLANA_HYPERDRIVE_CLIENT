/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useAddress, ConnectWallet } from '@thirdweb-dev/react';

const ConnectWeb3Wallet = () => {
    const address = useAddress();

    return (
        <ConnectWallet theme="light" btnTitle="Connect Wallet">
            ...
        </ConnectWallet>
    );
};

export default ConnectWeb3Wallet;
