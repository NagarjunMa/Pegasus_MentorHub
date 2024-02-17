// import "../styles/globals.scss";

// // import type { AppProps } from "next/app";
// // import { wrapper } from "../store/store";

// import AllLayout from "../layout/all_layout";



// function MyApp({ Component, pageProps }) {

//   const Layout =

//     Component.layout || AllLayout;

//   return (


//       <Layout>

//         <Component {...pageProps} />

//       </Layout>


//   );

// }



// export default MyApp



// // export default MyApp;

import '../styles/globals.scss';
import store from '../redux/store';
import { Provider } from "react-redux";


function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp