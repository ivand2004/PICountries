import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

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
 //Chequear si no hay que mostrar las actividades

    return(
        <div>
            <h1>Nombre: {country?.name}</h1>
            <p>ID: {country?.id}</p>
            <img src={country?.flag} alt={country?.name} />
            <h3>Continente: {country?.continent}</h3>
            <h3>Capital: {country?.capital}</h3>
            <h5>Poblacion: {country?.population}</h5>
            <h3>Actividades</h3>
            <ul>
                {country?.activities.length>0? country?.activities.map(a => <li>{a.name}, during {a.season}, with a duration of {a.duration} hours</li>): <h5>No hay actividades asignadas para este pais</h5>}
            </ul>
            <a href="http://localhost:3000/countries"><button>Home</button></a>
        </div>
    )
}