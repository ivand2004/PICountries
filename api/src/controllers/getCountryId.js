const {Country} = require("../db")
const {Activity} = require("../db")

const getCountryId = async (req,res) => {
    let {idPais} = req.params
    try {
        let pais = await Country.findOne({where: {
            id: idPais
        },
        include: Activity
    })
        if(!pais) return res.status(504).send("Error, no se encontro el pais")
        return res.status(200).json(pais)
    } catch (error) {
        return res.status(505).send(error.message)
    }
}

module.exports = getCountryId