const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        // is: "^[A-Z]{3}$", // Chequear, pero la idea es tener un regex que se fije si el codigo son tres letras mayusculas
        isAlpha: true, //Chequea que sean letras
        isUppercase: true, //Chequea que sea uppercase
        len: [3,3] //Chequea que la longitud sea mayor a 3 y menor a 3
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital:{
      type: DataTypes.STRING,
      // allowNull: false, //Se lo tengo que sacar, porque Heard Island and McDonald Islands no tienen capital
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {timestamps: false});
};
