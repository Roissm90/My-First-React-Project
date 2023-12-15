import { useEffect, useState } from "react";
import '../styles/_jobs.scss';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [expandImg, setImageJob] = useState(-1);

    useEffect(() => {
        fetch('https://node-db-ff.vercel.app/trabajosFF')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setJobs(data);
            });
    }, []);

    function handleImageClick(index) {
        if (index === expandImg) {
            setImageJob(-1);
        }
        else {
            setImageJob(index);
        }
    }

    return (
        <section className="container-jobs">
            {jobs.map((job, index) => (
                <article className="container__job" key={job._id} onClick={() => handleImageClick(index)}>
                    <ul className="list-info">
                        <li>{job.trabajo}</li>
                        <li className={`list-item ${index === expandImg ? 'expanded' : ''}`}>{job.descripcion}</li>
                        <li className={`list-info ${index === expandImg ? 'expanded' : ''}`}>Técnicas: {job.tecnicas.join(', ')}</li>
                    </ul>
                    <div className={`container__job-images ${index === expandImg ? 'expanded' : ''}`}>
                    {job.personajesAsociados.map((asociados) => (
                        <img src={asociados.picture} alt="" key={asociados._id}/>
                    ))}
                    </div>
                </article>
            ))}
        </section>
    );
}

export default Jobs;
