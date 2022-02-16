import React from 'react';

function Value(props){
    return (
        <div id='test1'>
            {props.searchURL}
        </div>
    )
}

const Abc = document.getElementById("test1").innerHTML;
console.log(Abc);

export default Value;
export {Abc};
