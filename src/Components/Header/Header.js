import React, { useContext,useState ,useEffect} from "react";
import { useHistory } from "react-router";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import Img from "../../../src/assets/u.png";
import OlxLogo from "../../assets/OlxLogo";
import SearchIcon from "../../assets/SearchIcon"
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import Search from "../Search/Search";
import Profile from "../View/Profile";

function Header() {
  const{allPost}=useContext(AllPostContext)
  const{setPostContent}=useContext(PostContext)
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
       setPostContent(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);
  const [curuserDetails, setcurUserDetails] = useState();;
 useEffect(()=>{
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
 },[user])
  
  const logoutHandler = () => {
    Firebase.auth()
      .signOut()
      .then(() => {
        history.push("/login");
      });
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/"><OlxLogo></OlxLogo></Link>
        </div>
        <div className="productSearch">
          <Search/>
        </div>
        <div className="msg">   <Link 
        to={{
          pathname: '/Chat',
          user: {curuserDetails} 
          }} 
        ><i className="fa-solid fa-message"></i></Link></div>
        <div className="loginPage">
          {curuserDetails ? (
            <Link to="/Profile"> <img src={curuserDetails.avatar || Img} alt="avatar" />  {user.displayName}</Link>
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
        </div>
        <div className="Hlogout">
        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}
        </div>
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>    
  );
}

export default Header;
