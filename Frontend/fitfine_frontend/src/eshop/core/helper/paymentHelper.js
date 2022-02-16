import {API} from "../../../backend"

export const getmeToken = (userId, token) =>{
    return fetch(`${API}order/gettoken/${userId}/${token}/`,{
        method: "GET",
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err) =>{
        console.log(err);
    });
};


export const processPayment = (userId, token, paymentInfo) => {
    const formData = new FormData();

    for(const name in paymentInfo){
        formData.append(name, paymentInfo[name])
    }

    return fetch(`${API}order/process/${userId}/${token}/`,{
        method: "POST",
        body: formData
    })
    .then((response) =>{
        return response.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}