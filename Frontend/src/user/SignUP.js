import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from './helper/userapicall';
import { useState } from 'react';
import Base from '../eshop/core/Base';

const SignUP = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
      });
    
    // Make sure the email is extracted from values
    const { name, email, password, error, success } = values;
    
    // Make sure the handleChange is getting triggered on change
      const handleChange = (name) =>
        (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
        };
    
    // check for the values getting set and sent, you can add some console.log() statements
      const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false });
        
        signup({ name, email, password })
          .then((data) => {
            console.log("DATA", data);
            if (data.email === email) {
              setValues({
                ...values,
                name: "",
                email: "",
                password: "",
                error: "",
                success: true,
              });
            } else {
              setValues({
                ...values,
                error: true,
                success: false,
              });
            }
          })
          .catch((e) => console.log(e));
      };

    const successMessage = () =>{
      return(
        <div className='row'><br/>
          <div className='col-md-6 offset-sm-3 text-left' style={{display: success ? "" :"none"}}><br/>
            <div className='alert alert-success'>
            ☑️ New account hasbeen created successfully, please <Link to="/signin/">login</Link> now.
            </div>
          </div>
        </div>
      )
    }

    const errorMessage = () =>{
      return(
        <div className='row'>
          <div className='col-md-6 offset-sm-3 text-left' style={{display: error ? "" :"none"}}>
            <div className='alert alert-danger'>
            🛑 please! check the fields and try again.
            </div>
          </div>
        </div>
      )
    }

    const signUpFrom = () =>{
        return(
            <div className='container'>
                <div className='text-center'>
                    <h1>SignUP</h1>
                </div>
                <div className='col-md-6 offset-sm-3 text-left'>
                    <form>
                      <hr/>
                        <div className='from-group'><br/>
                            <lable className='text-dark' ><b>your Full name</b></lable><br/>
                            <input
                                className='form-control'
                                value={name}
                                onChange={handleChange("name")}
                                type="text"
                                placeholder='Nema Chandra Goswami'
                            />
                        </div>
                        <div className='from-group'><br/>
                            <lable className='text-dark'><b>your email</b></lable>
                            <input
                                className='form-control'
                                value={email}
                                onChange={handleChange("email")}
                                type="text"
                                placeholder='example@gmail.com'
                            />
                        </div>
                        <div className='from-group'><br/>
                            <lable className='text-dark'><b>set A password</b></lable>
                            <input
                                className='form-control'
                                value={password}
                                onChange={handleChange("password")}
                                type="password"
                                placeholder='passWORD@!#$1234'
                            />
                            <br/>
                        </div>
                        <div>

                          <ul style={{fontSize: "small"}}>
                            <li>Your password can’t be too similar to your other personal information.</li>
                            <li>Your password must contain at least 8 characters.</li>
                            <li>Your password can’t be a commonly used password.</li>
                            <li>Your password can’t be a commonly used password.</li>
                          </ul> 

                        </div>
                        <div>
                          <label style={{color:"black"}}>By continuing, you agree to <b style={{color:"red"}}>FITnessCLUB</b> Conditions of Use and <b>Privacy Notice</b>.</label><br/><br/>
                          <lable style={{fontSize: "small", float:"right"}}><Link to="/signin/"><b>login</b></Link> please, if you alrady have an account ?</lable><br/><hr/>
                        </div>
                        <div class="text-center">
                          <button type="button"
                            onClick={onSubmit} class="btn btn-success">Submit</button><br/><br/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return( 
        <div>
            <Base/>
            {successMessage()}
            {errorMessage()}
            {signUpFrom()} 
        </div>
    );
};

export default SignUP;