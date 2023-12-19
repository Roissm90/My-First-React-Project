// UserContext.js
import { createContext, useEffect, useState } from "react";

export const PersonajesContext = createContext();

export const PersonajesProvider = ({ children }) => {
  const [personajesList, setPersonajesList] = useState([]);

  useEffect(() => {
    fetch('https://node-db-ff.vercel.app/personajesFF')
      .then((responsePersonajes) => responsePersonajes.json())
      .then((dataPersonajes) => {
        setPersonajesList(dataPersonajes);
      });
  }, []);

  return (
    <PersonajesContext.Provider value={{ personajesList }}>
      {children}
    </PersonajesContext.Provider>
  );
};
