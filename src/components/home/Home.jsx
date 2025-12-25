import React from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";


const Home = () => {
    
    const navigate = useNavigate();

    return (
        <div className="Home">
            <main className="Home-main">
                <section className="Bienvenido">
                    <h1>TRANSFORMA TU <span>CUERPO</span></h1>
                    <h2>ELEVA TU <span>MENTE</span></h2>
                    <p>En Gym Proyect te ayudamos a alcanzar tu mejor versión con instalaciones de primera y entrenadores especializados.</p>
                    <div className="botones-bienvenida">
                        <button onClick={() => navigate('/planes')}>VER PLANES</button>
                        <button onClick={() => navigate('/servicios')}>SERVICIOS</button>
                    </div>
                </section>

                <section className="porque-bienvenido">
                    <h2>¿POR QUÉ ENTRENAR EN <span>Gym Proyect?</span></h2>
                    <div className="tarjetas-container">
                        <div className="tarjeta-info">
                            <h3>EQUIPAMIENTO DE PRIMERA</h3>
                            <p>Contamos con las mejores máquinas y equipos para optimizar tu entrenamiento y resultados.</p>
                        </div>
                        <div className="tarjeta-info">
                            <h3>ENTRENADORES PROFESIONALES</h3>
                            <p>Nuestro equipo de entrenadores certificados te guiará para alcanzar tus objetivos de forma segura.</p>
                        </div>
                    </div>
                </section>

                <section className="clases-bienvenida">
                    <h2>NUESTRAS CLASES</h2>
                    <p>Descubre la variedad de clases grupales diseñadas para todos los niveles y objetivos.</p>
                    <div className="tarjetas-container">
                        <div className="tarjeta-clase">
                            <h3>Cardio</h3>
                        </div>
                        <div className="tarjeta-clase">
                            <h3>Yoga y Pilates</h3>
                        </div>
                        <div className="tarjeta-clase">
                            <h3>Fuerza y Musculación</h3>
                        </div>
                    </div>
                    <button onClick={() => navigate('/servicios')}>VER TODAS LAS CLASES</button>
                </section>

                <section className="cta-bienvenida">
                    <h2>¿LISTO PARA EMPEZAR A TRANSFORMAR TU VIDA?</h2>
                    <p>Únete a nuestra comunidad y comienza tu viaje hacia un estilo de vida más saludable y activo.</p>
                    <button onClick={() => navigate('/login')}>COMENZAR AHORA</button>
                </section>
            </main>
        </div>
    );
    }

export default Home;