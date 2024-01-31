import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/layout/Navbar'
import {Provider} from 'react-redux';

import store from '../redux/store'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
    <Navbar/>
    <Component {...pageProps}/>
    </Provider>
  )

}

export default MyApp
