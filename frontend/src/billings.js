import { useState, useEffect } from "react";

const Mybilling = () => {
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
    let url = "https://billing-project.onrender.com/product";
    fetch(url)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        productlist(response);
      });
  };

  useEffect(() => {
    getallcustomer();
    getallproduct();
    getbill();
  }, [1]);

  let[name, pickName] = useState("");
  let [email, pickEmail] = useState("");
  let [mobile, pickMobile] = useState("");
  let [city, pickCity] = useState("");
  let [pincode, pickPincode] = useState("");
  let [address, pickAddress] = useState("");

  const printCustomer = (index) => {
    pickName(Customers[index].name);
    pickEmail(Customers[index].email);
    pickMobile(Customers[index].mobile); 
    pickCity(Customers[index].city);
    pickPincode(Customers[index].pincode);
    pickAddress(Customers[index].address);
  };

  let [price,processPrice] = useState(0);
  let [qty, processQty] = useState(1);
  let [total, processTotal] = useState(0);
  let [itemname, pickItem]= useState("");

  const printProduct = (index) => {
    processPrice(1*Products[index].price);
    processTotal( 1*Products[index].price);
    pickItem(Products[index].name);
  };

  const savebill =()=>{
     let billdata = {
        "fullname": name,
        "email": email,
        "mobile": mobile,
        "city": city,
        "pincode": pincode,
        "address": address,
        "product":itemname,
        "quantity": qty,
        "price": price,
        "total": total*qty
     }
     
  let url = "https://billing-project.onrender.com/billing";
  let postdata = {
    headers: {'Content-Type': 'application/json'},
    method: "POST",
    body: JSON.stringify(billdata)
  };

  fetch(url, postdata)
  .then(responsedata => responsedata.json())
  .then(response => {
     alert(response.message);
     getbill();// reload the list of bills
  })
 }

 //fetch all bill
 let [allbill, updatebill] = useState( [] );
 const getbill = () =>{
    fetch("https://billing-project.onrender.com/billing")
    .then(responsedata=> responsedata.json())
    .then(response => {
        updatebill(response.reverse());
    })
 }


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="text-primary"> Billing Management </h2>
        </div>

        <div className="col-lg-2">
          <label> Select Customer</label>
          <select className="form-select" onChange={obj=> printCustomer(obj.target.value)}>
            <option> Choose </option>
            {Customers.map((customer, index) => {
              return (
                <option
                  key={index}
                 value={index}>
                  {" "}
                  {customer.name}{" "}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-lg-2">
          <label> Select Product</label>
          <select className="form-select" onChange={obj=> printProduct(obj.target.value)}>
            <option> Choose </option>
            {Products.map((product, index) => {
              return (
                <option key={index}  value={index}>
                  {" "}
                  {product.name}{" "}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-lg-2">
          <label> Enter Quantity </label>
          <input type="number" className="form-control" value={qty} onChange={obj=> processQty(obj.target.value)}/>
        </div>

        <div className="col-lg-2">
          <label>  Price </label>
          <input type="number" className="form-control" value={price} />
        </div>

        <div className="col-lg-4 pt-4 text-center">
          <button className="btn btn-danger" onClick={savebill}> Generate Bill </button>
        </div>
        <h4 className="col-lg-12 text-center mt-4"> Total Price: Rs. {qty*total} </h4>
      </div>

      <div className="row mt-4 mb-5">
          <div className="col-lg-12">
             <table className="table table-bordered">
                  <thead>
                      <tr>
                          <th>Customer</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>City</th>
                          <th>Pincode</th>
                          <th>Address</th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                      </tr>
                   </thead>
                   <tbody>
                    {
                        allbill.map((bill, index)=>{
                            return(
                            <tr key={index}>
                                <td>{bill.name}</td>
                                <td>{bill.email}</td>
                                <td>{bill.mobile}</td>
                                <td>{bill.city}</td>
                                <td>{bill.pincode}</td>
                                <td>{bill.address}</td>
                                <td>{bill.product}</td>
                                <td>{bill.price}</td>
                                <td>{bill.quantity}</td>
                                <td>{bill.total}</td>
                             </tr>
                            )
                        })
                    }
                   </tbody>           
             </table>
          </div>
      </div>
    </div>
  );
};

export default Mybilling;
