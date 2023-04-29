import { useEffect, useState } from "react"
import { Country } from "../Country/Country"
import { useDispatch, useSelector } from "react-redux"
import s from "./Countries.css"
import { filterActivities, filterCountries, loadActivities, orderCountries, orderPoblacion } from "../../redux/actions"

// CHEQUEAR TEMA DE REDUCER

//REDUCER
/*
ALLCountries
SearchedCountries
Activities
Continent: String
Activity: String
filteredCountries: []
*/
/* 


El dispatch del filtro deberia cambiar la string, y luego modificar filteredCountries, dependiendo si se busco algo antes(SearchedCountries) o no (AllCountries).
El boton Home, deberia resetear todo (Continent, Activity, searchedCountries y filteredCountries)

O PUEDO  TENER OTROS 2 ARREGLOS, UNO QUE TENGA LOS FILTRADOS POR CONTINENTE Y OTRO POR ACTIVIDAD, Y QUE SE VAYAN HACIENDO SEGUN LO QUE TENIA.
*/

export function Countries(){
    const [countries, setCountries] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const allCountries = useSelector(state => state.allCountries)
    const searchedCountries = useSelector(state => state.searchedCountries)
    const filterOrderCountries = useSelector(state => state.filterOrderCountries)
    const continents = []
    allCountries?.forEach(c => {
      if(!continents.includes(c.continent)) continents.push(c.continent)
    })
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch()

  useEffect(() => {
    if(filterOrderCountries.length > 0) setCountries(filterOrderCountries)
    else if(searchedCountries.length > 0) setCountries(searchedCountries)
    else setCountries(allCountries)
    loadActivities(dispatch)
    setCurrentPage(1)
  }, [searchedCountries, filterOrderCountries])

  function pagination(){
    return countries?.slice((currentPage-1)*10, (currentPage)*10)
  }

  function filterCountriesChange(continent){
      dispatch(filterCountries(continent))
      document.getElementById("orderCountries").value = ""
  }

  function orderCountriesChange(value){
    if(value)dispatch(orderCountries(value))
    document.getElementById("orderPoblacion").value = ""
    setCurrentPage(1)
  }

  function orderPoblacionChange(value){
    if(value) dispatch(orderPoblacion(value))
    document.getElementById("orderCountries").value = ""
    setCurrentPage(1)
  }

  function filterActivity(activity){
    if(activity !== "Activity") dispatch(filterActivities(Number(activity)))//Se lo paso como numero porque llega como string
    setCurrentPage(1)
  }

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