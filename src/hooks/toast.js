import React, { createContext, useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import ToastContainer from "../components/ToastContainer";
import {v4 } from "uuid";

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback(({type, title, description}) => {
    const id = v4();
    const toast ={
      id,
      type,
      title,
      description
    }

    setMessages((oldMessages) => [...oldMessages, toast]);
  },[]);

  
  const removeToast = useCallback((id) =>{
    setMessages((oldMesssages) => oldMesssages.filter((message) => message.id !== id));
  },[]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast}}>
      {children}
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  )
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("Use useToast dentro de componente ToastProvider");
  }
  return context;
}
export  {ToastProvider, useToast};