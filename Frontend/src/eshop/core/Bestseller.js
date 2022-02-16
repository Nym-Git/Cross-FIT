import React, { useEffect, useState } from 'react';
import Base from './Base';
import Card from './Card';
import { getBESTproducts } from './helper/coreapicall';

export default function Bestseller() {

    const [bestproducts, setBestproducts] = useState([]);
    const [error , setError] = useState(false);

    const getAllbestproducts = () => {
        getBESTproducts()
        .then((data) => {
            if(data?.error){
                setError(data.error);
                console.log(error);
            }
            else{
                setBestproducts(data);
            }
        });
    };

    useEffect(()=> {
        getAllbestproducts();
    }, []);

  return (
  <div>
      <Base/>
      <br/>
      <div className='container'>
        <div class="row row-cols-1 row-cols-md-4 g-4">
        {bestproducts.map((product, index) => {
          return(
            <div key={index}>
              <Card product={product}/>
            </div>
          );
        })}
        </div>
      </div>
    </div>    
  );
}
