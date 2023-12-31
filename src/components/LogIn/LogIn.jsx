import React from "react";
import "./LogIn.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
import { updateProfile } from "firebase/auth";

export default function LogIn() {
  const [registerName, setRegisterName] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerPasswordConfirm, setRegisterPasswordConfirm] =React.useState("");

  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");

  const navigate = useNavigate();

  
  const { login,register,loginWithGoogle } = useAuth();
  const handleLogin =  async (event) => {
    event.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      toast.success("Logged in successfully!");
      navigate("/");
    }
    catch(error) {
      
      toast.error(error.message);
    }
  }
  const handleLoginWithGoogle = async (event) => {
    event.preventDefault();
    try {
      await loginWithGoogle();
      toast.success("Logged in successfully!");
      navigate("/");
    }
    catch(error) {
      console.log(error);
      toast.error("An error occured!");
    }
  }
  const handleRegister = async (event) => {
    event.preventDefault();
    if(registerEmail === "" || registerPassword === "" || registerName === "" || registerPasswordConfirm === "")
    {
      toast.error("Please fill all the fields!");
      return;
    }
    if(registerPassword !== registerPasswordConfirm)
    {
      toast.error("Passwords do not match!");
      return;
    }
    if(registerPassword.length < 6)
    {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
    if(registerName.length < 3)
    {
      toast.error("Name must be at least 3 characters long!");
      return;
    }
    try {
      const userCredential = await register(registerEmail, registerPassword);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: registerName,
      });
      await toast.promise(
        Promise.resolve("Registered successfully!"),
        {
          pending: "Registering...",
          success: "Registered successfully!",
          error: "An error occurred!",
        }
      ).then(() => {
      navigate("/");
      });
    }
    catch(error) {
      console.log(error);
    }
    
  }
  

  return (
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
              <h6 className="mb-0 pb-3">
                <span>Log In </span>
                <span>Sign Up</span>
              </h6>
              <input
                className="checkbox"
                type="checkbox"
                id="reg-log"
                name="reg-log"
              />
              <label htmlFor="reg-log"></label>
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <form onSubmit={handleLogin}>
                        <h4>Log In
                        <div className="social-container">
                          <a href="#" className="social"><i className="fab fa-google-plus-g" onClick={handleLoginWithGoogle}></i></a>
                       
                        </div>
                          <p >
                            or use your account
                          </p>
                        </h4>
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
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="loginpass"
                            onChange={(event) =>
                              setLoginPassword(event.target.value)
                            }
                          />
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button className="submit-btn mt-4" type="submit" >
                          submit
                        </button>
                        <p className="mb-0 mt-4 text-center" onClick={()=>navigate("/forgot-password")}>
                          <a className="link">
                            Forgot your password?
                          </a>
                        </p>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <form onSubmit={handleRegister}>
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text"
                            name="logname"
                            className="form-style"
                            placeholder="Your Name"
                            id="logname"
                            onChange={(event) =>
                              setRegisterName(event.target.value)
                            }
                          />
                          <i className="input-icon uil uil-user"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email"
                            name="logemail"
                            className="form-style"
                            placeholder="Your Email"
                            id="logemail"
                            onChange={(event) =>
                              setRegisterEmail(event.target.value)
                            }
                          />
                          <i className="input-icon uil uil-at"></i>
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password"
                            name="logpass"
                            className="form-style"
                            placeholder="Your Password"
                            id="logpass"
                            onChange={(event) =>
                              setRegisterPassword(event.target.value)
                            }
                          />
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password Again"
                              id="logpassconfirm"
                              onChange={(event) =>
                                setRegisterPasswordConfirm(event.target.value)
                              }
                            />
                          </div>
                          <i className="input-icon uil uil-lock-alt"></i>
                        </div>
                        <button className="submit-btn mt-4" type="submit">
                          submit
                        </button>
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
  );
}
