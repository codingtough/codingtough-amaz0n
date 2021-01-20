import React from 'react';
import { useStateValue } from '../StateProvider';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import './Checkout.css';

function Checkout() {
   const [{ basket, user }] = useStateValue();

   return (
      <div className="checkout">
         <div className="checkout__left">
            <img 
               src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" 
               alt="" 
               className="checkout__ad"
            />
            <div>
               <h3>{ user && `Hello, ${user.email}` }</h3>
               {/* <h3>Hello, { user?.email || "Guest" }</h3> */}
               {/* <h3>Hello, { !user ? "Guest" : user.email }</h3> */}
               
                     
               <h2 className="checkout__title">
                  Your shopping basket
               </h2>
               
               {
                  basket.map((item, i) => (
                     <CheckoutProduct 
                        key={i}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                     />
                  ))
               }
            </div>
         </div>
         <div className="checkout__right">
            <Subtotal />
         </div>
      </div>
   )
}

export default Checkout;
