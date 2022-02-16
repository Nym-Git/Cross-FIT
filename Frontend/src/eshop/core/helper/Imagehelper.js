import React from 'react';

const Imagehelper = ({product}) => {

    const imageURL= product? product.product_image: "no image found";

    return( 
        <div className="rounded border border-success p-2">
            <div>                    
                {imageURL ?(
                    <img className="card-img-top" src={imageURL}/>):(
                        <div class="spinner-border text-danger" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    )
                }
            </div>
        </div>
        );};

export default Imagehelper;
