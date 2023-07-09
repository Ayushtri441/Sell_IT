import React, { useState, useEffect ,useContext} from "react";
import Camera from "../svg/Camera";
import Img from "../../../src/assets/u.png";
import { db,  storage } from "../../firebase/config";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import './View.css'
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import Delete from "../svg/Delete";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState("");
  const history = useHistory("");
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();

 
  
    if(user){
      const userId = user.uid;
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
  // console.log(userDetails)
  useEffect(() => {
    {console.log(user)}
    {console.log(userDetails)}
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        try {
          if (userDetails.avatarPath) {
            await deleteObject(ref(storage, userDetails.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", user.uid), {
            avatar: url,
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete avatar?");
      if (confirm) {
        await deleteObject(ref(storage, userDetails.avatarPath));

        await updateDoc(doc(db, "users", user.uid), {
          avatar: "",
          avatarPath: "",
        });
        setImg("");
        history.replace("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return userDetails ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
        {/* {console.log("yush"+userDetails.name)} */}
          <img src={userDetails.avatar || Img} alt="avatar" />
          <div className="overlay">
            <div>
              <label htmlFor="photo">
                <Camera/>
              </label>
              {userDetails.avatar ? <Delete deleteImage={deleteImage} /> : null}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{userDetails.name}</h3>
          <p>{user.email}</p>
          <hr />
          <p>{userDetails.phone}</p>
          {/* <small>Joined on: {user.createdAt.toDate().toDateString()}</small> */}
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
