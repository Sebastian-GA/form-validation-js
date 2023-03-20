export const validations = {
    birth: (input) => validateBirth(input),
};

function validateBirth(input) {
    const birthDateValue = new Date(input.value);
    if (!isAdult(birthDateValue)) {
        input.setCustomValidity("Debes ser mayor de 18 años");
    } else {
        input.setCustomValidity("");
    }
}
function isAdult(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}
