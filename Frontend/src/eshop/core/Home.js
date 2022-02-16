import Base from './Base';
import Card from './Card';
import React, { useEffect, useState } from 'react';
import { getproducts } from './helper/coreapicall';

export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)  

  const getAllproducts = () =>{
    getproducts()
      .then((data) => {
        if(data?.error){
          setError(data.error);
          console.log(error);
        }
        else{
          setProducts(data);
        }
      });
  };


  useEffect(()=> {
    getAllproducts();
  }, []);

  return (
    <>
    <Base/>
    <div>
      <br/>
      <div className='container'>
        <div className='row row-cols-1 row-cols-md-4 g-4'>
        {products.map((product, index) => {
          return(
            <div key={index}>
              <Card product={product}/>
            </div>
          );
        })}
        </div>
      </div>
    </div></>    
  );
}
