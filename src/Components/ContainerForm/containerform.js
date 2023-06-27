import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./containerform.css";

function Containerform() {
  const dropdownRefs = useRef([]);
  const [isOpen, setIsOpen] = useState([]);

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
    { icon: "fa-car", name: "Cars", component: "/Car", one:"Car" , two:"Truck"},
    { icon: "fa-motorcycle", name: "Motorcycles", component: "/Bike" ,one:"Bike", two:"Cycle" },
    { icon: "fa-mobile", name: "Mobiles", component: "/Mobile" ,one:"Moblie" , two:"Tablet"},
    { icon: "fa-camera-retro", name: "Camera & Lenses", component: "/Camera",one:"Camera" , two:"Lenses" },
    { icon: "fa-laptop", name: "Laptops and Computers", component: "/Laptop",one:"Laptops" , two:"Computers" },
    { icon: "fa-tablet", name: "Others", component: "/Tablet",one:"Other"},
  ];

  return (
    <div className="main">
      <h1>Select the Product</h1>
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
                <Link to={product.component}>{product.one}</Link>
                <Link to="#">{product.two}</Link>
                {/* <Link to="#">Item 3</Link> */}
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
