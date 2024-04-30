import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import { ToastContainer, toast } from "react-toastify";

const Editproduct = () =>{
        let { productid } = useParams();
        let[text, updatetext] = useState("Update");
        let [pname, pickName] = useState("");
        let [pprice, pickPrice] = useState("");
        let [pqty, pickQty] = useState("");
        let [pdetails, pickDetails] = useState("");
      
        const getdata = () => {
          let url = "http://localhost:9999/product/" + productid;
          fetch(url)
            .then((responsedata) => responsedata.json())
            .then((response) => {
               pickName(response.name);
               pickPrice(response.price);
               pickQty(response.qty);
               pickDetails(response.details);
            });
        };
      
        const update = () => {
            updatetext("Please wait....");
            toast("Please wait Processing....");
            let url = "http://localhost:9999/product/" + productid;
            let data = {
                "name": pname,
                "price": pprice,
                "qty": pqty,
                "details": pdetails
             };
   
             let postdata = 
             {
               headers: { "Content-Type": "application/json" },
               method: "PUT",
               body: JSON.stringify(data)
             };

             fetch(url, postdata)
               .then((responsedata) => responsedata.json())
               .then((response) => {
                if( response.error== "YES") {
                    swal(response.message+" ", "", "warning");
                }
                else
                {
                    toast("Successfully updated !!");
                  window.location.href = "#/productlist";
                }
            });
        };
      
        useEffect(() => {
          getdata();
        }, [1]);
      
        return (
          <div className="container">
            <div className="row">
            <ToastContainer/>
              <div className="col-lg-12 text-center mt-5 mb-3">
                <h2 className="text-primary">Edit Details</h2>
              </div>
      
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Name: </th>
                      <td><input type="text" value={pname} onChange={obj => pickName(obj.target.value)}/></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Price: </th>
                      <td><input type="text" value={pprice} onChange={obj => pickPrice(obj.target.value)}/> </td>
                    </tr>
                    <tr>
                      <th>Quantity: </th>
                      <td><input type="text" value={pqty} onChange={obj => pickQty(obj.target.value)}/></td>
                    </tr>
                    <tr>
                      <th> Details: </th>
                      <td><input type="text" value={pdetails} onChange={obj => pickDetails(obj.target.value)}/></td>
                    </tr>
      
                    <tr className="text-center">
                      <td colSpan={3}>
                        <button className="btn btn-danger" onClick={update}>
                          {text}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        );
      };

export default Editproduct;