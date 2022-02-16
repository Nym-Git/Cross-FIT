import {API} from "../../../backend"

export const createOrder = (userId, token, orderData) =>{
    const formData = new FormData();

    //name is just a value like we do pyton 'i', ohk!
    for(const name in orderData){
        formData.append(name, orderData[name])
    }
    
    return fetch(`${API}order/addorder/${userId}/${token}/`,{
        method: "POST",
        body: formData,
    })
    .then((response)=>{
        return response.json();
    })
    .catch(err => console.log(err));
}