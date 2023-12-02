//Validations using  Regex
//----------------Validation for strings ----------------------------------//
const validString = (text) => {
    const check = /^[a-zA-Z\s]+$/
    return check.test(text)
}

//----------------Validation for Email -----------------------------------//
function validEmail(email) {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+\.[a-zA-Z-.]+$/
    return emailRegex.test(email)
}

//---------------Validation for Password----------------------------------//
function validPassword(password) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
    return passwordRegex.test(password)
}

//------------------------------------------------------------------//

module.exports = { validString, validEmail, validPassword }