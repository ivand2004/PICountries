import s from "./Landing.css"

export function Landing(props){
    return(
        <div className="landing">
            <div id="welcome">
                <h1 id="title">COUNTRIES PROJECT</h1>
                <h3 id="subtitle">Por: Ivan Daicich</h3>
                <h5 id="description">Bienvenido a la pagina donde puedes visualizar y agregar actividades a mas de 200 paises</h5>
            <a href="/countries"><button className="home-button">Home</button></a>
            </div>
        </div>
    )
}