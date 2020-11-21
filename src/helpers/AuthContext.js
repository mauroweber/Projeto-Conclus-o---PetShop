import React, { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";
import Api from "./Api";
import { useContext } from "react";
//autetenticação

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@PetsCare:token');

    if (token) {
      return {token};
    }

    return {};
  });

  const signIn = useCallback(async ({ email, key_password }) => {
    await Api.post("/auth", { email: email, key_password: key_password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('@PetsCare:token', token);
        setData({token});
      }).catch(error => {
        console.error(error);
      });
  }, [])

  const signOut = useCallback(() => {
        localStorage.removeItem('@PetsCare:token');

        setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ token: data.token  , signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(){
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth deve ser usado dentro de um AuthProvider no APP.');
  }

  return context;
}



export { AuthProvider, useAuth };