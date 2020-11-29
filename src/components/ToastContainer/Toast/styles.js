import styled, {css} from "styled-components";
import {animated } from "react-spring"


// Padrão de estilização do toast que recebe pelo hook
const toastTypeVariations = {
  info: css`
    background: #ebf8ff;
    color: #2714cc;
  `,
  success: css`
    background: #e6fffa;
    color: #25af13;
  `,
  error: css `
    background: #fddede;
    color: #c22626;
  
  `
}

export const Container = styled(animated.div)`
  width: 360px; // Tamanho da div
  position:relative;
  padding: 16px 30px 16px 16px; // Tamanho da margem interna
  border-radius: 10px; // Tamanho do arredodamento
  box-shadow: 2px 2px 6px rgba(0,0,0,0.2); // Sombreamento

  display: flex;
  
  & + div { // Pega um component TOAST que antes deçe tem outro toast e coloca 16px
    margin-top: 8px;
  }
  
  // Ele verifica o typo do props type que recebe estiliza de arcordp com 
  // o toastTypeVariations senão tiver nenhum type ele coloca o do tipo 'info'
  ${props => toastTypeVariations[props.type || 'info']}


  > svg { //Dessa forma pega o icone de tendro do Toast
   margin: 0 12px 0  0;
    //Margin do Icone
  }

  div{
    flex: 1;

    p {
      margin-top: 5px;
      font-size: 14px;
      opacity: 0.8; //Opacidade 
      line-height: 20px; // Distancia entre a linhas quebradas
    }
  }

  button {
    position: absolute;
    right: 8px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit; // Pega a color utilizada no Container

  }

  ${props => Number(!props.hasDescription) && css`
      align-items: center;
      svg{
        margin-top: 0;
      }
  ` };
`;