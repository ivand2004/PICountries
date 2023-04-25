import axios from "axios";
import { fetchCountries } from "./actions";

export default function fetchData(dispatch){
    axios.get("http://localhost:3001/countries")
    .then(r => dispatch(fetchCountries(r.data)))
    .catch(err => console.log(err))
}