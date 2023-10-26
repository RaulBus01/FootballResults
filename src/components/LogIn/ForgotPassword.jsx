import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import "./LogIn.css";    

export default function ForgotPassword()
{
    const [loginEmail, setLoginEmail] = React.useState("");
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();
    async function handleForgot(event)    
    {   
        event.preventDefault();

        try{
            if(loginEmail === "")
            {
                toast.error("Please fill all the fields!");
                return;
            }
            await forgotPassword(loginEmail);
            
            toast.success("Email sent successfully!");
            setTimeout(() => {
                navigate("/login");
            }, 3000);
            
            
        }
        catch(error)
        {
            console.log(error);
            toast.error("An error occured!");
        }
    }
 
    return(
        <div className="login-container-body">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={true}
        theme="dark"
        limit={1}
        pauseOnHover={false}
      />
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <form onSubmit={handleForgot}>
                        <h4>
                            Forgot Password
                        </h4>
                        <div>
                            <p className="section-text">
                            Enter your email address below and we'll send you a link to reset your password.
                            </p>
                        </div>
                        <div className="form-group">
                          
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="loginemail"
                            onChange={(event) =>
                              setLoginEmail(event.target.value)
                            }
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        
                        <button className="submit-btn mt-4" type="submit" >
                          submit
                        </button>
                        <p className="mb-0 mt-4 text-center" onClick={()=>navigate("/login")}>
                          <a className="link">
                            Maybe you remember your password?
                          </a>
                        </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>            
            </div>
            </div>
        </div>
      </div>
    </div>
    )
}