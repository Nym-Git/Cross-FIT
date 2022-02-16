import React, { useState, useEffect } from 'react';
import {LoadCart} from './helper/CardHelper';
import { isAuthenticated } from '../../user/helper/userapicall';
import Card from './Card';
import Base from './Base';
import { NOproductAlert } from './Alert';
import PaymentB from './PaymentBR';
import { Link } from 'react-router-dom';

const Cart = () => {
    const[reload, setReload] = useState(false);
    const[products, setProducts] = useState([]);


    useEffect(() =>{
        setProducts(LoadCart());
    }, [reload]);
    

    const loadAllProducts = (products) =>{
        return(
            <>
            <Base/>
                <div className='container'>
                    { products.length >=1 && (<div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <b>Buy All --</b> <lable>  products from cart...</lable>  
                                </button>
                            </h2>
                            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <div className='container'>
                                        {isAuthenticated()? (<PaymentB products={products} setReload={setReload}/>):(<h5>please <Link to="/signin/" >login</Link> first...</h5>)}
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>)}
                        <div>
                        <br/>
                        <div className='row row-cols-1 row-cols-md-4 g-4'>
                            {products.map((product, index)=> (
                            <Card 
                                key = {index} 
                                product={product} 
                                removefromCard={true} 
                                addtoCard={false}
                                details={true}
                                buy={false}

                                reload={reload}
                                setReload={setReload}
                            />                
                            ))}
                        </div>
                    </div>
                </div>
            </>    
        );
    };


    return (
        <>
            {loadAllProducts(products)}
            <div className='container'>
                { products.length < 1 && <NOproductAlert/>}
            </div>
        </>    
    );
};

export default Cart;
