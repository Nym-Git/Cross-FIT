import Base from './Base';
import React, { useEffect, useState } from 'react';
import { GetASINGLEproduct } from './helper/coreapicall';
import { useParams } from 'react-router-dom';
import "../../style.css";
import rating from "./star.png"
import { adItemToCard} from './helper/CardHelper';


export default function Details() {

  const [product, setProducts] = useState([])
  const [error, setError] = useState(false)

  const {id} = useParams();

  const getSINGLEproduct = () =>{
    GetASINGLEproduct(`${id}`)
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

  const addTOcard = () =>{
    adItemToCard(product, ()=> {})
    console.log('product is added');
  };

  const showADDtocard = (addTOcard) =>{
    return(
        addTOcard && (
          <button type='button' id='button' className='btn btn-default cart' onClick={addTOcard}>
            Add to cart</button>
        )
    );
  };


  useEffect(()=> {
    getSINGLEproduct();
  }, []);




  return (
    <>
    <Base/> 
      <div className='container'>
        <div className='row'>
          <div className='col-md-5'>
            <div id='carouselExampleControles' className='carousel selide' data-ride="carousel">
              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div className='container'>
                    {!product.product_image && (
                        <div className='container'>
                          <div className='container'><br/><br/>
                            <div class="spinner-border text-dark" role="status">
                              <span class="visually-hidden">Loading...</span>
                            </div><br/>
                          </div>
                        </div>
                    )}
                    
                    {product.product_image && (
                      <img class="d-block w-100" src={product.product_image} alt="product image"/>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-7'>
            <div className='container'>
              <p className='newarrival text-center'>NEW</p>
              <h2 style={{color: "black"}}>{product.product_name}</h2>
              <p>{product.product_description}</p>
              <img className='star' src={rating} />
              <p className='price'>USD ${product.product_rate}</p>
              <p><b>Availability: </b>{product.product_aviablity < 1 && <div><br/><div className='alert alert-danger' role='alert'><p style={{marginLeft: "5%"}}>SoldOUT ! </p></div></div>}  {product.product_aviablity > 1 && <>Avaible</>}</p>
              <p><b>Condition: </b>New</p>
              <p><b>Brand: </b>{product.product_brand_name}</p>
              <label>Quantity: </label>
              <input id='DetailsInput' type="text" value="1"/>
              
              {showADDtocard(addTOcard)}
              <br/><br/>
              {product.product_aviablity < 1 && <div>
                <button type='button' disabled className='btn btn-default cart'>
                Buy now</button>
              </div>}
              {product.product_aviablity > 1 && <div>
                <button type='button' className='btn btn-default cart'>
                Buy now</button>
              </div>}
              
            </div>
            <br/>
          </div>
        </div>
      </div>
    </>    
  );
}