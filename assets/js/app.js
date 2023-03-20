import { validations } from "./validations.js";

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
    const inputType = input.dataset.type;

    // If exist validations for this input type
    if (!(validations[inputType] === undefined)) {
        input.addEventListener("blur", (input) => {
            validations[inputType](input.target);
        });
    }
});
