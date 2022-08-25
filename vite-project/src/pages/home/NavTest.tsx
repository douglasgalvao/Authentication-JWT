import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/api";
import { useExample } from "../../context/AuthContext";
import "../../pages/home/components/NavTest.css";
import axios from "axios";
export default function Home() {
  const navegate = useNavigate();
  const {logout} = useExample();
  useEffect(() => {
    async function returnIDfromCookies() {
      let firstToken = getCookie("token") as string
      await axios.get('http://localhost:3000/getUser',{
        headers:{
          authorization:firstToken
        }
      });
      
      if (!firstToken || firstToken=="undefined") {
        navegate("/login");
      }
    }
    returnIDfromCookies();
  }, []);

  return (
    <div className="bodyy">
      <button className="btnLogout" onClick={()=>logout()} type="button">Log out</button>
      <button className="btnHome" type="button">
        Testing done!!
      </button>

    </div>
  );
}
