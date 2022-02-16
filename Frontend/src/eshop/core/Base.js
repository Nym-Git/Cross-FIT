import React, { useState, Fragment } from 'react';
import {Link, Redirect} from "react-router-dom"
import { isAuthenticated, signout } from '../../user/helper/userapicall';
import { Cartlength} from './Alert';
import { ItemFromCard } from './helper/CardHelper';
import { GetSEARCHproducts } from './helper/coreapicall';
import Searchedproducts from './Searchedproducts';

export default function Base() {

    const user = isAuthenticated() && isAuthenticated().user.name;

    const [searchURL, setURL] = useState(null);

    function getSEARCHurl(val) {
        setURL(val.target.value);
        Searchedproducts(searchURL)
    }
    
  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{width: "100%"}}>
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><b style={{color:"gold"}}>Cross</b><b style={{color:"gold"}}>-</b><b style={{color:"red"}}>Fit</b></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Bestproducts/">Best Seller</Link>
                </li>
                {/*isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Account & Lists
                    </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" href="#">my profile</Link></li>
                            <li><Link className="dropdown-item" href="#">my Ordered products</Link></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><Link className="dropdown-item" href="/Addtocard/">ADD'ed cart Section</Link></li>
                        </ul>
                    </li>
                    </Fragment>
                )*/}                  
                <form className="d-flex" action={`/${searchURL}/`} style={{marginLeft: "20px"}} >
                    <input className="form-control me-1" style={{marginTop: "2.70px"}} type="search" onChange={getSEARCHurl} placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-warning" type='submit'>Search</button>                
                </form>
            </ul>
            
            <ul className="navbar-nav">
                {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link activate" to='/signUP/'>signin</Link>
                    </li>
                    </Fragment>
                )}

                <li className="nav-item">
                    {isAuthenticated() && (<Link className="nav-link activate" to='/' style={{marginRight:"20px"}}>Hello, <b style={{color:"white"}}>{user}</b></Link>)}
                </li>

                <li className="nav-item">
                    {isAuthenticated() && (<Link className="nav-link activate" to='/' onClickCapture={signout} style={{color:"red"}}>SignOut</Link>)}
                </li>
                
            </ul>
            <ul className='navbar-nav'>
                <Cartlength />        
            </ul>   
            </div>
        </div>
    </nav>
</div>);
};