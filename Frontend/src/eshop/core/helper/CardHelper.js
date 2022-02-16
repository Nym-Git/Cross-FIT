import { Cartlength } from "../Alert";

//BY this code we can save data in browser on localserver
export const adItemToCard = (item, next) =>{
    let cart =[]
    if (typeof window !== undefined){
        if (localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item
        })
        localStorage.setItem("cart",JSON.stringify(cart));
        next();
    }
};


//BY this code we are able to get the stored cards  
export const LoadCart = () =>{
    if (typeof window !== undefined){
        if(localStorage.getItem("cart")){
            return JSON.parse(localStorage.getItem("cart"))
        }else{
            return []
        }
    }
};

//BY this code we can remove the card if it is purchesed
export const removeItemFromCard = productId =>{
    let cart = []
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product, i) =>{
            if(product.id === productId){
                cart.splice(i,1);
            }
        });
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    return cart;
};

//BY this code shows empty cards status
export const cartEpty = next =>{
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart", JSON.stringify(cart))
        next();
    }
};

