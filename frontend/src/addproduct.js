import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";

const Addproduct = () => {
  let [name, pickName] = useState("");
  let [price, pickPrice] = useState("");
  let [qty, pickQty] = useState("");
  let [details, pickDetails] = useState("");
  let [btntext, updatetext] = useState("Add customer");
  

  const save = () => {
    toast("Please wait Processing....");
    updatetext("Please wait..");
    let newdata = {
      "pname": name,
      "pprice": price,
      "pqty": qty,
      "pdetails": details,
      "tokenno": localStorage.getItem("tokenid")
    };

    let url = "https://billing-project.onrender.com/product";
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
          window.location.href = "#/productlist";
        }
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="row">
        <div className="text-center mb-3">
          <h4 className="text-primary">
            <i className="fa-solid fa-user-plus"></i> Enter Product Details{" "}
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
                    <b>Name:</b>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Product Name"
                      onChange={(obj) => pickName(obj.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <b>Price:</b>
                    <input
                      type="number"
                      className="form-control "
                      placeholder="Enter Product Price"
                      onChange={(obj) => pickPrice(obj.target.value)}
                    />
                  </div>

                  <div className=" mb-3">
                    <b>Quantity:</b>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Your Quantity"
                      onChange={(obj) => pickQty(obj.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <b>Details:</b>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Enter Product Details"
                      onChange={(obj) => pickDetails(obj.target.value)}
                      rows={3}
                    > </textarea>
                  </div>

                </div>
                <div className="card-footer">
                  <div className=" text-center mb-3">
                    <button className="btn btn-danger" onClick={save}>
                     {btntext}
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

export default Addproduct;
