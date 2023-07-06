import React, { useState, useContext, Fragment } from "react";
import "./form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory, useLocation } from "react-router";
import GoLoading from "../Loading/GoLoading";
import OlxLogo from "../../assets/OlxLogo";
const FormBike = () => {
  //Upload items
  const location = useLocation();
  const category = location.state.prop1;
  const spec = location.state.prop2;
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const navback = () => {
    history.goBack();
  };
  //drop items
  const [image, setImage] = useState({
    grid1: null,
    grid2: null,
    grid3: null,
  });
  const navhome =()=>{
    {console.log("YEAD")}
    history.push("/");
  }

  let [name, setname] = useState("");
  let [brand, setbrand] = useState("");
  let [model, setModel] = useState("");
  let [year, setYear] = useState("");
  let [fuel, setfuel] = useState("");
  let [trans, setrans] = useState("");
  let [title, settitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [city, setCity] = useState("");
  let [state, setstate] = useState("");
  let [Fcapacity,setFcapcity] = useState("");
  let [Milage ,setMilage] = useState("");
  let [loading, setLoading] = useState(false);

  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter") {
      e.target.style.background = "#e1e7f0";
    } else if (e.type === "dragleave" || e.type === "drop") {
      e.target.style.background = "";
    }
  };

  const handleDrop = (e, gridId) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      displaySelectedImage(file, gridId);
    }
  };

  const handleButtonClick = (gridId) => {
    const fileInput = document.getElementById(`file-input-${gridId}`);
    fileInput.click();
  };

  const handleFileInputChange = (e, gridId) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      displaySelectedImage(file, gridId);
    }
  };

  const displaySelectedImage = (file, gridId) => {
    console.log(image);
    const reader = new FileReader();
    reader.onload = function (event) {
      setImage((previmage) => ({
        ...previmage,
        [gridId]: file,
      }));
    };

    reader.readAsDataURL(file);
  };
  const brands = [
    "Honda",
    "Yamaha",
    "Kawasaki",
    "Suzuki",
    "Harley-Davidson",
    "Ducati",
    "BMW",
    "Triumph",
    "KTM",
    "Aprilia",
  ];

  const brandchange = (e) => {
    setbrand(e.target.value);
  };
  //fuels
  const fueloption = ["LPG", "CNG & Hybrid", "Diesel", "Electric", "Petrol"];

  const handleFuelchange = (e) => {
    setfuel(e.target.value);
  };
  //Transmission
  const transoption = ["Manual", "Automatic"];

  const handletranschange = (e) => {
    setrans(e.target.value);
  };
  //City
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
  ];

  const statechange = (e) => {
    setstate(e.target.value);
  };
  //submit btn
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    var btn = document.getElementById("submitbtn");
    var form = document.getElementById("myform");
    btn.disabled = true;
    form.style.opacity = "0.3";
    let date = new Date().toDateString();
    // console.log(image);
    const uploadPromises = Object.keys(image).map((gridId) => {
      const file = image[gridId];
      if (file) {
        const storageRef = Firebase.storage().ref(`/image/${file.name}`);
        return storageRef.put(file).then(() => {
          return storageRef.getDownloadURL();
        });
      } else {
        return Promise.resolve(null);
      }
    });
    Promise.all(uploadPromises)
      .then((urls) => {
        const imageUrls = urls.filter((url) => url !== null);

        Firebase.firestore()
          .collection("products")
          .add({
            name,
            brand,
            model,
            spec,
            year,
            fuel,
            trans,
            title,
            city,
            state,
            category,
            price,
            description,
            imageUrls,
            userId: user.uid,
            createdAt: date,
          })
          .then(() => {
            setTimeout(function () {
              btn.disabled = false;
              form.style.opacity = "1";
              alert("Form Submitted SucessFully");
              form.reset();
              history.push("/");
            }, 10000);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="loadin_pos">{loading && <GoLoading />}</div>
      <div className="container-form-header container-form-header1">
        <i className="fa-solid fa-arrow-left fa-xl" onClick={navback}></i>
        <div className="cat">
          Selected Category :- {category} / <span>{spec}</span>
        </div>
        <div className="logo" onClick={navhome}>
          <OlxLogo></OlxLogo>
        </div>
      </div>
      <div className="container p-0">
        <h2 className="text-center">Post Your Ad</h2>
        <div className="text-center">
          Fill out the form below to submit your Add Details!
        </div>
        <div className="form">
          <form className="row g-3" id="myform" onSubmit={handleSubmit}>
            <h3>Provide some details</h3>
            <div className="col-md-6 mt-4">
              <label htmlFor="brand" className="form-label">
                Brand <span>*</span>
              </label>
              <select
                id="brand"
                name="brand"
                className="form-select"
                value={brand}
                onChange={brandchange}
                required
              >
                <option value="" disabled hidden>
                  Choose
                </option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand} required>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6 mt-4">
              <label htmlFor="nameuser" className="form-label">
                Name <span>*</span>
              </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="nameuser"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  required
                />
              </div>
              
                
              <div className="col-md-6 mt-4">
              <label htmlFor="bname" className="form-label ">
                Model <span>*</span>
              </label>
                <input
                  type="text"
                  className="form-control"
                  id="bname"
                  name="bname"
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-md-6 mt-4">
              <label htmlFor="year" className="form-label">
                Year of Purchase<span>*</span>
              </label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  name="year"
                  min={0}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                  required
                />
              </div>
            <div className="Fuel">
              <fieldset className="row mb-3 mt-4">
                <legend className="col-form-label pt-0">
                  fuel <span>*</span>
                </legend>
                <br />
                <div className="col-sm-10">
                  {fueloption.map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadiosf"
                        id={`gridRadios-${option}`}
                        value={option}
                        checked={fuel === option}
                        onChange={handleFuelchange}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`gridRadiosf-${option}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="transmisson">
              <fieldset className="row mb-3 mt-4">
                <legend className="col-form-label pt-0">
                  Transmisson <span>*</span>
                </legend>
                <br />
                <div className="col-sm-10">
                  {transoption.map((option) => (
                    <div className="form-check form-check-inline" key={option}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gridRadiost"
                        id={`gridRadiostrans-${option}`}
                        value={option}
                        checked={trans === option}
                        onChange={handletranschange}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`gridRadiostranst-${option}`}
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <div className="col-md-6 mt-4">
              <label htmlFor="milage" className="form-label ">
                Milage <span>*</span>
              </label>
                <input
                  type="number"
                  className="form-control"
                  id="milage"
                  name="milage"
                  min={0}
                  onChange={(e) => {
                    setMilage(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-md-6 mt-4">
              <label htmlFor="fcapacity" className="form-label">
                Fuel Capacity<span>*</span>
              </label>
                <input
                  type="number"
                  className="form-control"
                  id="fcapacity"
                  name="fcapacity"
                  min={0}
                  onChange={(e) => {
                    setFcapcity(e.target.value);
                  }}
                  required
                />
              </div>
            <div className="row g-3">
              <label htmlFor="title" className="form-label m-0">
                Ad Title <span>*</span>
              </label>
              <div className="col my-2">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={(e) => {
                    settitle(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="row g-3">
              <label htmlFor="Description" className="form-label m-0">
                Ad Description <span>*</span>
              </label>
              <div className="col my-2">
                <textarea
                  name="Description"
                  id="Description"
                  className="form-control"
                  rows={3}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                ></textarea>
              </div>
            </div>
            <div className="text-center">
              <div className="bo1"></div>
            </div>
            <div className="row g-3 ">
              <h4>SET A PRICE</h4>
              <label htmlFor="Price" className="form-label m-0">
                Price <span>*</span>
              </label>
              <div className="col-md-6 my-2">
                <input
                  type="Number"
                  className="form-control"
                  id="Price"
                  name="Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <div className="bo1"></div>
            </div>
            <h4>SELECT IMAGES </h4>
            <div className="gridmain">
              <div className="grid">
                <div
                  id="drop-area1"
                  className="upload-btn-wrapper"
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={(e) => handleDrop(e, "grid1")}
                >
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="bdUserUploadIconBtn"
                    onClick={() => handleButtonClick("grid1")}
                  />
                  <input
                    id="file-input-grid1"
                    type="file"
                    name="img1"
                    onChange={(e) => handleFileInputChange(e, "grid1")}
                    required
                  />
                  {/* {console.log(image)} */}
                  <div className="image-container" id="image-container">
                    {image.grid1 ? (
                      <img
                        src={
                          image.grid1 ? URL.createObjectURL(image.grid1) : ""
                        }
                        alt="Uploaded"
                        style={{ maxWidth: "100%" }}
                      />
                    ) : (
                      <>
                        <h5>Upload a file</h5>
                        <p>
                          Drag and drop files here, or click to select files
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid">
                <div
                  id="drop-area2"
                  className="upload-btn-wrapper"
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={(e) => handleDrop(e, "grid2")}
                >
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="bdUserUploadIconBtn"
                    onClick={() => handleButtonClick("grid2")}
                  />
                  {/* {console.log(image)} */}
                  <input
                    id="file-input-grid2"
                    type="file"
                    name="img2"
                    onChange={(e) => handleFileInputChange(e, "grid2")}
                    required
                  />
                  {/* {console.log(image)} */}
                  <div className="image-container">
                    {image.grid2 ? (
                      <img
                        src={
                          image.grid2 ? URL.createObjectURL(image.grid2) : ""
                        }
                        alt="Uploaded"
                        style={{ maxWidth: "100%" }}
                      />
                    ) : (
                      <>
                        <h5>Upload a file</h5>
                        <p>
                          Drag and drop files here, or click to select files
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid">
                <div
                  id="drop-area3"
                  className="upload-btn-wrapper"
                  onDragEnter={handleDragEvents}
                  onDragLeave={handleDragEvents}
                  onDragOver={handleDragEvents}
                  onDrop={(e) => handleDrop(e, "grid3")}
                >
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="bdUserUploadIconBtn"
                    onClick={() => handleButtonClick("grid3")}
                  />
                  <input
                    id="file-input-grid3"
                    type="file"
                    name="img3"
                    onChange={(e) => handleFileInputChange(e, "grid3")}
                    required
                  />
                  <div className="image-container">
                    {image.grid3 ? (
                      <img
                        src={
                          image.grid3 ? URL.createObjectURL(image.grid3) : ""
                        }
                        alt="Uploaded"
                        style={{ maxWidth: "100%" }}
                      />
                    ) : (
                      <>
                        <h5>Upload a file</h5>
                        <p>
                          Drag and drop files here, or click to select files
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bo1"></div>
            </div>
            <h4>SELECT YOUR LOCATION</h4>
            <div className="col-md-6">
              <label htmlFor="validationCustom03" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="validationCustom03"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                id="state"
                name="state"
                className="form-select"
                value={state}
                onChange={statechange}
                required
              >
                  <option value="" disabled hidden>
                  Choose
                </option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <div className="bo1"></div>
              <button
                type="submit"
                id="submitbtn"
                className="btn btn-secondary w-25 m-4"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default FormBike;
