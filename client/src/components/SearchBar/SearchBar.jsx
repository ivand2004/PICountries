import {useDispatch} from 'react-redux'
import { addCountries, searchCountry } from "../../redux/actions";

export default function SearchBar() {
   const dispatch = useDispatch()

   function searchCountryClick(value){
      searchCountry(value, dispatch)
      document.getElementById("orderCountries").value = ""
      document.getElementById("filterContinent").value = "Todos"
      document.getElementById("filterActivity").value = "Actividad"
   }

   function resetCountries(){
      dispatch(addCountries([]))
      document.getElementById("searchCountry").value = ""
      document.getElementById("orderCountries").value = ""
      document.getElementById("filterContinent").value = "Todos"
      document.getElementById("filterActivity").value = "Actividad"
   }

   return (
      <div>
        <input type='search' name="name" id="searchCountry"/>
        <button onClick={() => searchCountryClick(document.getElementById('searchCountry').value)}>&#x1F50E;</button>
        <button onClick={resetCountries}>Home</button>
        <a href="http://localhost:3000/createactivity"><button>Add Activity</button></a>
      </div>
   );
}
