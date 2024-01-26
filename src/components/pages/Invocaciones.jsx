import { useEffect, useState, useRef } from "react";
import "../../styles/_invocaciones.scss";
import { API } from "../axios/api";
import { gsap } from "gsap";

function Invocaciones() {
  const [invocaciones, setInvocaciones] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const figuresRef = useRef([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await API.get("invocacionesff");
        setInvocaciones(result.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    if (figuresRef.current.length > 0) {
      gsap.to(figuresRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.5,
      });
      console.log("Invocaciones renderizados:", figuresRef);
    }
  }, [invocaciones]);

  function handleFigureClick(index) {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  }

  return (
    <section className="container-invocaciones">
      {invocaciones.map((invocacion, index) => (
        <figure
          ref={(element) => (figuresRef.current[index] = element)}
          className={`container__invocacion`}
          key={invocacion._id}
          onClick={() => handleFigureClick(index)}
        >
          <h2>{invocacion.name}</h2>
          <div
            className={`container__invocacion-picture ${
              index === expandedIndex ? "expanded" : ""
            }`}
          >
            <img src={invocacion.picture} alt="" />
          </div>
          <div
            className={`container__invocacion-info ${
              index === expandedIndex ? "expanded" : ""
            }`}
          >
            <p>{invocacion.info}</p>
            {invocacion.relatedMagic && (
              <ul>
                <li>Magia Relacionada: {invocacion.relatedMagic.name}</li>
                <li>Tipo de magia: {invocacion.relatedMagic.type}</li>
                <li>{invocacion.relatedMagic.info}</li>
              </ul>
            )}
          </div>
        </figure>
      ))}
    </section>
  );
}

export default Invocaciones;
