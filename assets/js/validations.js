export function validate(input) {
    const inputType = input.dataset.type;

    // If exist a validation function for this input type
    if (!(validationFunctions[inputType] === undefined)) {
        validationFunctions[inputType](input);
    }
    
    // If input not valid then add class "input-container--invalid"
    if (!input.validity.valid) {
        input.parentElement.classList.add("input-container--invalid");
        
        // If exist a custom validation error message for this input type
        if (!(validationErrors[inputType] === undefined)) {
            // For each error type for this input type
            Object.keys(validationErrors[inputType]).forEach((error) => {
                if (input.validity[error]) {
                    input.parentElement.querySelector(".input-message-error").textContent = validationErrors[inputType][error];
                    /* break; */ // forEach loops cant be stopped with break :( It's like a function
                    return; // return is the way to stop a forEach loop
                }
            });
        }
    } else {
        input.parentElement.classList.remove("input-container--invalid");
    }
}

const validationFunctions = {
    birth: (input) => validateBirth(input),
};

const validationErrors = {
    name: {
        valueMissing: "Debes ingresar un nombre",
    },
    email: {
        valueMissing: "Debes ingresar un correo electrónico",
        typeMismatch: "Debes ingresar un correo electrónico válido",
    },
    password: {
        valueMissing: "Debes ingresar una contraseña",
        patternMismatch:
            "Debe contener al menos 6 caractéres, máximo 12. Debe incluir al menos una letra minúscula, una mayúscula, un número y no debe incluir caractéres especiales",
    },
    birth: {
        valueMissing: "Debes ingresar tu fecha de nacimiento",
        customError: "Debes ser mayor de 18 años",
    },
    phoneNumber: {
        valueMissing: "Debes ingresar un número de teléfono",
        patternMismatch: "Debes ingresar un número de teléfono válido",
    },
};

// --------- Validate birth date --------- //
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
