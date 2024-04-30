import { HashRouter, Routes, Route } from "react-router-dom";
import ProjectHeader from "./header";
import Dashboard from "./Dashboard";
import NewCustomer from "./newcustomer";
import AllCustomer from "./allcustomer";
import Details from "./details";
import Addproduct from "./addproduct";
import Productlist from "./productlist";
import Editproduct from "./editproduct";
import Mybilling from "./billings";

function App() {
  return (
    <HashRouter>
      <ProjectHeader />
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route exact path="/addcustomer" element={<NewCustomer />}/>
        <Route exact path="/allcustomer" element={<AllCustomer />}/>
        <Route exact path="/details/:customerid" element={<Details />}/>
        <Route exact path="/addproduct" element={<Addproduct />} />   
        <Route exact path="/productlist" element={<Productlist />}/>
        <Route exact path="/editproduct/:productid" element={<Editproduct />}/>
        <Route exact path="/billing" element={<Mybilling/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
