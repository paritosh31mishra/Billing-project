import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCustomer = () => {
  let [Customers, customerlist] = useState([]);
  let [keyword, updatekeyword] = useState("");

  const getallcustomer = () => {
    let url =
      "https://billing-project.onrender.com/customer/" + localStorage.getItem("tokenid");
    fetch(url)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        customerlist(response);
      });
  };

  useEffect(() => {
    getallcustomer();
  }, [1]);

  return (
 <div className="container mt-5">
  <div className="row mb-5">
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

  <div className="row">
    <div className="col-lg-12">
      <div className="table-responsive"> {/* Added this wrapper */}
        <table
          className="table table-bordered table-hover text-center"
          border="1px"
          cellPadding="5px"
          cellSpacing="1px"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Zip code</th>
              <th>Address</th>
              <th>View details</th>
            </tr>
          </thead>
          <tbody>
            {Customers.map((customer, index) => {
              if (
                customer.name.toLowerCase().includes(keyword.toLowerCase())
              ) {
                return (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td>{customer.email.substring(0, 10) + "..."}</td>
                    <td>{customer.mobile}</td>
                    <td>{customer.city}</td>
                    <td>{customer.pincode}</td>
                    <td>{customer.address.substring(0, 10) + "..."}</td>
                    <td>
                      <Link
                        className="text-info font-weight-bold"
                        to={`/details/${customer._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <h5>View details</h5>
                      </Link>
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
export default AllCustomer;
