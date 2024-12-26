import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const NewCustomer = () => {
  let [name, pickName] = useState("");
  let [email, pickEmail] = useState("");
  let [mobile, pickMobile] = useState("");
  let [city, pickCity] = useState("");
  let [pincode, pickPincode] = useState("");
  let [address, pickAddress] = useState("");

  const save = () => {
    toast("Please wait Processing....");
    let newdata = {
      fullname: name,
      emailid: email,
      mobileno: mobile,
      cityname: city,
      zipcode: pincode,
      fulladdress: address,
      tokenno: localStorage.getItem("tokenid"),
    };

    let url = "https://billing-project.onrender.com/customer";
    let postdata = {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newdata),
    };

    fetch(url, postdata)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        if (response.error == "YES") {
          swal(response.error, "", "warning");
        } else {
          toast(response.message);
          window.location.href = "#/allcustomer";
        }
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="text-center mb-3">
          <h4 className="text-primary">
            <i className="fa-solid fa-user-plus"></i> Enter Customer Details{" "}
          </h4>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="row">
            <div className=" p-3 col-lg-12 ">
              <div className="card">
                <div className="card-header">
                  {" "}
                  <h3>Details</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <b>Name</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Name"
                      onChange={(obj) => pickName(obj.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <b>Email</b>
                    <input
                      type="email"
                      className="form-control "
                      placeholder="Enter Your Emailid"
                      onChange={(obj) => pickEmail(obj.target.value)}
                    />
                  </div>

                  <div className=" mb-3">
                    <b>Mobile</b>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Your Mobile no."
                      onChange={(obj) => pickMobile(obj.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <b>City</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your City"
                      onChange={(obj) => pickCity(obj.target.value)}
                    />
                  </div>

                  <div className=" mb-3">
                    <b>Pincode</b>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Enter Your Pincode"
                      onChange={(obj) => pickPincode(obj.target.value)}
                    />
                  </div>

                  <div className=" mb-3">
                    <b>Address</b>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Address"
                      onChange={(obj) => pickAddress(obj.target.value)}
                      rows={3}
                    >
                      {" "}
                    </textarea>
                  </div>
                </div>
                <div className="card-footer">
                  <div className=" text-center mb-3">
                    <button className="btn btn-danger" onClick={save}>
                      Add customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
