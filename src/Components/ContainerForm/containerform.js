import React, { useState, useRef } from "react";
import { Link , useHistory} from "react-router-dom";
import OlxLogo from "../../assets/OlxLogo";
import "./containerform.css";
function Containerform() {
  const dropdownRefs = useRef([]);
  const [isOpen, setIsOpen] = useState([]);
  const history = useHistory();
  const state1 = {prop1: "Ayush", prop2:"Tripathi"}
const navback=()=>{
      history.goBack()
}
  const handleMouseEnter = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = true;
    setIsOpen(newIsOpen);
  };

  const handleMouseLeave = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = false;
    setIsOpen(newIsOpen);
  };
  const products = [
    { icon: "fa-car", name: "4 Wheelers", component: "/Car", one:"Car" , two:"Truck", items :["Car","SUV","Truck"]},
    { icon: "fa-motorcycle", name: "2 Wheelers", component: "/Bike" ,one:"Bike", two:"Cycle" ,items :["Bike","Cycle"] },
    { icon: "fa-mobile", name: "Mobiles", component: "/Mobile" ,one:"Moblie" , two:"Tablet",items :["Smartphone","Tablet","Feature-Phone"]},
    { icon: "fa-camera-retro", name: "Camera & Lenses", component: "/Camera",one:"Camera" , two:"Lenses",items :["Camera","Lenses","TV"] },
    { icon: "fa-laptop", name: "Laptops and Computers", component: "/Laptop",one:"Laptops" , two:"Computers",items :["Laptop","Compurtes"] },
    { icon: "fa-tablet", name: "Others", component: "/Others",one:"Other",items :["Furniture","Home-Applicences","Electric-Applicences"]},
  ];
  const navhome =()=>{
    history.push("/");
  }

  return (
    <div className="main">
      <div className="container-form-header">
       <i className="fa-solid fa-arrow-left fa-xl" onClick={navback}></i>
      <h1>Select a category</h1>
      <div className="logo" onClick={navhome}> <OlxLogo></OlxLogo></div>
      </div>
      <div className="products">
        {products.map((product, index) => (
          <div
            className="product"
            key={index}
            onClick={() => handleMouseEnter(index)}
            onMouseLeave={()=>handleMouseLeave(index)}
          >
            <i className={`fa-solid ${product.icon}`}></i>
            <span>{product.name}</span>
            <div className="dropdown">
              <i className="fa-solid fa-angles-right"></i>
              <div className="holder" ref={(el) => (dropdownRefs.current[index] = el)}
                style={{ display: isOpen[index] ? "block" : "none" }}>
              <div
                className="dropdown-content"
                
              >
               {product.items.map((spec,index)=>{
                    return (
                      
                <Link key={index} to={{
                  pathname: product.component,
                  state: { prop1: product.name, prop2: spec }
                }}>{spec}</Link>
                    )

               })}
               
           
              </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Containerform;
