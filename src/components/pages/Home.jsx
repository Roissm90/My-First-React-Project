import { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import "../../styles/_sectionApp.scss";
import { API } from "../axios/api";
import { gsap } from "gsap";

function SectionApp({ videojuegos }) {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await API.get("videojuegosff");
        setGames(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchApi();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const videogames = containerRef.current.querySelectorAll('.container__videogame');
      if (videogames.length > 0) {
        gsap.to(videogames, { opacity: 1, scale: 1, duration: 2 });
      }
    }
  }, [games]);

  let content;

  if (loading) {
    content = <Loading />;
  } else {
    if (games) {
      content = games.map((juego) => (
        <Link
          className={`container__videogame`}
          key={juego._id}
          to={`/detail/${juego.nombre}/${juego._id}`}
        >
          <img src={juego.picture} alt="portada del videojuego" />
          <ul className="game-info">
            <li>{juego.nombre}</li>
            <li>Director: {juego.director}</li>
            <li>Año: {juego.anio}</li>
            <li>Mundo: {juego.mundo}</li>
          </ul>
        </Link>
      ));
    }
  }

  return (
    <section className="container-main" ref={containerRef}>
      {content}
    </section>
  );
}

export default SectionApp;
