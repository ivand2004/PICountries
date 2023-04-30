import { useEffect, useState } from "react"
import { Country } from "../Country/Country"
import { useDispatch, useSelector } from "react-redux"
import s from "./Countries.css"
import {loadActivities} from "../../redux/actions"
import { Pagination } from "../Pagination/Pagination"
import { FilterOrder } from "../FIlterOrder/FilterOrder"

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

    return(
        <div className="container">
          <FilterOrder continents={continents} activities={activities} setCurrentPage={setCurrentPage} countries={countries} setCountries={setCountries} />
          <Pagination countries={countries} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
          <div className="countryContainer">
            {pagination().map(c => <Country key={c.id} id={c.id} name={c.name} image={c.flag} continent={c.continent}/>)}
            </div>
            <Pagination countries={countries} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
    )
}