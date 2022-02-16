import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Cart from "./eshop/core/Cart";
import Bestseller from "./eshop/core/Bestseller";
import Details from "./eshop/core/Details";
import Home from "./eshop/core/Home";
import Searchedproducts from "./eshop/core/Searchedproducts";
import PrivateRoutes from "./user/helper/PrivateRoute";
import Signin from "./user/Signin";
import SignUP from "./user/SignUP";
import { UserDashbord } from "./user/UserDashbord";

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <PrivateRoutes path="/user/dashboard" exact component={UserDashbord}/>
                
                <Route path="/Addtocard/" exact component={Cart}/>
            
                <Route path="/" exact component={Home}/>

                <Route path="/Bestproducts/" exact component={Bestseller}/>

                <Route path="/signUP/" exact component={SignUP}/>

                <Route path="/signin/" exact component={Signin}/>
                
                <Route path="/:searchURL/" exact component={Searchedproducts}/>

                <Route path="/product/:id/Details/" exact component={Details}/>
            
            </Switch>    
        </BrowserRouter>
    )
}

export default Routes;