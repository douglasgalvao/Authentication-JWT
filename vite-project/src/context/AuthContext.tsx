import api from "../helpers/api";
import { createContext, ReactNode, useContext, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { useNavigate } from "react-router-dom";

type ExampleContextProps = {
  login: (user: string, password: string) => void;
  usuario: Usuario;
  children: ReactNode;
};

type dataContext = {
  login: (user: string, password: string) => void;
  usuario: Usuario | null;
  logout:()=>void;
};

type Usuario = {
  username: string | null;
  created_at: Date | null;
  email: string | null;
  id: string | null;
  updated_at: Date | null;
};

const UserContext = createContext({} as dataContext);

export const ContextProvider: React.FC<ExampleContextProps> = ({
  children
}) => {
  const navegate = useNavigate();
  const [usuario, funcUsuario] = useState<Usuario | null>(null);

  async function login(user: string, password: string) {
    try {
      const validate = await api.post("login", {
        email: user,
        password: password,
      });
      if (
        validate &&
        validate.data &&
        validate.data.token
      ) {
        setCookie(null, "token", validate.data.token.firstToken);
        setCookie(null, "refreshToken", validate.data.token.refreshToken);
        let idUser = await api.get("getUserT");
        funcUsuario(idUser.data.user);
        navegate("/signIn");
      }
      return;
    } catch (e) {
      throw e;
    }
  }

  async function logout(){
    setCookie(null, "token", "");
    setCookie(null, "refreshToken", "");
    navegate('/login');
  }

  return (
    <UserContext.Provider value={{ login, usuario,logout }}>
      {""}
      {children}
      {""}
    </UserContext.Provider>
  );
};

export const useExample = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("context must be used within an Provider");
  }
  return context;
};
