import React from "react";
import PropType from "prop-types";
import {useTransition} from "react-spring";

import { Container } from "./styles";


import Toast from "./Toast/index"


 const ToastContainer = ({ messages })  => {
  const messagesWithTransitions = useTransition( //Usando a Biblioteca react Spring para fazer animação
    messages,
    (message) => message.id,
    {
      from: { right: '-150%', opacity: 0},
      enter: {right: '0%' , opacity: 1},
      leave: { right: '-150%', opacity: 0}
    }
  );

  return (

    <Container>
      {messagesWithTransitions.map(({item, key, props}) => (
        <Toast  key={key} style={props} message={item}/>
      ))}
    </Container>
  );

};
export default ToastContainer;

ToastContainer.propTypes = {
  messages: PropType.arrayOf(PropType.object).isRequired
}