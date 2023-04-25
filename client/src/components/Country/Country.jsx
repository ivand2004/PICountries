import s from "./Country.css"

export function Country(props){
    return(
        
        <div className="countryCard">
            <a href={`http://localhost:3000/countries/${props.id}`} className="countryLink">
            <h1>{props.name}</h1>
            <img src={props.image} alt={props.name} className="flag"/>
            <h2>{props.continent}</h2>
            </a>
        </div>
        
    )
}