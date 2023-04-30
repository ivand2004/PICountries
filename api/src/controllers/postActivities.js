const {Activity} = require("../db")
const {Country} = require("../db")

const postActivities = async (req, res) => {
    let {name, difficulty, duration, season, countriesIds} = req.body
    if(!name || !difficulty || !duration || !season || !countriesIds) return res.status(504).send("Faltan datos")
    try {
        let activity = await Activity.create({
            name, 
            difficulty,
            duration,
            season
        })
        countriesIds.forEach(async c => {
        await activity.addCountry(c, activity.id)
        })
        return res.status(200).send("Actividad creada");
    } catch (error) {
        return res.status(505).send(error.message)
    }
}

module.exports = postActivities