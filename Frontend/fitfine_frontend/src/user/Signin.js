import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Base from '../eshop/core/Base';
import {signin, isAuthenticated, authenticate} from './helper/userapicall'


const Signin = () => {
    const [values, setValues] = useState({
        name: "",
        email: "nym673@gmail.com",
        password: "z00nym@FIR=MCA",
        error: "",
        success: false,
        loading: false,
        didRedirect: false,
    })

    const { name, email, password, error, success, loading, didRedirect } = values;
    
    // Make sure the handleChange is getting triggered on change
      const handleChange = (name) =>
        (event) => {
          setValues({ ...values, error: false, [name]: event.target.value });
        };   

      const onSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading:true })

        signin({email, password})
        .then((data) => {
          console.log("DATA",data);
          if(data.token){
            //let sessionToken = data.token;
            authenticate(data, () =>{
              console.log("TOKEN ADDED");
              setValues({
                ...values,
                didRedirect: true,
                success: true,
              });
            });
          }else{
            const error = data.error;
            document.getElementById("error").innerHTML = JSON.stringify(error);
            const test = data;
            setValues({
              ...values,
              loading: false,
              error: true,
              success: false,
            })
          }
        })
        .catch((e)=> console.log(e));
      };

    const performRedirect = () => {
      if (isAuthenticated()){
        return <Redirect to="/"/>
      }
    };

    const loadingMessage = () => {
      return(
        loading && (
          <div className='alert alert-info'>
            <div className='container'>
            <h2>Loading </h2>
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )
      )
    }

    const successMessage = () =>{
        return(
          <div className='row'><br/>
            <div className='col-md-6 offset-sm-3 text-left' style={{display: success ? "" :"none"}}><br/>
              <div className='alert-success'>
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
              <div className='alert alert-danger' id='error'>
              🛑 please! check the fields and try again.
              </div>
            </div>
          </div>
        )
      }
  
      const signInFrom = () =>{
          return(
              <div className='container'>
                  <div className='text-center'>
                      <h1>SignIn</h1>
                  </div>
                  <div className='col-md-6 offset-sm-3 text-left'>
                      <form>
                        <hr/>
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
                              <lable className='text-dark'><b>Enter password</b></lable>
                              <input
                                  className='form-control'
                                  value={password}
                                  onChange={handleChange("password")}
                                  type="password"
                                  placeholder='passWORD@!#$1234'
                              />
                              <br/>
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
            {signInFrom()}
            {loadingMessage()}
            {performRedirect()}
        </div>
        );
}

export default Signin;
