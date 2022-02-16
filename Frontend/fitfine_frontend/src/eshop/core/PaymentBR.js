import React, { useEffect, useState } from "react"
import {Redirect,Link} from "react-router-dom"
import {getmeToken, processPayment} from "./helper/paymentHelper"
import { createOrder } from "./helper/OrderHelper"
import {isAuthenticated, signout} from "../../user/helper/userapicall"

import DropIn from "braintree-web-drop-in-react";
import { cartEpty } from "./helper/CardHelper"

const PaymentB = ({
    products,
    reload = undefined,
    setReload = (f) => f,
}) =>{

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error : "",
        instance: {}
    })

    const username = isAuthenticated && isAuthenticated().user.name;
    const userId = isAuthenticated && isAuthenticated().user.id;
    const token = isAuthenticated && isAuthenticated().token;

    const getToken = (userId, token) =>{
        getmeToken(userId, token)
        .then((info) =>{
            console.log("info pree: ",info)
            if (info.error){
                setInfo({
                    ...info,
                    error: info.error,
                })
                signout(() => {
                    return <Redirect to="/" />;
                });
            }else{
                const clientToken = info.client_token; //clientToken
                setInfo({clientToken});   //clientToken: clienToken
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getAmount = () =>{
        let amount = 0;
        products.map(p=>{
            amount = amount + parseInt(p.product_rate);
        });
        return amount;
    };

    const onPurchase =() =>{
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
        .then((data)=>{
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response =>{
                if(response.error){
                    if(response.code == '1'){
                        console.log("Payment Failed")
                        signout(() =>{
                            return <Redirect to="/" />
                        })
                    }
                }else{
                    setInfo({...info,
                    success: response.success,
                    loading: false
                })
                console.log("PAYMENT SUCCESS")
                let product_names = ""
                products.forEach(function(cart){
                    product_names += cart.product_name + ","                    
                });
                const orderData = {
                    products: product_names,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                console.log("order DATA: ",orderData)
                createOrder(userId,token,orderData)
                .then(response => {
                    if (response.error){
                        if(response.code == '1'){
                            console.log("Order Failed")
                        }
                        signout(() =>{
                            return <Redirect to="/" />
                        })
                    } else {
                        if(response.success == true){
                            console.log("ORDER PLACED")
                        }
                    }
                })
                .catch(error =>{
                    setInfo({loading: false, success:false})
                    console.log("Order Failed", error)
                })
                cartEpty(()=>{
                    console.log("Cart is emptyed out!")
                })
                setReload(!reload)
                }
            })
            .catch(e => console.log(e))
        })
        .catch((e) => console.log("error NONCE",e))
    }

    const showbtnDropIn = () =>{
        return(
            <div>
                {info.clientToken !== null && products.length > 0? 
                    (
                    <div>
                        {/*console.log("info.instance test :", info.instance)*/}
                        <DropIn
                            options={{authorization: info.clientToken}}
                            onInstance={(instance) => (info.instance = instance)}
                        >  
                        </DropIn>
                        <button onClick={onPurchase} type="button" style={{float:"right"}} class="btn btn-success btn-lg">Click to PAY</button>
                        <br/><br/>
                    </div>
                    ):
                    (
                        <div className='container'>
                          <div className='container'><br/><br/>
                            <div class="spinner-border text-dark" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div><br/>
                          </div>
                        </div>
                    )
                }
            </div>
        )
    }

    return(
        <div>
            {isAuthenticated? (<h5 style={{color: 'gray'}}>Hello <b style={{color: 'goldenrod'}}>{username}</b>, your total Amount: <b style={{color:"black"}}> ${getAmount()}</b></h5>):(<h1>please <Link to="/signin/" >login</Link>...</h1>)}
            {isAuthenticated? (showbtnDropIn()):(<h1>todo erase</h1>)}
        </div>
    )
};

export default PaymentB;