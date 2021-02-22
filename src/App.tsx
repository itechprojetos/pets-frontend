import React from "react";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from './styles/global'

import Routes from "./routes";
import store from "./store";
import ContextsWrapper from "./contexts/ContextsWrapper";

const App: React.FC = () => {
  // useEffect(() => {
  //     systemLogin()
  // }, [systemLogin])
  return (
    <Provider store={store}>
      <ContextsWrapper>
        <BrowserRouter>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </BrowserRouter>
      </ContextsWrapper>
    </Provider>
  );
};

export default App;

// const mapStateToProps = (state: any) => ({
//     systemSigned: state.auth.authStatus.systemSigned,
// })
//
// const mapDispatchToProps = (dispatch: any) =>
//     bindActionCreators({...AuthActions}, dispatch)
//
// export default connect(mapStateToProps, mapDispatchToProps)(App)
