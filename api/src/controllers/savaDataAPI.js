const axios = require("axios")
const {Country} = require("../db")

const saveDataAPI = () => {
    axios.get("https://restcountries.com/v3.1/all")
    .then(r => r.data)
    .then(d => d.forEach(c => Country.create({
        id: c.cca3,
        name: c.name.common,
        flag: c.flags.png,
        continent: c.continents[0],
        capital: c.capital? c.capital[0]: null,
        population: c.population
    })))
    .catch(err => console.log(err))
}

module.exports = saveDataAPI