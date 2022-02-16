import { API } from "../../../backend.js"


export const GetSEARCHproducts = (Searchable) => {

  return fetch(`${API}products/?search=${Searchable}`,{method: "GET"})
      .then((response)=>{
          return response.json();
      })
      .catch((err)=> console.log(err));
}

export const GetASINGLEproduct = (key) => {

  return fetch(`${API}products/${key}/`,{method: "GET"})
      .then((response)=>{
          return response.json();
      })
      .catch((err)=> console.log(err));
}

export const getproducts = () => {
  return fetch(`${API}products/`,{method: "GET"})
    .then((response)=>{
        return response.json();
    })
    .catch((err)=> console.log(err));
}

export const getBESTproducts = () => {
  return fetch(`${API}bestseller/products/`,{method: "GET"})
    .then((response)=>{
        return response.json();
    })
    .catch((err)=> console.log(err));
}




