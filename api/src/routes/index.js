const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getCountries = require("../controllers/getCountries");
const getCountryId = require('../controllers/getCountryId');
const getActivities = require('../controllers/getActivities');
const postActivities = require('../controllers/postActivities');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/countries", getCountries)
router.get("/countries/:idPais", getCountryId)
router.get("/activities", getActivities)
router.post("/activities", postActivities)

module.exports = router;
