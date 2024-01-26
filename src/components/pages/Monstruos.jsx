import { useEffect, useState, useRef } from "react";
import "../../styles/_invocaciones.scss";
import { API } from "../axios/api";
import { gsap } from "gsap";

function Monstruos() {
  const [monstruos, setMonstruos] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const figuresRef = useRef([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await API.get("monstruosff");
        setMonstruos(result.data);
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
  }, [monstruos]);

  function handleFigureClick(index) {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  }

  return (
    <section className="container-invocaciones">
      {monstruos.map((monstruo, index) => (
        <figure
          ref={(element) => (figuresRef.current[index] = element)}
          className={`container__invocacion`}
          key={monstruo._id}
          onClick={() => handleFigureClick(index)}
        >
          <h2>{monstruo.name}</h2>
          <div
            className={`container__invocacion-picture ${
              index === expandedIndex ? "expanded" : ""
            }`}
          >
            <img src={monstruo.picture} alt="" />
          </div>
          <div
            className={`container__invocacion-info ${
              index === expandedIndex ? "expanded" : ""
            }`}
          >
            <p>{monstruo.info}</p>
            {monstruo.hability && (
              <ul>
                <li>Magia Relacionada: {monstruo.hability.name}</li>
                <li>Tipo de magia: {monstruo.hability.type}</li>
                <li>{monstruo.hability.info}</li>
              </ul>
            )}
          </div>
        </figure>
      ))}
    </section>
  );
}

export default Monstruos;
