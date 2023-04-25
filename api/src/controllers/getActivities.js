const {Activity} = require("../db")

const getActivities = async (req, res) => {
    try {
        let activities = await Activity.findAll();
        return res.status(200).json(activities)
    } catch (error) {
        return res.status(505).send("Internal Server Error")
    }
}

module.exports = getActivities