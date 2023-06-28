import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import ImageCarousel from "./imageCarousel";
import { useHistory } from "react-router";
import { AuthContext } from "../../contextStore/AuthContext";
import { db } from "../../firebase/config";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./View.css";
function View() {
  let { postContent } = useContext(PostContext); //from the global store PostContext we can get information about desired product post that we want to show (the user is clicked item on the card)
  const { user } = useContext(AuthContext);
  const [curuserDetails, setcurUserDetails] = useState();

  const [isProductInFavorites, setIsProductInFavorites] = useState(false);
  if (user) {
    
    const userId = user.uid;
    Firebase.firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          setcurUserDetails(doc.data());
        });
      });
  }
  const [userDetails, setUserDetails] = useState(); //we want show the details of who is posted the add and we dont know,so we want retreive user data from firebase who is posted this add
  const history = useHistory(); //if user click the refresh of the page then PostContext data will be erased so it will throws an error so that time we want redirect this page to home page
  useEffect(() => {
    let { userId } = postContent;
    if (userId === undefined) {
      history.push("/");
    } else {
      {console.log(userId)}
      Firebase.firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [history, postContent]);
  // Create Favorte
  const checkIfProductExistsInFavorites = async (
    userId,
    collectionName,
    productId
  ) => {
//  {console.log(userId)
// console.log(productId)}
    const userRef = Firebase.firestore().collection(collectionName).doc(userId);
    const userDoc = await userRef.get();
   
  if (userDoc.exists) {
    const userData = userDoc.data();
    let favoriteProductIds = [];

    if (userData.favorite_product_id) {
      favoriteProductIds = userData.favorite_product_id;
    }

    if (!favoriteProductIds.includes(productId)) {
      favoriteProductIds.push(productId);
      await userRef.update({
        favorite_product_id: favoriteProductIds
      });
    }

    return favoriteProductIds.includes(productId);
  }
  
    return false;
  };
  useEffect(() => {
    if (userDetails && postContent) {
      checkIfProductExistsInFavorites(user.uid, "users", userDetails.id)
        .then((result) => {
          setIsProductInFavorites(result);
        })
        .catch((error) => {
          console.error("Error checking product existence:", error);
        });
        
    }
  }, [userDetails, postContent]);
  useEffect(() => {
    if (userDetails && postContent) {
      checkIfProductExistsInFavorites(userDetails.id, "users", user.uid)
        .then((result) => {
          setIsProductInFavorites(result);
        })
        .catch((error) => {
          console.error("Error checking product existence:", error);
        });
        
    }
  }, [userDetails, postContent]);
  return (
    <>
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <ImageCarousel
            images={postContent.imageUrls ? postContent.imageUrls : []}
          />
        </div>

        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postContent.price} </p>
            <p>Brand :-{postContent.brand} </p>
            <span>{postContent.name}</span>
            <p>{postContent.category}</p>
            <span>{postContent.createdAt}</span>
          </div>
          <div className="productDescription">
            <p className="p-bold">Product Description</p>
            <p>{postContent.description}</p>
            <p>{postContent.title}</p>
            <p>Year :- {postContent.year}</p>
            <p>Transmission :- {postContent.trans}</p>
            <p>Model :- {postContent.model}</p>
            <p>Fuel :- {postContent.fuel}</p>
          </div>
          {userDetails && (
            <div className="contactDetails">
              <p className="p-bold">Seller details</p>
              <p>Name : {userDetails.name}</p>
              <p>Phone : {userDetails.phone}</p>
            </div>
          )}
          <div className="productDetails mt-4">
            <p className="p-bold">Location</p>

            <p>City :-{postContent.city}</p>
            <p>State :- {postContent.state}</p>
            <span>{postContent.createdAt}</span>
          </div>
        </div>
      </div>
     
        <Link to={{
      pathname: '/Chat',
      chat: {userDetails},
      user: {curuserDetails} 
      }} 
      >Chat With User
    </Link>
      
    </>
  );
}
export default View;
