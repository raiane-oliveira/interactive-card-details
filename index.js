// Credit card fields
const cardFrontNumber = document.querySelector("#card-front-number")
const cardFrontName = document.querySelector("#card-front-name")
const cardFrontDate = document.querySelector("#card-front-date")
const cardBackCVC = document.querySelector("#card-back-cvc")

// Form fields
const formCard = document.querySelector(".form-card")
const formCardName = document.querySelector(".card-name")
const formCardNumber = document.querySelector(".card-number")
const formCardDates = document.querySelectorAll(".card-exp-date")
const formCardCVC = document.querySelector(".card-cvc")
const btnSubmitForm = document.querySelector(".btn-card")

let month = "00", year = "00"
let datesWithoutErros = true

formCard.addEventListener("keyup", (event) => {
    clearErrorMessages()
    const element = event.target

    let isCardNameInput = element.className.includes("card-name")
    let isCardNumberInput = element.className.includes("card-number")
    let isCardDateInput = element.className.includes("card-exp-date")
    let isCardCVCInput = element.className.includes("card-cvc")

    if (isCardNameInput) {
        cardFrontName.innerHTML = formCardName.value.trim() ? element.value : "Jane Appleseed"
    }
    
    if (isCardNumberInput) {
        cardFrontNumber.innerHTML = formCardNumber.value.trim() ? element.value : "0000 0000 0000 0000"
    }
    
    if (isCardDateInput) {
        if (element.dataset.date === "mm") {
            month = element.value.trim()
        } else if (element.dataset.date === "yy") {
            year = element.value.trim()
        }

        cardFrontDate.innerHTML = `${month}/${year}`
    }

    if (isCardCVCInput) {
        cardBackCVC.innerHTML = formCardCVC.value ? element.value : "000"
    }
})

formCard.addEventListener("submit", (event) => {
    event.preventDefault()
    validateEntriesCard()

    let noErrors = formCardName.value && formCardNumber.value && formCardCVC.value &&
                  datesWithoutErros
    if (noErrors) {
        formCard.style.display = "none"
        document.querySelector(".completed-state").style.display = "block"
    }
})

function validateEntriesCard() {
    if (!formCardName.value.trim()) {
        formCardName.style.border = "1px solid hsl(0, 100%, 66%)"
        document.querySelector(".card-name-container .error-message").style.display = "block"
        document.querySelector(".card-name-container .error-message").innerHTML = "Can't be blank"
    }

    if (!formCardNumber.value.trim()) {
        formCardNumber.style.border = "1px solid hsl(0, 100%, 66%)"
        document.querySelector(".card-number-container .error-message").style.display = "block"
        document.querySelector(".card-number-container .error-message").innerHTML = "Can't be blank"
    }

    if (!formCardCVC.value.trim()) {
        formCardCVC.style.border = "1px solid hsl(0, 100%, 66%)"
        document.querySelector(".card-cvc-container .error-message").style.display = "block"
        document.querySelector(".card-cvc-container .error-message").innerHTML = "Can't be blank"
    }

    if (isNaN(formCardNumber.value.replace(" ", "").trim())) {
        formCardNumber.style.border = "1px solid hsl(0, 100%, 66%)"
        document.querySelector(".card-number-container .error-message").style.display = "block"
        document.querySelector(".card-number-container .error-message").innerHTML = "Wrong format, numbers only"
    }
    
    if (isNaN(formCardCVC.value.trim())) {
        formCardCVC.style.border = "1px solid hsl(0, 100%, 66%)"
        document.querySelector(".card-cvc-container .error-message").style.display = "block"
        document.querySelector(".card-cvc-container .error-message").innerHTML = "Wrong format, numbers only"
    }

    formCardDates.forEach(date => {
        if (!date.value.trim()) {
            date.style.border = "1px solid hsl(0, 100%, 66%)"
            document.querySelector(".card-exp-date + .error-message").style.display = "block"
            document.querySelector(".card-exp-date + .error-message").innerHTML = "Can't be blank" 
            datesWithoutErros = false
        }

        if (isNaN(date.value)) {
            date.style.border = "1px solid hsl(0, 100%, 66%)"
            document.querySelector(".card-exp-date + .error-message").style.display = "block"
            document.querySelector(".card-exp-date + .error-message").innerHTML = "Wrong format, numbers only" 
            datesWithoutErros = false
        }
    })
}

function clearErrorMessages() {
    document.querySelectorAll(".error-message").forEach(error => {
        error.style.display = "none"
    })

    document.querySelectorAll("input").forEach(input => {
        input.style.removeProperty("border")
    })
}
