const {Country} = require("../db")
const { Op } = require("sequelize")
const {Activity} = require("../db")

const getCountries = async (req, res) => {
    let {name} = req.query
    if(name){
        try {
            let countries = await Country.findAll({where: {
                name:{
                    [Op.iLike]: `%${name}%`
                },
            },
        },{include: Activity})
            if(countries.length === 0) return res.status(504).send("No hay paises con ese nombre")
            return res.status(200).json(countries)
        } catch (error) {
            res.status(505).send(error.message)
        }
    }else{
        try {
            return res.status(200).json(await Country.findAll({include: Activity}))
        } catch (error) {
            return res.status(505).send(error.message)
        }
    }
}

module.exports = getCountries;