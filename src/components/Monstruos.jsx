import { useEffect, useState } from "react";
import '../styles/_invocaciones.scss';

function Monstruos() {
    const [monstruos, setMonstruos] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);

    useEffect(() => {
        fetch('https://node-db-ff.vercel.app/monstruosFF')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMonstruos(data);
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
            {monstruos.map((monstruo, index) => (
                <figure
                    className={`container__invocacion`}
                    key={monstruo._id}
                    onClick={() => handleFigureClick(index)}
                >
                    <h2>{monstruo.name}</h2>
                    <div className={`container__invocacion-picture ${index === expandedIndex ? 'expanded' : ''}`}>
                        <img src={monstruo.picture} alt="" />
                    </div>
                    <div className={`container__invocacion-info ${index === expandedIndex ? 'expanded' : ''}`}>
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
