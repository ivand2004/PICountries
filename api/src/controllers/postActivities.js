const {Activity} = require("../db")
const {Country} = require("../db")

const postActivities = async (req, res) => {
    let {name, difficulty, duration, season, countriesIds} = req.body
    //Para el front, la implementacion pensada es un arreglo de paises (calculo que sera tipo dropdown e ir eligiendo paises, y los values de ese dropdown, sean los ids, entonces no me guardaria un arreglo de nombres de paises, sino un arreglo de ids).
    if(!name || !difficulty || !duration || !season || !countriesIds) return res.status(504).send("Faltan datos") // Chequear si hay que hacerlos number, string, etc a cada parametro.
    try {
        let activity = await Activity.create({
            name, 
            difficulty,
            duration,
            season
        })
        countriesIds.forEach(async c => {
        await activity.addCountry(c, activity.id) // en la tabla intermedia, creo el registro con el id del pais y el id de la actividad.
        })
        return res.status(200).send("listo"); // Ver que mandar despues.
    } catch (error) {
        return res.status(505).send(error.message)
    }
}

module.exports = postActivities