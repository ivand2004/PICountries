import {useDispatch} from 'react-redux'
import { addCountries, searchCountry } from "../../redux/actions";
import s from "./SearchBar.css"

export default function SearchBar() {
   const dispatch = useDispatch()

   function searchCountryClick(value){
      searchCountry(value, dispatch)
      document.getElementById("orderCountries").value = ""
      document.getElementById("filterContinent").value = "Todos"
      if(document.getElementById("filterActivity")) document.getElementById("filterActivity").value = "Actividad"
   }

   function resetCountries(){
      dispatch(addCountries([]))
      document.getElementById("searchCountry").value = ""
      document.getElementById("orderCountries").value = ""
      document.getElementById("filterContinent").value = "Todos"
      if(document.getElementById("filterActivity")) document.getElementById("filterActivity").value = "Actividad"
   }

   return (
      <div className='containerSearch'>
        <input type='search' name="name" id="searchCountry"/>
        <button id='magnifier' onClick={() => searchCountryClick(document.getElementById('searchCountry').value)}>&#x1F50E;</button>
        <button id='homeButton' onClick={resetCountries}>Home</button>
        <a href="http://localhost:3000/createactivity"><button id='add-activity'>Add Activity</button></a>
      </div>
   );
}
