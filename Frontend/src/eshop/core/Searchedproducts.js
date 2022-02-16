import React, { useEffect, useState } from 'react';
import Base from './Base';
import { GetSEARCHproducts } from './helper/coreapicall';
import Card from './Card';
import { useParams } from 'react-router-dom';

export default function Searchedproducts() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const {searchURL} = useParams();

    const getAllproducts = () =>{
      GetSEARCHproducts(`${searchURL}`)
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

    //beacuse of timecompliaxcity
    
    useEffect(()=> {
      getAllproducts();
    }, []);
  
      
return (
    <>
    <Base/>
    <div>
      <br/>
      <div className='container'>
        { products && ( 
          <div class="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product, index) => {
            return(
              <div key={index}>
                  <Card product={product}/>
              </div>
            );
          })}
          </div>)
        }
        {products.length < 1 && 
          (<div className="alert alert-danger alert-dismissible fade show" style={{position: 'fixed'}} role="alert">
            <strong style={{color:"red"}}>🛑 warning!</strong> Searched product not avaible, please! try by the diffrent name...
          </div>)
        }
        
      </div>
    </div></>    
  );
}
    