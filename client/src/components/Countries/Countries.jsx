import { useEffect, useState } from "react"
import { Country } from "../Country/Country"
import { useDispatch, useSelector } from "react-redux"
import s from "./Countries.css"
import { filterActivities, filterCountries, loadActivities} from "../../redux/actions"
import { Pagination } from "../Pagination/Pagination"

export function Countries(){
    const [countries, setCountries] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const allCountries = useSelector(state => state.allCountries)
    const searchedCountries = useSelector(state => state.searchedCountries)
    const filteredByContinent = useSelector(state => state.filteredByContinent)
    const filteredByActivity = useSelector(state => state.filteredByActivity)
    const continents = []
    allCountries?.forEach(c => {
      if(!continents.includes(c.continent)) continents.push(c.continent)
    })
    const activities = useSelector(state => state.activities)
    const dispatch = useDispatch()

  useEffect(() => {
    if(filteredByContinent?.length > 0) setCountries(filteredByContinent)
    else if (filteredByActivity?.length > 0) setCountries(filteredByActivity)
    else if(searchedCountries?.length > 0) setCountries(searchedCountries)
    else if(allCountries?.length >0) setCountries(allCountries)
    loadActivities(dispatch)
    setCurrentPage(1)
  }, [allCountries, searchedCountries, filteredByContinent, filteredByActivity])

  function pagination(){
    return countries?.slice((currentPage-1)*10, (currentPage)*10)
  }

  function filterCountriesChange(continent){
    console.log(continent);
      dispatch(filterCountries(continent))
      document.getElementById("orderCountries").value = ""
  }

  function orderCountriesChange(value){
    let copycountries = [...countries]
    if(value === "ascendente") {
      setCountries(copycountries.sort((a,b) => a.name.localeCompare(b.name)))
    }else if(value === "descendente"){
      setCountries(copycountries.sort((a,b) => b.name.localeCompare(a.name)))
    }
    document.getElementById("orderPoblacion").value = ""
    setCurrentPage(1)
  }

  function orderPoblacionChange(value){
    let copycountries = [...countries]
    if(value === "ascendente") {
      setCountries(copycountries.sort((a,b) => a.population - b.population))
    }else if(value === "descendente"){
      setCountries(copycountries.sort((a,b) => b.population - a.population))
    }
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
            <option>Todos</option>
            {continents?.map(c => <option value={c}>{c}</option>)}
          </select>
          {activities?.length > 0 ?
          <select name="filterActivity" id="filterActivity" onChange={() => filterActivity(document.getElementById("filterActivity").value)}>
            <option>Actividad</option>
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
          <Pagination countries={countries} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
          </div>
          <div className="countryContainer">
            {pagination().map(c => <Country key={c.id} id={c.id} name={c.name} image={c.flag} continent={c.continent}/>)}
            </div>
            <Pagination countries={countries} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
    )
}