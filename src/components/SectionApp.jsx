import { useState, useEffect } from 'react';
import Loading from './Loading'; // Asegúrate de proporcionar la ruta correcta al componente Loading
import { Link } from 'react-router-dom';
import '../styles/_sectionApp.scss';

function SectionApp({ videojuegos }) {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        // Simular una solicitud de API con un tiempo de espera ficticio (3 segundos)
        setTimeout(() => {
            setGames(videojuegos);
            setLoading(false);
        }, 3300); // Esto debería ser reemplazado con tu lógica de llamada a la API real
    }, [videojuegos]);

    let content;
    if (loading) {
        content = <Loading />;
    } else {
        if (games.length > 0) {
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
