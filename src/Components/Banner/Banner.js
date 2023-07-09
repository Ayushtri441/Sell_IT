import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
<<<<<<< Updated upstream
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

=======
  let [category, setCategory] = useState();
  const handleImageClick = (currentSlide) => {
      document.querySelector(".bannerChildDiv .banner .carousel .control-next").click();
  };
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              <option value="null">ALL CATEGORIES</option>
              <option value="Cars">Cars</option>
=======
              <option value="null" >ALL CATEGORIES</option>
              <option value="4 Wheelers">4 Wheelers</option>
>>>>>>> Stashed changes
              <option value="Cameras & Lenses">Cameras & Lenses</option>
              <option value="Computers & Laptops">Computers & Laptops</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="2 Wheelers">2 Wheelers</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="otherQuickOptions">
<<<<<<< Updated upstream
            <span onClick={() => setCategory("Cars")}>Cars</span>
            <span onClick={() => setCategory("Cameras & Lenses")}>Cameras & Lenses</span>
            <span onClick={() => setCategory("Computers & Laptops")}>Computers & Laptops</span>
            <span onClick={() => setCategory("Mobile Phones")}>Mobile Phones</span>
            <span onClick={() => setCategory("Motorcycles")}>Motorcycles</span>
            <span onClick={() => setCategory("Tablets")}>Tablets</span>
=======
            <span onClick={()=>setCategory("4 Wheelers")} >4 Wheelers</span>
            <span onClick={()=>setCategory("Cameras & Lenses")} >Cameras & Lenses</span>
            <span onClick={()=>setCategory("Computers & Laptops")} >Computers & Laptops</span>
            <span onClick={()=>setCategory("Mobile Phones")} >Mobile Phones</span>
            <span onClick={()=>setCategory("2 Wheelers")} >2 Wheelers</span>
            <span onClick={()=>setCategory("Others")} >Others</span>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            <img src="../../../Images/banner2-transformed.png" alt="" />
            </div>
            <div>
            <img src="../../../Images/SELL_IT-transformed.png" alt="" />
            </div>
            <div>
=======
            <img src="../../../Images/SELL_IT-transformed.png" alt="" />
            </div>
            <div>
            <img src="../../../Images/banner2-transformed.png" alt="" />
            </div>
            
            <div>
>>>>>>> Stashed changes
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
