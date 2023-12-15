import { useEffect, useState } from "react";
import '../styles/_invocaciones.scss';

function Invocaciones() {
    const [invocaciones, setInvocaciones] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);

    useEffect(() => {
        fetch('https://node-db-ff.vercel.app/invocacionesFF')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setInvocaciones(data);
            });
    }, []);

    function handleFigureClick(index) {
        if (index === expandedIndex) {
            setExpandedIndex(-1); // Contrae si ya está expandido
        } else {
            setExpandedIndex(index); // Expande si no está expandido
        }
    }

    return (
        <section className="container-invocaciones">
            {invocaciones.map((invocacion, index) => (
                <figure
                    className={`container__invocacion`}
                    key={invocacion._id}
                    onClick={() => handleFigureClick(index)}
                >
                    <h2>{invocacion.name}</h2>
                    <div className={`container__invocacion-picture ${index === expandedIndex ? 'expanded' : ''}`}>
                        <img src={invocacion.picture} alt="" />
                    </div>
                    <div className={`container__invocacion-info ${index === expandedIndex ? 'expanded' : ''}`}>
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
