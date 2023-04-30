const initialState = {
    allCountries: [],
    searchedCountries : [],
    filteredByContinent: [],
    filteredByActivity: [],
    activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case "ADD_COUNTRIES":
            return{
                ...state,
                searchedCountries: [...action.payload],
                filteredByContinent: [],
                filteredByActivity: [],
            }
        case "FILTER_COUNTRIES":
            if(action.payload === "Todos") return{
                ...state,
                filteredByContinent: []
            }
            if(state.filteredByActivity.length>0){
                if([...state.filteredByActivity.filter(c => c.continent === action.payload)].length === 0) {
                    alert("No hay paises que coincidan")
                    return {...state}
                }
                return {
                    ...state,
                    filteredByContinent: [...state.filteredByActivity.filter(c => c.continent === action.payload)],
                    filteredByActivity: state.filteredByActivity,
                }
        }else if(state.searchedCountries.length>0){
            if([...state.searchedCountries.filter(c => c.continent === action.payload)].length === 0) {
                alert("No hay paises que coincidan")
                return {...state}
            }
            return {
                ...state,
                filteredByContinent: [...state.searchedCountries.filter(c => c.continent === action.payload)],
            }
        }
            return {
                ...state,
                filteredByContinent: [...state.allCountries.filter(c => c.continent === action.payload)],
            }
        case "ADD_ACTIVITIES":
            return{
                ...state,
                activities: action.payload
            }
        case "FILTER_ACTIVITIES":
            if(action.payload === 0) return{
                ...state,
                filteredByActivity: []
            }
            if(state.filteredByContinent.length>0){
                if([...state.filteredByContinent.filter(c => c.activities?.some(activity => activity.id === action.payload))].length === 0) {
                    alert("No hay paises que coincidan")
                    return {...state}
                }
                return {
                    ...state,
                    filteredByContinent: [],
                    filteredByActivity: [...state.filteredByContinent.filter(c => c.activities?.some(activity => activity.id === action.payload))],
                }
        }else if(state.searchedCountries.length>0){
            if([...state.searchedCountries.filter(c => c.activities?.some(activity => activity.id === action.payload))].length === 0) {
                alert("No hay paises que coincidan")
                return {...state}
            }
            return {
                ...state,
                filteredByActivity: [...state.searchedCountries.filter(c => c.activities?.some(activity => activity.id === action.payload))],
            }
        }else{
            return {
                ...state,
                filteredByActivity: [...state.allCountries.filter(c => c.activities?.some(activity => activity.id === action.payload))],
            }
        }
        case "FETCH_COUNTRIES":
            return{
                ...state,
                allCountries: action.payload,
            }
        default:
            return {...state}
    }
}