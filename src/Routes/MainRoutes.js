import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import CreatePost from '../Pages/CreatePost'
import ViewPost from '../Pages/ViewPost'
import ViewMore from '../Pages/ViewMore'
import FormCar from '../Components/Create/form'
import FormBike from '../Components/Create/FormBike'
import FormCamera from '../Components/Create/FormCamera'
import FormMobile from '../Components/Create/FormMobile'
import FormLaptop from '../Components/Create/FormLaptop'
import FormOther from '../Components/Create/FormOther'
import Profile from '../Components/View/Profile'
import ChatBox from '../Components/Chatbox/ChatBox'
function MainRoutes() {
    return (
       <Router>
           <Route exact path="/">
               <Home/>
           </Route>
           <Route path="/signup">
               <Signup/>
           </Route>
           <Route path="/login">
               <Login/>
           </Route>
           <Route path="/create">
               <CreatePost/>
           </Route>
           <Route path="/view">
               <ViewPost/>
           </Route>
           <Route path="/viewmore">
               <ViewMore/>
           </Route>
           <Route path="/Profile">
               <Profile/>
           </Route>
           <Route path="/Chat">
               <ChatBox/>
           </Route>
           <Route path="/Car">
               <FormCar/>
           </Route> 
           <Route path="/Bike">
               <FormBike/>
           </Route>
           <Route path="/Mobile">
               <FormMobile/>
           </Route>
           <Route path="/LapTop">
               <FormLaptop/>
           </Route>
        
           <Route path="/Camera">
               <FormCamera/>
           </Route> <Route path="/Others">
               <FormOther/>
           </Route>
       </Router>
    )
}

export default MainRoutes
