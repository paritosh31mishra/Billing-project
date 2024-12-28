import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const Productlist = () => {
  let [Products, productlist] = useState([]);
  let [keyword, updatekeyword] = useState("");

  const getallproduct = () => {
    let url =
      "https://billing-project.onrender.com/product";
    fetch(url)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        productlist(response);
      });
  };

  useEffect(() => {
    getallproduct();
  }, [1]);

  const del_product= (id) =>{
    let url = "https://billing-project.onrender.com/product/" + id;
    let postdata = {method: "DELETE"}
     fetch(url, postdata)
     .then(responsedata => responsedata.json())
     .then(response => {
       alert(response.message);
        getallproduct();
     })
  }

  return (
    <div className="container mt-5">
      <div className="row mb-5 mb-5">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            onChange={(obj) => updatekeyword(obj.target.value)}
          />
        </div>
        <div className="col-lg-3"></div>
      </div>

      <div className="row text-center mb-3">
        <center className="text-primary">
          <h2>Product List : {Products.length}</h2>
        </center>
      </div>
      <div className="row">
        <div className="col-lg-12">
         <div className="table-responsive"> {/* Added this wrapper */}
          <table
            className="table table-bordered text-center"
            border="2px"
            cellPadding="5px"
            cellSpacing="1px"
          >
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((product, index) => {
                if (
                  product.name.toLowerCase().includes(keyword.toLowerCase())
                ) {
                  return (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.qty}</td>
                      <td>{product.details}</td>
                      <td>
                        <Link className="btn btn-sm btn-danger"  to={`/editproduct/${product._id}`} >Edit</Link>
                      </td>
                      <td>
                        <Link className="btn btn-sm btn-danger" onClick={del_product.bind(this, product._id)}>Delete</Link>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
         </div>
        </div>
      </div>
    </div>
  );
};
export default Productlist;
