import { createContext, useEffect, useState } from "react";

export const TitlesContext = createContext();

export const TitlesProvider = ({ children }) => {
  const [titlesList, setTitlesList] = useState([]);

  useEffect(() => {
    fetch('https://node-db-ff.vercel.app/videojuegosFF')
      .then((response) => response.json())
      .then((data) => {
        setTitlesList(data);
      });
  }, []);

  return (
    <TitlesContext.Provider value={{ titlesList }}>
      {children}
    </TitlesContext.Provider>
  );
};