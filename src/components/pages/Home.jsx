import { useState, useEffect } from 'react';
import Loading from '../Loading'; // Asegúrate de proporcionar la ruta correcta al componente Loading
import { Link } from 'react-router-dom';
import '../../styles/_sectionApp.scss';
import { API } from '../axios/api';

function SectionApp({ videojuegos }) {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await API.get('videojuegosff');
        setGames(result.data);  // Ajuste para obtener result.data en lugar de solo result
        setLoading(false);
        //console.log(result.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchApi();
  }, []);
    
    let content;
    
    if (loading) {
        content = <Loading />;
    } else {
        if (games) {
            content = games.map((juego) => (
                <Link
                    className="container__videogame"
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
        <section className="container-main">
            {content}
        </section>
    );
}

export default SectionApp;
