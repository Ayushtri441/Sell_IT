import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();
  const handleImageClick = (currentSlide) => {
      document.querySelector(".bannerChildDiv .banner .carousel .control-next").click();
  };
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="null" >ALL CATEGORIES</option>
              <option value="4 Wheelers">4 Wheelers</option>
              <option value="Cameras & Lenses">Camera & Lenses</option>
              <option value="Computers & Laptops">Laptops and Computers</option>
              <option value="Mobile Phones">Mobiles</option>
              <option value="2 Wheelers">2 Wheelers</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={()=>setCategory("4 Wheelers")} >4 Wheelers</span>
            <span onClick={()=>setCategory("Camera & Lenses")} >Camera & Lenses</span>
            <span onClick={()=>setCategory("Laptops and Computers")} >Laptops and Computers</span>
            <span onClick={()=>setCategory("Mobiles")} >Mobiles</span>
            <span onClick={()=>setCategory("2 Wheelers")} >2 Wheelers</span>
            <span onClick={()=>setCategory("Others")} >Others</span>
          </div>
        </div>
        <div className="banner">
          <Carousel
            autoPlay
            interval={3000}
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showIndicators={true}
            showThumbs={false}
            swipeable={true}
            onClickItem={(index) => handleImageClick(index)}
          >
            <div>
            <img src="../../../Images/SELL_IT-transformed.png" alt="" />
            </div>
            <div>
            <img src="../../../Images/banner2-transformed.png" alt="" />
            </div>
            
            <div>
              <img src="../../../Images/banner copy.png" alt="" />
            </div>
          </Carousel>
        </div>
      </div>
     { category!=null && <DynamicPosts category={category}/>  }
    </div>
  );
}

export default Banner;
