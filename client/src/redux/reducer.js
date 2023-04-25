const initialState = {
    allCountries: [],
    searchedCountries : [],
    activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "ADD_COUNTRIES":
            return{
                allCountries: state.allCountries,
                searchedCountries: [...action.payload],
                activities: state.activities
            }
        case "FILTER_COUNTRIES":
            if(state.searchedCountries.length > 0){
            return {
                allCountries: state.allCountries,
                searchedCountries: [...state.searchedCountries.filter(c => c.continent === action.payload)],
                activities: state.activities
            } //Chequear, porque si quiero ir de uno a otro tengo que volver
        }else{
            return {
                allCountries: state.allCountries,
                searchedCountries: [...state.allCountries.filter(c => c.continent === action.payload)],
                activities: state.activities
            }
        }
        case "ORDER_COUNTRIES":
            if(state.searchedCountries.length > 0){ // Primero chequeo si hay algo, si hay algo, acomodo eso, si no, acomodo todo
            if(action.payload === "ascendente") return {
                allCountries: state.allCountries,
                searchedCountries: [...state.searchedCountries.sort((a,b) => a.name.localeCompare(b.name))],
                activities: state.activities
            }
            else if(action.payload === "descendente")return {
                allCountries: state.allCountries,
                searchedCountries: [...state.searchedCountries.sort((a,b) => b.name.localeCompare(a.name))],
                activities: state.activities
            }
        }else {
            if(action.payload === "ascendente") return {
                allCountries: state.allCountries,
                searchedCountries: [...state.allCountries.sort((a,b) => a.name.localeCompare(b.name))],
                activities: state.activities
            }
            else if(action.payload === "descendente")return {
                allCountries: state.allCountries,
                searchedCountries: [...state.allCountries.sort((a,b) => b.name.localeCompare(a.name))],
                activities: state.activities
            }
        }
        case "ORDER_POBLACION":
            if(state.searchedCountries.length > 0){ // Primero chequeo si hay algo, si hay algo, acomodo eso, si no, acomodo todo
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: [...state.searchedCountries.sort((a,b) => a.population - b.population)],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: [...state.searchedCountries.sort((a,b) => b.population - a.population)],
                    activities: state.activities
                }
            }else {
                if(action.payload === "ascendente") return {
                    allCountries: state.allCountries,
                    searchedCountries: [...state.allCountries.sort((a,b) => b.population - a.population)],
                    activities: state.activities
                }
                else if(action.payload === "descendente")return {
                    allCountries: state.allCountries,
                    searchedCountries: [...state.allCountries.sort((a,b) => b.population - a.population)],
                    activities: state.activities
                }
            }
        case "ADD_ACTIVITIES":
            return{
                allCountries: [...state.allCountries],
                searchedCountries: state.searchedCountries,
                activities: action.payload
            }
        case "FILTER_ACTIVITIES":
            return{
                allCountries: [...state.allCountries],
                searchedCountries: [...state.allCountries.filter(c => c.activities?.some(activity => activity.id === action.payload))],
                activities: [...state.activities]
            }
        case "FETCH_COUNTRIES":
            return{
                allCountries: [...action.payload],
                searchedCountries: [...state.searchedCountries],
                activities: state.activities
            }
        default:
            return {...state}
    }
}