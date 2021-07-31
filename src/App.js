// // Expense Tracker App project
// import './App.css';
// import React from 'react';
// import Header from './components/Header'
// import Balance from './components/Balance'
// import AccountSummary from './components/AccountSummary'
// import TransictionHistory from './components/TransictionHistory'
// import AddTransiction from './components/AddTransiction';
// import {GlobalProvider} from './context/store';

// function App() {
//     return (
//         <div className="">
//             <GlobalProvider>
//             <Header />
//             <div className="container">
//                 <Balance />
//                 <AccountSummary />
//                 <TransictionHistory />
//                 <AddTransiction />
//             </div>
//             </GlobalProvider>
//         </div>
//     )
// }

// export default App
import React from "react";
import Main from "./components/Main";
import Corona from "./components/Corona";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import UserProvider from './components/UserProvider.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          {/* <Route path="sag" component={<Main />} /> */}
          <Route path="/sag" component={() => <Main />} />
          <Route path="/corona" component={() => <Corona />} />
          <Redirect to="/sag" from="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
