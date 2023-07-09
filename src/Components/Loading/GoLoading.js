import React from "react";
import './goloading.css'
function GoLoading() {
  return (
    <>
      <div className="loading-parent">
    <div className="loading-container">
      <div className="top-left"></div>
      <div className="top-right"></div>
      <div className="bottom-left"></div>
      <div className="bottom-right"></div>
    </div>
    <div className="loading-msg">Posting Your Ad...</div>
    </div>
    
    </>
  );
}

export default GoLoading;
