import axios from "axios";
export function addCountries(countries){
    return {
        type: "ADD_COUNTRIES",
        payload: countries
    }
}

export function fetchCountries(countries){
    return{
        type: "FETCH_COUNTRIES",
        payload: countries
    }
}

export function filterCountries(continent){
    return{
        type: "FILTER_COUNTRIES",
        payload: continent
    }
}

export function addActivities(activities){
    return{
        type: "ADD_ACTIVITIES",
        payload: activities
    }
}

export function filterActivities(activity){
    return{
        type: "FILTER_ACTIVITIES",
        payload: activity
    }
}

export function loadActivities(dispatch){
    axios.get(("http://localhost:3001/activities"))
    .then(r => dispatch(addActivities(r.data)))
    .catch(err => console.log(err))
}

export function searchCountry(value, dispatch){
    axios.get(`http://localhost:3001/countries?name=${value}`)
      .then(r => dispatch(addCountries(r.data)))
      .catch(err => {
        alert(err.response.data)
      })
}