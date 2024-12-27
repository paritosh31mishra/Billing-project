import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import swal from 'sweetalert';

const Login = () => {
    let [email, pickEmail] = useState("");
    let [password, pickPassword] = useState("");
    let [btncontrol, updatebtncontrol] = useState(false);
    let [btntext, updatebtntext] = useState("Login");

    const loginCheck = ()=>{
      if( email != "" && password!= "")
      {
            toast("Please wait Processing....");
            updatebtntext("Please wait....");
            updatebtncontrol(true);
            let url = "https://billing-project.onrender.com/auth";
            let logindata = { email: email, password: password };
            let postdata = {
              headers: { "Content-Type": "application/json" },
              method: "POST",
              body: JSON.stringify(logindata),
            };
        
            fetch(url, postdata)
              .then((response) => response.json())
              .then((userdata) => {
             
                if (userdata.status == "SUCCESS") {
                  toast("Success: Please wait Redirecting...")
                  localStorage.setItem("tokenid", "1234");
               //   localStorage.setItem("myname", userdata.fullname);
                //  localStorage.setItem("myrole", userdata.role);
                  window.location.reload();
                }
                else{
                  swal("Login Fail", "Invalid or Not Exist", "warning");
                  updatebtntext("Login");
                  updatebtncontrol(false);
                }
              });
        }
        else{
            swal("Invalid Input..", "Please enter email & password", "warning");
        }
    }
  return (
    <section className="fullpage bg-info">
         <ToastContainer/>
      <div className="container">
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
             <h2 className="text-light text-center mt-5">
              <i className="fa fa-lock m-2"></i>  Client Login
              </h2>
            <div className="card mt-4 shadow-lg border-0">
              <div className="card-header">
                {" "}
                <h4>Enter Login Details</h4>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <label>Email Id</label>
                  <input type="email" className="form-control" onChange={obj=> pickEmail(obj.target.value)} placeholder="Enter your email Id"/>
                </div>

                <div className="mb-4">
                  <label>Password</label>
                  <input type="password" className="form-control" onChange={obj => pickPassword(obj.target.value)} placeholder="Enter password"/>
                </div>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-danger" onClick={loginCheck} disabled={btncontrol}>{btntext}</button>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </section>
  );
};

export default Login;
