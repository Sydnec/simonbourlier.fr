import '../styles/globals.css';
import Loader from '../components/Loader';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Loader />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
