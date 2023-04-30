import { useDispatch } from "react-redux"
import { filterActivities, filterCountries} from "../../redux/actions"
import s from "./FilterOrder.css"

export function FilterOrder(props){

    const dispatch = useDispatch();

    function filterCountriesChange(continent){
          dispatch(filterCountries(continent))
          document.getElementById("orderPoblacion").value = ""
          document.getElementById("orderCountries").value = ""
          props.setCurrentPage(1)
      }
    
      function orderCountriesChange(value){
        let copycountries = [...props.countries]
        if(value === "ascendente") {
          props.setCountries(copycountries.sort((a,b) => a.name.localeCompare(b.name)))
        }else if(value === "descendente"){
            props.setCountries(copycountries.sort((a,b) => b.name.localeCompare(a.name)))
        }
        document.getElementById("orderPoblacion").value = ""
        props.setCurrentPage(1)
      }
    
      function orderPoblacionChange(value){
        let copycountries = [...props.countries]
        if(value === "ascendente") {
            props.setCountries(copycountries.sort((a,b) => a.population - b.population))
        }else if(value === "descendente"){
            props.setCountries(copycountries.sort((a,b) => b.population - a.population))
        }
        document.getElementById("orderCountries").value = ""
        props.setCurrentPage(1)
      }
    
      function filterActivity(activity){
        if(activity !== "Activity") dispatch(filterActivities(Number(activity)))
        document.getElementById("orderPoblacion").value = ""
        document.getElementById("orderCountries").value = ""
        props.setCurrentPage(1)
      }

    return(
        <div className="controllers">
          <select name="filterContinent" id="filterContinent" className="filterbutton" onChange={() => filterCountriesChange(document.getElementById("filterContinent").value)}>
            <option>Todos</option>
            {props.continents?.map(c => <option value={c}>{c}</option>)}
          </select>
          {props.activities?.length > 0 ?
          <select name="filterActivity" id="filterActivity" className="filterbutton" onChange={() => filterActivity(document.getElementById("filterActivity").value)}>
            <option value="0">Actividad</option>
            {props.activities?.map(a => <option value={a.id}>{a.name}</option>)}
          </select>: null}
          <label htmlFor="orderCountries">Ordenar segun: </label>
          <select name="orderCountries" id="orderCountries" className="filterbutton" onChange={() => orderCountriesChange(document.getElementById("orderCountries").value)}>
            <option></option>
              <option value="ascendente">A-Z</option>
              <option value="descendente">Z-A</option>
          </select>
          <label htmlFor="orderPoblacion">O segun poblacion</label>
          <select name="orderPoblacion" id="orderPoblacion" className="filterbutton" onChange={() => orderPoblacionChange(document.getElementById("orderPoblacion").value)}>
            <option></option>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
          </select>
          </div>
    )
}