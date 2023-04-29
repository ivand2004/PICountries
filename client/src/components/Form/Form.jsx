import { useEffect, useState } from "react"
import validate from "./validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Form(props){
    const [inputs, setInputs] = useState({name: "", difficulty: "", duration: "", season: "Verano", countriesIds: []}); //Le pongo como default a season el valor de Verano por si el usuario no toca nada.
    const [errors, setErrors] = useState({});
    const countries= useSelector(state => state.allCountries)

    function handleInputChange(e){
        if(e.target.name === "countries") {
            if(!inputs.countriesIds.includes(e.target.value))
            setInputs({...inputs, countriesIds: inputs.countriesIds.concat(e.target.value)})
    }
        else setInputs({...inputs, [e.target.name] : e.target.value})
        setErrors(validate({...inputs, [e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //Hay que cambiar los tipos de cada input para que mande ints cuando los necesite, y chequear que no haya errores
        setInputs({
            ...inputs,
            difficulty: Number(inputs.difficulty),
            duration: Number(inputs.duration)
        }) // Como los numeros llegan como str, los paso a numeros
         // Cuando se carga la pagina, y se hace directo un submit, los errores cambian despues del submit, por lo cual sigue haciendo el POST.
         setErrors(validate({...inputs}))
        if(Object.entries(errors).length === 0){
            axios.post("http://localhost:3001/activities", inputs)
            .then(() => {
                setInputs({name: "", difficulty: "", duration: "", season: "Verano", countriesIds: []})
                alert("Actividad creada")
            })
            .catch(err => alert(err))
        }
    }

    function filterCountries(id){
        setInputs({...inputs, countriesIds: inputs.countriesIds.filter(c => c !== id)})
    }

    //Hay que limpiar los inputs cuando se cargo una actividad y alerta que fue con exito.

    return <div className="formDiv">
        <h1>Create Activity</h1>
        <a href="http://localhost:3000/countries"><button>Home</button></a>
        <form action="" onSubmit={handleSubmit} id="activityform">
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="Hiking" name="name" value={inputs.name} onChange={handleInputChange}/>
        <p>{errors.name}</p>
        <label htmlFor="difficulty">Difficulty: </label>
        <input type="number" name="difficulty" placeholder="3" value={inputs.difficulty} onChange={handleInputChange} min="1" max="5"/>
        <p>{errors.difficulty}</p>
        <label htmlFor="duration">Duration: (En horas,ejemplo, 1 hora 30 min = 1.5) </label>
        <input type="number" name="duration" placeholder="1.5" value={inputs.duration} onChange={handleInputChange} min="0" step="0.1"/>
        <p>{errors.duration}</p>
        <label htmlFor="season">Season: </label>
        <select name="season" onChange={handleInputChange}>
            <option value="Verano">Verano</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
            <option value="Otoño">Otoño</option>
        </select>
        <label htmlFor="countries">Pais/Paises: </label>
        <select name="countries" onChange={handleInputChange}>
            <option></option> {/* Agregue esta opcion en blanco para que me dej tocar la primera opcion, sin tener que elegir otra antes*/}
            {countries?.sort((a,b) => a.name.localeCompare(b.name)).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {inputs.countriesIds.map(c => <span>{
        countries.find(country => country.id === c).name
        }
        <button onClick={() => filterCountries(c)}>X</button>
        </span>)}
        <p>{errors.countriesIds}</p>
        {/* La idea aca seria que se vayan agregando a la pantalla y tener una x al lado de cada uno entonces se pueden ir eliminando, habria que chequear que tampoco este repetido*/}
        <button type="submit">Submit</button>
        </form>
    </div>
}