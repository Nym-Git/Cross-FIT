import React, { useState, useEffect } from 'react';
import {LoadCart} from './helper/CardHelper';
import { isAuthenticated } from '../../user/helper/userapicall';
import Card from './Card';


const Cart = () => {
    //function(f) {return f}  **setReload explained here
    const[products, setProducts] = useState([]);

    useEffect(() =>{
        setProducts(LoadCart());
    }, []);
    

    const loadAllProducts = (products) =>{
        return(
            <div>
                {products.map((product, index)=> (
                    <Card 
                        key = {index} 
                        product={product} 
                        removefromCard={true} 
                        addtoCart={false}
                    />                
                ))}
            </div>
        );
    };


    return (
        <>
            {loadAllProducts(products)}
        </>    
        );
    };

export default Cart;
