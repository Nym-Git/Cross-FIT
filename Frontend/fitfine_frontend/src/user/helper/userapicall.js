import { Redirect } from "react-router-dom";
import {API} from "../../backend"
import {cartEpty} from "../../eshop/core/helper/CardHelper"


export const signup = (user) => {
    return fetch(`${API}user/`,{
        method: "POST",
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};


export const signin = (user) =>{
    const formData = new FormData();

    for(const name in user){
        console.log(user[name]);
        formData.append(name, user[name]);
    }

    return fetch(`${API}user/login/`,{
        method: "POST",
        body: formData,
    })
    .then((response) =>{
        console.log("SUCCESS",response);
        return response.json();
    })
    .catch(err=> console.log(err));
};

//authenticated or not
export const authenticate = (data, next) => {
    if(typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        // TODO: compare JWT with database jeson token
        next();
    }
};

export const isAuthenticated = () =>{
    if(typeof window == undefined){
        return false
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
};


export const signout = (next) =>{
    const userId = isAuthenticated() && isAuthenticated().user.id;

    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
        //cartEpty(() => {});
        //next();

        return fetch(`${API}user/logout/${userId}/`,{
            method:"GET"
        })
        .then(response =>{
            console.log("Signout Success: ", userId);
            next();
        })

        .catch(err => console.log(err));        
    }
}