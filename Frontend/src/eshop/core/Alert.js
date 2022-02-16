import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export function Alert(props) {
    
    return( 
        <div className="alert alert-success alert-dismissible fade show" style={{position: 'absolute'}} role="alert">
            <strong style={{color:"green"}}>☑️ Success!</strong> product successfully added into the cart...
        </div>
    );
}

export function NOproductAlert(props) {
    
    return( 
        <div className="container">
            <div className="alert alert-danger alert-dismissible fade show" style={{position: 'fixed'}} role="alert">
                <strong style={{color:"red"}}>🛑 warning!</strong> No products are added yet...
            </div>
        </div>
    );
}

export function Cartlength(props) {

    const [len, setLen] = useState('');

    useEffect(()=> {
        ItemFromCard();
      }, [len]);

    const ItemFromCard = () =>{
        let cart = []
        if(typeof window !== undefined){
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            setLen(cart.length);
        }
    };
  
    return( 
        <li className="nav-item">
            <Link className="nav-link activate" to='/Addtocard/' style={{color:"gold"}}><span class="badge" style={{backgroundColor:"gold", fontSize:"x-small", color:"black" }}>{len}</span><br/>Cart 🛒</Link>
        </li>
    );
}
