import { useEffect, useState } from "react";
import '../../styles/_jobs.scss';
import { API } from '../axios/api';

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [expandImg, setImageJob] = useState(-1);

    useEffect(() => {
        const fetchApi = async () => {
          try {
            const result = await API.get('trabajosff');
            setJobs(result.data);  // Ajuste para obtener result.data en lugar de solo result
            //console.log(result.data);
          } catch (error) {
            console.error("Error fetching data from API:", error);
          }
        };
    
        fetchApi();
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
