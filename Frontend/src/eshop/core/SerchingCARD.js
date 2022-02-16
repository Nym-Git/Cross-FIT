import React from 'react';
import Imagehelper from './helper/Imagehelper';
import {Redirect} from 'react-router-dom';
import '../../style.css'
import { adItemToCard, removefromCard, removeItemFromCard } from './helper/CardHelper';

const isAuthanticated = true;

const Card = ({product, addtoCard=true, removefromCard=true}) => {
    
    const Title = product? product.product_name: "somthing went wrong";
    const Desc = product? product.product_description:"no Desc";
    const Rate = product? product.product_rate:"00 RS.";

    const addTOcard = () =>{
        if(isAuthanticated){
            adItemToCard(product, ()=> {})
            console.log('product is added');
        }
        else{
            console.log('error, by authenticating');
        }
    };

    const getAredirect = (redirect) => {
        if(redirect){
            return <Redirect to="/card"/>;
        }
    }

    const showADDtocard = (addTOcard) =>{
        return(
            addTOcard && (
                <button onClick={addTOcard} className="btn btn-outline-danger" type="submit" style={{float:"right"}}>ADD to CARD</button>
            )
        );
    };

    const showRemovefromcard = (removefromCard) =>{
        return(
            //TODO: hendle this too :: _id
            removefromCard && (
                <button onClick={()=>{ removeItemFromCard(product.id)  
                    console.log('removed product')}} className="btn btn-outline-success" type="submit" style={{float:"left"}}><b>RS.</b> {Rate}.00/</button>
            )
        );
    };


    return (
        <div>
            <div className="Border">
            <div className="card h-100">
                <Imagehelper className="card-img-top" product={product}/>
                <div className="card-body">
                    <p className="card-title">{Title}<hr/>
                        {showRemovefromcard(removefromCard)}
                        {showADDtocard(addTOcard)}        
                    </p>
                </div>
            </div>
            </div>
        </div>    
        );
    };

export default Card;
