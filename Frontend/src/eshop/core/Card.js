import React, { useState } from 'react';
import Imagehelper from './helper/Imagehelper';
import {Redirect, Link, useParams} from 'react-router-dom';
import '../../style.css'
import { adItemToCard, removefromCard, removeItemFromCard } from './helper/CardHelper';
import {showAlert} from './Home';
import { Alert } from './Alert';
import { isAuthenticated } from '../../user/helper/userapicall';

const Card = ({product, addtoCard=true, details=true, buy=false, removefromCard=false,
        reload = undefined,
        setReload = f =>f, //explain** function(f){ return f} 
    }) => {
    
    const Title = product? product.product_name: "somthing went wrong";
    const Desc = product? product.product_description:"no Desc";
    const Rate = product? product.product_rate:"00 RS.";

    const {id} = useParams();

    const[alert, setalert] = useState(false)

    function showAlert(){
        setalert(true)
        Alert()
    }

    

    const addTOcard = () =>{
        adItemToCard(product, ()=> {})
        console.log('product is added');
    };

    const showADDtocard = (addTOcard) =>{
        return(
            addtoCard && (
                <button  style={{float:"right"}} onClick={addTOcard} onClickCapture={showAlert} className='btn btn-default cart' type="submit">ADD to CARD</button>
            )
        );
    };

    const buyProduct = () =>{
        return(
            buy && (
                <button onClick={()=>{}} className='btn btn-default cart' type="submit" style={{float:"right"}}>Buy now!</button>
            )
        );
    };

    
    const Productdetails = () =>{
        return(
            details && (
                <Link className="btn btn-outline-success" to={`/product/${product.id}/Details/`} style={{float:"left"}}>See Details</Link>
            )
        );
    };

    const showRemovefromcard = (removefromCard) =>{
        return( 
            removefromCard && (
                <button onClick={()=>{ removeItemFromCard(product.id)
                    setReload(()=>(!reload)) //Reloading point
                    console.log('removed product')}} className="btn btn-danger" type="submit" style={{float:"right"}}>Remove Cart.</button>
            )
        );
    };


    
    return (
        <div>
            <div className="Border">
                <div className="card h-100">
                <Link to={`/product/${product.id}/Details/`} style={{float:"left"}}>
                    <Imagehelper className="card-img-top" product={product}/>       </Link>
                    <div>
                        {alert && <Alert/>}
                        <div className="card-body">
                            <p className="card-title">{product.product_name}<hr/>
                                {Productdetails()}
                                {buyProduct()}
                                {showRemovefromcard(removefromCard)}
                                {showADDtocard(addTOcard)}<br/>     
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        );
    };

export default Card;
