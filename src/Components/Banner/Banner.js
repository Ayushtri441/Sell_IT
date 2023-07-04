import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      document.querySelector(".bannerChildDiv .banner .carousel").click();
    }, 3000);

    return () => {
      
      clearTimeout(timeout);
    };
  }, []);

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
              <option value="null">ALL CATEGORIES</option>
              <option value="Cars">Cars</option>
              <option value="Cameras & Lenses">Cameras & Lenses</option>
              <option value="Computers & Laptops">Computers & Laptops</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Motorcycles">Motorcycles</option>
              <option value="Tablets">Tablets</option>
            </select>
          </div>
          <div className="otherQuickOptions">
            <span onClick={() => setCategory("Cars")}>Cars</span>
            <span onClick={() => setCategory("Cameras & Lenses")}>Cameras & Lenses</span>
            <span onClick={() => setCategory("Computers & Laptops")}>Computers & Laptops</span>
            <span onClick={() => setCategory("Mobile Phones")}>Mobile Phones</span>
            <span onClick={() => setCategory("Motorcycles")}>Motorcycles</span>
            <span onClick={() => setCategory("Tablets")}>Tablets</span>
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
            <img src="../../../Images/banner2-transformed.png" alt="" />
            </div>
            <div>
            <img src="../../../Images/SELL_IT-transformed.png" alt="" />
            </div>
            <div>
              <img src="../../../Images/banner copy.png" alt="" />
            </div>
          </Carousel>
        </div>
      </div>
      {category !== null && <DynamicPosts category={category} />}
    </div>
  );
}

export default Banner;
