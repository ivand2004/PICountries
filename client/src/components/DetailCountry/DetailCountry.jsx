import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import s from "./DetailCountry.css"

export function DetailCountry(){
    let {idPais} = useParams()
    const [country, setCountry] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3001/countries/${idPais}`)
        .then(r => setCountry(r.data))
        .catch(err => {
            alert(err.response.data)
            navigate("../countries")
        })
    }, [idPais])

    return(
        <div className="detail-country">
            <h1 className="name-tag">Nombre: {country?.name}</h1>
            <p className="id-tag">ID: {country?.id}</p>
            <img src={country?.flag} alt={country?.name} className="image-tag"/>
            <h3 className="continent-tag">Continente: {country?.continent}</h3>
            <h3 className="capital-tag">Capital: {country?.capital}</h3>
            <h5 className="population-tag">Poblacion: {Number(country?.population).toLocaleString()}</h5>
            <h3 className="activity-tag">Actividades</h3>
            <ul className="activity-list">
                {country?.activities.length>0? country?.activities.map(a => <li className="activity-li">{a.name}, durante {a.season}, con una duracion de {a.duration} horas</li>): <h5>No hay actividades asignadas para este pais</h5>}
            </ul>
            <a href="http://localhost:3000/countries"><button id="home-button">Home</button></a>
        </div>
    )
}