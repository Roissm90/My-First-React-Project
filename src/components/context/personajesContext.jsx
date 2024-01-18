// UserContext.js
import { createContext, useState, useEffect } from "react";
import { API } from "../axios/api";

export const PersonajesContext = createContext();

export const PersonajesProvider = ({ children }) => {
  const [personajesList, setPersonajesList] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await API.get('personajesff');
        setPersonajesList(result.data);  // Ajuste para obtener result.data en lugar de solo result
        //console.log(result.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchApi();
  }, []);

  return (
    <PersonajesContext.Provider value={{ personajesList }}>
      {children}
    </PersonajesContext.Provider>
  );
};

