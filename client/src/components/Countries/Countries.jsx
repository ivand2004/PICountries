import { useEffect, useState } from "react"
import { Country } from "../Country/Country"
import { useDispatch, useSelector } from "react-redux"
import s from "./Countries.css"
import { filterActivities, filterCountries, loadActivities, orderCountries, orderPoblacion } from "../../redux/actions"

export function Countries(){
    const [countries, setCountries] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const allCountries = useSelector(state => state.allCountries)
    const searchedCountries = useSelector(state => state.searchedCountries)
    const continents = []
    allCountries?.forEach(c => {
      if(!continents.includes(c.continent)) continents.push(c.continent)
    })
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch()

  useEffect(() => {
    if(searchedCountries.length > 0) setCountries(searchedCountries)
    else setCountries(allCountries)
    loadActivities(dispatch)
    setCurrentPage(1)
  }, [searchedCountries])

  function pagination(){
    return countries?.slice((currentPage-1)*10, (currentPage)*10)
  }

  function filterCountriesChange(continent){
      dispatch(filterCountries(continent))
      document.getElementById("orderCountries").value = ""
  } //Ojo con esto, con el primer pais lo hace bien, pero despues como quedna cosas en Searchedactivities, intenta filtrarlos de ahi, habria que ver que hacer, si crear un nuevo estado o que, o, escribir un codigo que aprete el boton Home para que se resetee y lo vuelva a mostrar


  function orderCountriesChange(value){
    if(value)dispatch(orderCountries(value))
    document.getElementById("orderPoblacion").value = ""
    setCurrentPage(1)
  }

  function orderPoblacionChange(value){
    if(value)dispatch(orderPoblacion(value))
    document.getElementById("orderCountries").value = ""
    setCurrentPage(1)
  }

  function filterActivity(activity){
    if(activity !== "Activity") dispatch(filterActivities(Number(activity)))//Se lo paso como numero porque llega como string
    setCurrentPage(1)
  }
  //Si se cliquea el de poblacion, deberia resetear el de orden alfabetico y viceversa. Deberia resetear cuando aprete Home.
    return(
        <div className="container">
          <div className="controllers">
          <select name="filterContinent" id="filterContinent" onChange={() => filterCountriesChange(document.getElementById("filterContinent").value)}>
            <option>Continent</option>
            {continents?.map(c => <option value={c}>{c}</option>)}
          </select>
          {activities?.length > 0 ?
          <select name="filterActivity" id="filterActivity" onChange={() => filterActivity(document.getElementById("filterActivity").value)}>
            <option>Activity</option>
            {activities?.map(a => <option value={a.id}>{a.name}</option>)}
          </select>: null}
          {/* Habria que buscar el filtrado segun tipo de actividad, pero ni idea que es eso*/}
          <label htmlFor="orderCountries">Ordenar Paises segun orden alfabetico</label>
          <select name="orderCountries" id="orderCountries" onChange={() => orderCountriesChange(document.getElementById("orderCountries").value)}>
            <option></option>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
          </select>
          <label htmlFor="orderPoblacion">Segun poblacion</label>
          <select name="orderPoblacion" id="orderPoblacion" onChange={() => orderPoblacionChange(document.getElementById("orderPoblacion").value)}>
            <option></option>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
          </select>
          <div className="paginateList">
      {currentPage !== 1? <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>: null}
          {Array.from({ length: Math.ceil(countries?.length / 10) }, (v, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          {currentPage !== Array.from({ length: Math.ceil(countries?.length / 10) }).length ? <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>: null}
          </div>
          </div>
          <div className="countryContainer">
            {pagination().map(c => <Country key={c.id} id={c.id} name={c.name} image={c.flag} continent={c.continent}/>)}
            </div>
            <div className="paginateList">
      {currentPage !== 1? <button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>: null}
          {Array.from({ length: Math.ceil(countries?.length / 10) }, (v, i) => (
            <button key={i} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          {currentPage !== Array.from({ length: Math.ceil(countries?.length / 10) }).length ? <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>: null}
          </div>
        </div>
    )
}