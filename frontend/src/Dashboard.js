import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  let [Customers, customerlist] = useState([]);
  let [Products, productlist] = useState([]);

  const getallcustomer = () => {
    let url =
      "https://billing-project.onrender.com/customer/" + localStorage.getItem("tokenid");
    fetch(url)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        customerlist(response);
      });
  };

  const getallproduct = () => {
    let url =
      "https://billing-project.onrender.com/product";
    fetch(url)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        productlist(response);
      });
  };

   //fetch all bill
 let [allbill, updatebill] = useState( [] );
 const getbill = () =>{
    fetch("https://billing-project.onrender.com/billing")
    .then(responsedata=> responsedata.json())
    .then(response => {
        updatebill(response.reverse());
    })
 }

  useEffect(() => {
    getallcustomer();
    getallproduct();
    getbill();
  }, [1]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="text-primary"> My Dashboard </h2>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-3 mb-4">
          <Link to="/allcustomer" className="text-decoration-none">
            <div className="p-4 bg-info text-white shadow-lg rounded text-center">
              <i className="fa fa-users fa-2x"></i>
              <h4 className="mt-2"> {Customers.length} - Total Customers </h4>
            </div>
          </Link>
        </div>

        <div className="col-lg-3 mb-4">
          <Link to="/addcustomer" className="text-decoration-none">
            <div className="p-4 bg-info text-white shadow-lg rounded text-center">
              <i className="fa fa-users fa-2x"></i>
              <h4 className="mt-2"> Add Customer </h4>
            </div>
          </Link>
        </div>

        <div className="col-lg-3 mb-4">
          <Link to="/productlist" className="text-decoration-none">
            <div className="p-4 bg-info text-white shadow-lg rounded text-center">
              <i className="fa fa-suitcase fa-2x"></i>
              <h4 className="mt-2">{Products.length} -  All products </h4>
            </div>
          </Link>
        </div>

        <div className="col-lg-3 mb-4">
          <Link to="/billing" className="text-decoration-none">
            <div className="p-4 bg-info text-white shadow-lg rounded text-center">
              <i className="fa fa-print fa-2x"></i>
              <h4 className="mt-2">{allbill.length} - Bills Generated </h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;


/* 
 pname: String,
 price: NUmber,
 qty: NUmber,
 details: String
*/
