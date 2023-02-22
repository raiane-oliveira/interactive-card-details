// Credit card fields
const cardContainer = document.querySelector(".card-container");
const cardFrontNumber = document.querySelector("#card-front-number");
const cardFrontName = document.querySelector("#card-front-name");
const cardFrontDate = document.querySelector("#card-front-date");
const cardBackCVC = document.querySelector("#card-back-cvc");

// Form fields
const formCard = document.querySelector(".form-card");
const formCardName = document.querySelector(".card-name");
const formCardNumber = document.querySelector(".card-number");
const formCardDates = document.querySelectorAll(".card-exp-date");
const formCardCVC = document.querySelector(".card-cvc");
const btnSubmitForm = document.querySelector(".btn-card");

let month = "00",
    year = "00";
let datesWithoutErros = true;

formCard.addEventListener("keyup", (event) => {
    clearErrorMessages();
    const element = event.target;

    getValuesOfInputsForm(element);
});

formCard.addEventListener("submit", (event) => {
    event.preventDefault();
    let isNoErrors = validateEntriesCard();

    if (isNoErrors) {
        formCard.style.display = "none";
        document.querySelector(".completed-state").style.display = "block";
    }
});

document
    .querySelector(".completed-state .btn-card")
    .addEventListener("click", returnToOriginalForm);

function getValuesOfInputsForm(element) {
    let isCardNameInput = element.className.includes("card-name");
    let isCardNumberInput = element.className.includes("card-number");
    let isCardDateInput = element.className.includes("card-exp-date");
    let isCardCVCInput = element.className.includes("card-cvc");

    if (isCardNameInput) {
        cardFrontName.innerHTML = formCardName.value.trim()
            ? element.value
            : "Jane Appleseed";
    }

    if (isCardNumberInput) {
        cardFrontNumber.innerHTML = formCardNumber.value.trim()
            ? element.value
            : "0000 0000 0000 0000";
    }

    if (isCardDateInput) {
        if (element.dataset.date === "mm") {
            month = element.value.trim();
        } else if (element.dataset.date === "yy") {
            year = element.value.trim();
        }

        cardFrontDate.innerHTML = `${month}/${year}`;
    }

    if (isCardCVCInput) {
        cardBackCVC.innerHTML = formCardCVC.value ? element.value : "000";
    }
}

function validateEntriesCard() {
    let isNoErrors = true;
    for (let input of formCard) {
        let inputContainer = document.querySelector(
            `.${input.className}-container .error-message`
        );

        // Checks empty inputs
        if (!input.value.trim() && !input.className.includes("btn-card")) {
            input.style.border = "1px solid hsl(0, 100%, 66%)";
            inputContainer.style.display = "block";
            inputContainer.innerHTML = "Can't be blank";
            isNoErrors = false;
        }

        // Checks input numbers
        if (
            input.className.includes("card-number") ||
            input.className.includes("card-cvc")
        ) {
            if (isNaN(input.value.trim().replace(" ", ""))) {
                input.style.border = "1px solid hsl(0, 100%, 66%)";
                inputContainer.style.display = "block";
                inputContainer.innerHTML = "Wrong format, numbers only";
                isNoErrors = false;
            }
        }
    }
    return isNoErrors;
}

function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach((error) => {
        error.style.display = "none";
    });

    document.querySelectorAll("input").forEach((input) => {
        input.style.removeProperty("border");
    });
}

function returnToOriginalForm() {
    document.querySelector(".completed-state").style.display = "none";
    formCard.style.display = "grid";

    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });

    cardContainer.querySelectorAll("p").forEach((paragraph) => {
        switch (paragraph.id) {
            case "card-front-name":
                paragraph.innerHTML = "Jane Appleseed";
                break;
            case "card-front-number":
                paragraph.innerHTML = "0000 0000 0000 0000";
                break;
            case "card-front-date":
                paragraph.innerHTML = "00/00";
                break;
            case "card-back-cvc":
                paragraph.innerHTML = "000";
                break;
        }
    });
}
