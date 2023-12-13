import { useState, useEffect } from 'react';
import Loading from './Loading'; // Asegúrate de proporcionar la ruta correcta al componente Loading
import { Link } from 'react-router-dom';
import '../styles/_sectionApp.scss';

function SectionApp({ videojuegos }) {
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Realizar la solicitud a la API
                const response = await fetch('https://node-db-ff.vercel.app/videojuegosFF');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                
                setGames(data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

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
