import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Details = () => {
  let { customerid } = useParams();
  let [data, pickData] = useState("");

  const getdata = () => {
    let url = "http://localhost:9999/customer/" + customerid;
    let postdata = { method: "PUT" };
    fetch(url, postdata)
      .then((responsedata) => responsedata.json())
      .then((response) => {
        pickData(response);
      });
  };

  const back = () => {
    window.location.href = "#/allcustomer";
  };

  useEffect(() => {
    getdata();
  }, [1]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center mt-5 mb-3">
          <h2 className="text-primary">Details</h2>
        </div>

        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name: </th>
                <td>{data.name}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Email: </th>
                <td> {data.email} </td>
              </tr>
              <tr>
                <th>Mobile no: </th>
                <td>{data.mobile}</td>
              </tr>
              <tr>
                <th> City: </th>
                <td>{data.city}</td>
              </tr>
              <tr>
                <th> Zipcode :</th>
                <td>{data.pincode}</td>
              </tr>

              <tr>
                <th> Address :</th>
                <td>{data.address}</td>
              </tr>

              <tr className="text-center">
                <td colSpan={3}>
                  <button className="btn btn-danger" onClick={back}>
                    Back
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

export default Details;
