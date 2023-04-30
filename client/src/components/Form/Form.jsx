import { useState } from "react"
import validate from "./validation";
import axios from "axios";
import { useSelector } from "react-redux";
import s from "./Form.css"

export default function Form(props){
    const [inputs, setInputs] = useState({name: "", difficulty: "", duration: "", season: "Verano", countriesIds: []});
    const [errors, setErrors] = useState({name: "", difficulty: "", duration: "", countriesIds: ''});
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
        setInputs({
            ...inputs,
            difficulty: Number(inputs.difficulty),
            duration: Number(inputs.duration)
        })
         setErrors(validate({...inputs}))
        if(Object.entries(errors).length === 0){
            axios.post("http://localhost:3001/activities", inputs)
            .then((d) => {
                setInputs({name: "", difficulty: "", duration: "", season: "Verano", countriesIds: []})
                alert(d.data)
            })
            .catch(err => alert(err))
        }
    }

    function filterCountries(id){
        setInputs({...inputs, countriesIds: inputs.countriesIds.filter(c => c !== id)})
    }

    return <div className="formDiv">
        <h1 id="titleForm">Create Activity</h1>
        <a href="http://localhost:3000/countries"><button id="home-btn">Home</button></a>
        <form action="" onSubmit={handleSubmit} id="activityform">
        <label htmlFor="name" className="labelForm">Name:</label>
        <input className="formInp" type="text" placeholder="Hiking" name="name" value={inputs.name} onChange={handleInputChange}/>
        <p className="errP">{errors.name}</p>
        <label htmlFor="difficulty" className="labelForm">Difficulty: </label>
        <input className="formInp" type="number" name="difficulty" placeholder="3" value={inputs.difficulty} onChange={handleInputChange} min="1" max="5"/>
        <p className="errP">{errors.difficulty}</p>
        <label htmlFor="duration" className="labelForm">Duration: (En horas,ejemplo, 1 hora 30 min = 1.5) </label>
        <input className="formInp" type="number" name="duration" placeholder="1.5" value={inputs.duration} onChange={handleInputChange} min="0" step="0.1"/>
        <p className="errP">{errors.duration}</p>
        <label htmlFor="season" className="labelForm">Season: </label>
        <select className="formInp" name="season" onChange={handleInputChange}>
            <option value="Verano">Verano</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
            <option value="Otoño">Otoño</option>
        </select>
        <label htmlFor="countries" className="labelForm">Pais/Paises: </label>
        <select className="formInp" name="countries" onChange={handleInputChange}>
            <option></option> 
            {countries?.sort((a,b) => a.name.localeCompare(b.name)).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        {inputs.countriesIds.map(c => <span>{
        countries.find(country => country.id === c).name
        }
        <button onClick={() => filterCountries(c)}>X</button>
        </span>)}
        <p className="errP">{errors.countriesIds}</p>
        <button type="submit" className="submit-btn">Submit</button>
        </form>
    </div>
}