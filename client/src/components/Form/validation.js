export default function validate(inputs){
    let errors = {}
    if(!inputs.name) errors.name = "Debe agregar un nombre a la actividad";
    if(!inputs.difficulty) errors.difficulty = "Debe agregar una dificultad a la actividad"
    if(inputs.difficulty < 1 || inputs.difficulty >5) errors.difficulty = "La dificultad de una activida solo puede ser de 1 a 5"
    if(!inputs.duration) errors.duration = "Debe agregar una duracion a la actividad"
    if(inputs.duration <= 0) errors.duration = "La duracion de una actividad debe ser mayor a 0"
    if(inputs.countriesIds.length === 0) errors.countriesIds = "Debe asignarle por lo menos 1 pais a la actividad"
    return errors
}