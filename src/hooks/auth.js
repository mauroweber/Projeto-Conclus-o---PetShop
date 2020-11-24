import React, { createContext, useCallback, useState } from "react";
import api from "../helpers/Api";
import { useContext } from "react";
//import {useToast} from "./toast";
//autetenticação

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //const {addToast} = useToast();
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@PetsCare:token');

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {token};
    }
    return {};
  });

  const signIn = useCallback(async ({ email, key_password }) => {
    await api.post("/auth", { email: email, key_password: key_password })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('@PetsCare:token', token);

        api.defaults.headers.authorization = `Bearer ${token}`;
        setData({token});


        // addToast({
        //   type: 'success',
        //   title: 'Usuario Logado com Sucesso!',
        // });
      }).catch(error => {

        
        // addToast({
        //   type: 'error',
        //   title: error.title,
        //   description: "Descrição"
        // });
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