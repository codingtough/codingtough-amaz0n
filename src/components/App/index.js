import Header from '../Header';
import Home from '../Home';
import Checkout from '../Checkout';
import Login from '../Login';
import Payment from '../Payment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { auth } from '../Firebase';
import { useStateValue } from '../StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from '../Orders';

const promise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function App() {
   const [{}, dispatch] = useStateValue();

   useEffect(() => {
      auth.onAuthStateChanged(authUser => {
         if(authUser){
            //The user just logged in / the user was logged in
            dispatch({
               type: "SET_USER",
               user: authUser
            })
         } else {
            //The user is logged out
            dispatch({
               type: "SET_USER",
               user: null
            })
         }
      })
   }, []);

  return (
    <div className="app">
       <Router>

         <Switch>

            <Route path="/orders">
               <Header />
               <Orders />
            </Route>

            <Route path="/login">
               <Login />
            </Route>

            <Route path="/checkout">
               <Header />
               <Checkout />
            </Route>

            <Route path="/payment">
               <Header />
               <Elements stripe={promise}>
                  <Payment />
               </Elements>
            </Route>
            
            <Route path="/">
               <Header />
               <Home />
            </Route>

         </Switch>

       </Router>
    </div>
  );
}

export default App;
