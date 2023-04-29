const initialState = {
    allCountries: [],
    searchedCountries : [],
    filterOrderCountries: [],
    activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "ADD_COUNTRIES":
            return{
                allCountries: state.allCountries,
                searchedCountries: [...action.payload],
                filterOrderCountries: [], // Una vez que se busca, reseteo este arreglo, asi no pisa el arreglo de busqueda
                activities: state.activities
            }
        case "FILTER_COUNTRIES":
            if(state.filterOrderCountries.length > 0){
                // if([...state.filterOrderCountries.filter(c => c.continent === action.payload)].length === 0) { // ESTO NO ME CONVENCE, NO SE DEBERIA PODER
                //     alert("No hay paises que coincidan") // ESTO NO ME CONVENCE, NO SE DEBERIA PODER
                //     return {...state} // ESTO NO ME CONVENCE, NO SE DEBERIA PODER
                // }
                return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.filterOrderCountries.filter(c => c.continent === action.payload)],
                    activities: state.activities
                }
            } else if(state.searchedCountries.length > 0){
                // if([...state.searchedCountries.filter(c => c.continent === action.payload)].length === 0) { // ESTO NO ME CONVENCE, NO SE DEBERIA PODER
                //     alert("No hay paises que coincidan") // ESTO NO ME CONVENCE, NO SE DEBERIA PODER
                //     return state// ESTO NO ME CONVENCE, NO SE DEBERIA PODER
                // }
            return {
                allCountries: state.allCountries,
                searchedCountries: state.searchedCountries,
                filterOrderCountries: [...state.searchedCountries.filter(c => c.continent === action.payload)],
                activities: state.activities
            }
        }else{
            return {
                allCountries: state.allCountries,
                searchedCountries: state.searchedCountries,
                filterOrderCountries: [...state.allCountries.filter(c => c.continent === action.payload)],
                activities: state.activities
            }
        }
        case "ORDER_COUNTRIES":
            if(state.filterOrderCountries.length > 0){ // Primero chequeo si hay algo, si hay algo, acomodo eso, si no, acomodo todo
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.filterOrderCountries.sort((a,b) => a.name.localeCompare(b.name))],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.filterOrderCountries.sort((a,b) => b.name.localeCompare(a.name))],
                    activities: state.activities
                }
            } else if(state.searchedCountries.length > 0){
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.searchedCountries.sort((a,b) => a.name.localeCompare(b.name))],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.searchedCountries.sort((a,b) => b.name.localeCompare(a.name))],
                    activities: state.activities
                }
            }else {
            if(action.payload === "ascendente") return {
                allCountries: state.allCountries,
                searchedCountries: state.searchedCountries,
                filterOrderCountries: [...state.allCountries.sort((a,b) => a.name.localeCompare(b.name))],
                activities: state.activities
            }
            else if(action.payload === "descendente")return {
                allCountries: state.allCountries,
                searchedCountries: state.searchedCountries,
                filterOrderCountries: [...state.allCountries.sort((a,b) => b.name.localeCompare(a.name))],
                activities: state.activities
            }
        }
        case "ORDER_POBLACION":
            if(state.filterOrderCountries.length > 0){ // Primero chequeo si hay algo, si hay algo, acomodo eso, si no, acomodo todo
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.filterOrderCountries.sort((a,b) => a.population - b.population)],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.filterOrderCountries.sort((a,b) => b.population - a.population)],
                    activities: state.activities
                }
            }else if(state.searchedCountries.length > 0){ // Primero chequeo si hay algo, si hay algo, acomodo eso, si no, acomodo todo
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.searchedCountries.sort((a,b) => a.population - b.population)],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.searchedCountries.sort((a,b) => b.population - a.population)],
                    activities: state.activities
                }
            }else {
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.allCountries.sort((a,b) => a.population - b.population)],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: state.searchedCountries,
                    filterOrderCountries: [...state.allCountries.sort((a,b) => b.population - a.population)],
                    activities: state.activities
                }
            }
        case "ADD_ACTIVITIES":
            return{
                allCountries: [...state.allCountries],
                searchedCountries: state.searchedCountries,
                filterOrderCountries: state.filterOrderCountries,
                activities: action.payload
            }
        case "FILTER_ACTIVITIES":
            return{
                allCountries: [...state.allCountries],
                searchedCountries: state.searchedCountries,
                filterOrderCountries: [...state.allCountries.filter(c => c.activities?.some(activity => activity.id === action.payload))],
                activities: [...state.activities]
            }
        case "FETCH_COUNTRIES":
            return{
                allCountries: [...action.payload],
                searchedCountries: [...state.searchedCountries],
                filterOrderCountries: state.filterOrderCountries,
                activities: state.activities
            }
        default:
            return {...state}
    }
}