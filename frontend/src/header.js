import { Link } from "react-router-dom";

const ProjectHeader = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">
          {" "}
          <i className="fa fa-database fa-lg"></i> Infocampus Logics Pvt Ltd
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item pe-4">
              <Link className="nav-link active" to="/">
                <i className="fa fa-home"></i> Dashboard
              </Link>
            </li>

            <li className="nav-item pe-4">
              <Link className="nav-link active" to="/addcustomer">
                <i className="fa fa-user-plus"></i> Add Customer
              </Link>
            </li>

            <li className="nav-item pe-4">
              <Link className="nav-link active" to="/allcustomer">
                <i className="fa fa-users"></i> All Customer
              </Link>
            </li>

            <li className="nav-item pe-4">
              <Link className="nav-link active" to="/addproduct">
                <i className="fa fa-plus"></i> new Product
              </Link>
            </li>

            <li className="nav-item pe-4">
              <Link className="nav-link active" to="/productlist">
                <i className="fa fa-suitcase"></i> All Products
              </Link>
            </li>

            <li className="nav-item pe-4">
              <Link className="nav-link active" to="/billing">
                <i className="fa fa-print"></i> My Billing
              </Link>
            </li>

            <li className="nav-item pe-2">
              <a
                className="nav-link text-danger"
                href="javascript:void(0)"
                onClick={logout}
              >
                <i className="fa fa-user"></i> {localStorage.getItem("myname")}{" "}
                - Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ProjectHeader;

const logout = () => {
  localStorage.clear();
  window.location.reload();
};
