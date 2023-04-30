import s from "./Landing.css"

export function Landing(props){
    return(
        <div className="landing">
            <div id="welcome">
                <h1 id="title">COUNTRIES PROJECT</h1>
                <h3 id="subtitle">Ivan Daicich</h3>
            <a href="/countries"><button className="home-button">Home</button></a>
            </div>
        </div>
    )
}