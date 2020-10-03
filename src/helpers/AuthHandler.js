//responsavél para ver se o usuário está logado ou não
import Cookies from "js-cookie";

//função para ver se está logado
export const isLogged = () => {
  let token = Cookies.get("token");

  return token ? true : false;
};

//função para logar no sistema

export const doLogin = (token, remenberPassword = false) => {
  if (remenberPassword) {
    Cookies.set("token", token, { expires: 999 }); //Define o tempo para expirar o login ex: 999 dias
  } else {
    Cookies.set("token", token); //Não armazena o login se não marcar
  }
};

//função para deslogar do sistema

export const doLogout = () => {
  Cookies.remove("token");
};
