import { useEffect, useState, useRef } from "react";
import '../../styles/_jobs.scss';
import { API } from '../axios/api';
import { gsap } from "gsap";

function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [expandImg, setImageJob] = useState(-1);
    const containerRef = useRef(null);
    const jobsRef = useRef([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await API.get('trabajosff');
                setJobs(result.data); 
            } catch (error) {
                console.error("Error fetching data from API:", error);
            }
        };
    
        fetchApi();
    }, []);
    
    useEffect(() => {
        if (containerRef.current) {
            const jobElements = containerRef.current.querySelectorAll(".container__job");
            jobElements.forEach((jobElement, index) => {
                gsap.to(jobElement, { opacity: 1, x: -0, duration: 1, delay: index * 0.3 });
            });
        }
    }, [jobs]);

    function handleImageClick(index) {
        if (index === expandImg) {
            setImageJob(-1);
        }
        else {
            setImageJob(index);
        }
    }

    return (
        <section className="container-jobs" ref={containerRef}>
            {jobs.map((job, index) => (
                <article 
                    ref={(el) => (jobsRef.current[index] = el)} 
                    className={`container__job ${index % 2 === 0 ? 'odd' : ''}`} 
                    key={job._id} 
                    onClick={() => handleImageClick(index)}
                >
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
