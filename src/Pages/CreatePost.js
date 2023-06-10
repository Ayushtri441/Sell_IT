import React, { Fragment, useContext } from "react";
import Form from "../Components/Create/form";
import { AuthContext } from "../contextStore/AuthContext";
import Login from "../Components/Login/Login";

const CreatePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <Fragment>
      {console.log(user+" ")}
      {user ? (
        <Form />
      ) : (
        <>          
        
          { alert("You must login first")} <Login />
        </>
      )}
    </Fragment>
  );
};

export default CreatePage;
