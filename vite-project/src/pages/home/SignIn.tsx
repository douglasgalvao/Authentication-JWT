import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/api";
import { useExample } from "../../context/AuthContext";
import "../../pages/home/components/SignIn.css";
import axios from "axios";
export default function Home() {
  const navegate = useNavigate();
  const { logout, usuario } = useExample();
  const [emailPlace,setEP] = useState("email");
  const [passPlace,setPassplace] = useState("password");
  const [userPlace,setUserPlace] = useState("username");
  function createUser(event:any){
    axios.post("http://localhost:3000/createUser",{
    email:event.target[0].value,
    username:event.target[1].value,
    password:event.target[2].value,
    });
    // navegate("/login");
  }
  useEffect(() => {
    async function returnIDfromCookies() {
      const firstToken = getCookie("token");

      if (!firstToken || firstToken == "undefined") {
        navegate("/login");
      }
    }
    returnIDfromCookies();
  }, []);

  return (
    <div className="home">
      <div style={{"display":"flex" , justifyContent:"space-evenly",width:"100vw" ,height:"5%",paddingBottom:"30%"}}>
      <button className="btnLogout" onClick={() => logout()} type="button">
        Log out
      </button>
      <h1>Welcome {usuario?.username}</h1>
      </div>
      <div className="formLogin">
      <form onSubmit={(e)=>{e.preventDefault();createUser(e)}}>
      <label htmlFor="email">email</label>
        <input style={{width:"100%",height:"15%"}} name="email" type="text" onFocus={()=>{setEP("")}} onBlur={()=>setEP("email")} placeholder={emailPlace} />
        <label htmlFor="username">username</label>
        <input style={{width:"100%",height:"15%"}} name="username" type="text" onFocus={()=>{setUserPlace("")}} onBlur={()=>{setUserPlace("username")}} placeholder={userPlace} />
        <label htmlFor="pass">password</label>
        <input style={{width:"100%",height:"15%"}} name="pass" type="password" onFocus={()=>{setPassplace("")}} onBlur={()=>{setPassplace("password")}} placeholder={passPlace} />
        <input type="submit" value="create"/>
      </form>
      {/* <button style={{marginTop:"10%"}}className="btnHome" onClick={()=>{createUser()}} type="button">
        Create a user
      </button> */}
      </div>
    </div>
  );
}
