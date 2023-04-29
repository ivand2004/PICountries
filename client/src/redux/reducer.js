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
            if(state.filteredByActivity.length>0){
                if([...state.filteredByActivity.filter(c => c.continent === action.payload)].length === 0) {
                    alert("No hay paises que coincidan")
                    return {...state}
                } //SI NO SE CUMPLE CON LA CONDICION, TENGO QUE PODER AVISAR Y DECIR, CHE, NO HAY NADA ACA.
                return {
                    ...state,
                    filteredByContinent: [...state.filteredByActivity.filter(c => c.continent === action.payload)],
                    filteredByActivity: [], // La reseteo por si habia algo (?)
                }
        }else if(state.searchedCountries.length>0){
            if([...state.searchedCountries.filter(c => c.continent === action.payload)].length === 0) {
                alert("No hay paises que coincidan")
                return {...state}
            }//SI NO SE CUMPLE CON LA CONDICION, TENGO QUE PODER AVISAR Y DECIR, CHE, NO HAY NADA ACA.
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
            if(state.filteredByContinent.length>0){
                if([...state.filteredByContinent.filter(c => c.activities?.some(activity => activity.id === action.payload))].length === 0) {
                    alert("No hay paises que coincidan")
                    return {...state}
                }
                return {
                    ...state,
                    filteredByContinent: [], // Lo reseteo por si habia algo, asi no se pisan, en el UseEffect, el chequeo de filtered by continent va primero, por eso lo piso
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