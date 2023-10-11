import { createRoot } from 'react-dom/client';

// third party
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// project imports
import App from 'App';
import { BASE_PATH } from 'config';
import { ConfigProvider } from 'contexts/ConfigContext';
import reportWebVitals from 'reportWebVitals';
import * as serviceWorker from 'serviceWorker';
import { persister, store } from 'store';

// Wallet integration
import { ThirdwebProvider, magicLink, metamaskWallet, phantomWallet } from '@thirdweb-dev/react';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
            <ConfigProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <ThirdwebProvider
                        supportedWallets={[
                            metamaskWallet(),
                            magicLink({
                                apiKey: process.env.REACT_APP_MAGIC_LINK_KEY
                            }),
                            phantomWallet()
                        ]}
                    >
                        <App />
                    </ThirdwebProvider>
                </BrowserRouter>
            </ConfigProvider>
        </PersistGate>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
