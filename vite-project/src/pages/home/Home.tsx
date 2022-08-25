import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helpers/api";
import { useExample } from "../../context/AuthContext";
import "../../pages/home/components/Home.css";
export default function Home() {
  const navegate = useNavigate();
  const {logout} = useExample();
  useEffect(() => {
    async function returnIDfromCookies() {
      const firstToken = getCookie("token");
      
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
        Welcome, you done!!
      </button>

      <button className="btnAnotherPage" onClick={e=>navegate('../about')}>Going to Another Page</button>
    </div>
  );
}
