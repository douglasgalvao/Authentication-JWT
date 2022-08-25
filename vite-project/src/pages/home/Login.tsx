import "./Login.css";
import Screen from "./components/Screen";
import axios from "axios";
// @ts-ignore
import Form from "./components/Form";
import { useContext, useState } from "react";
import { useExample } from "../../context/AuthContext";
export default function Home() {
  const { login } = useExample();
  const [email, funcEmail] = useState("douglas-mad@live.com");
  const [placeholderInput, setInputHolder] = useState("example@hotmail.com");
  const [placeholderPassword, setPasswordHolder] = useState("Password");
  const [password, funcPassword] = useState("110698");
  return (
    <div className="underBody">
      <Screen>
        <div className="form">
          <div className="formLogin">
            <h1 className="authJWTh1">Authenticate</h1>
            <label className="labelLogin" htmlFor="login">
              Email
            </label>
            <input
              className="loginInput"
              onChange={(e) => funcEmail(e?.target.value)}
              type="text"
              value={email}
              placeholder={placeholderInput}
              onBlur={() => {
                setInputHolder("example@hotmail.com");
              }}
              onFocus={()=>{setInputHolder("")}}
            />
            <label className="labelPassword" htmlFor="password">
              Password
            </label>
            <input
              className="passInput"
              onChange={(e) => funcPassword(e?.target.value)}
              type="password"
              value={password}
              placeholder={placeholderPassword}
              onBlur={()=>{
                setPasswordHolder("Password")
              }}
              onFocus={()=>{
                setPasswordHolder("");
              }}
            />
            <button
              className="btnLogin"
              onClick={() => {
                login(email, password);
              }}
              type="submit"
            >
              Login
            </button>
            <div
              style={{
                width: "250px",
                wordWrap: "break-word",
                marginTop: "20px",
                color: "yellow",
                fontSize: "large",
              }}
            ></div>
          </div>
        </div>
      </Screen>
    </div>
    
  );
}
