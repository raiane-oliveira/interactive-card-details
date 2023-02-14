const cardFrontNumber = document.querySelector("#card-front-number")
const cardFrontName = document.querySelector("#card-front-name")
const cardFrontDate = document.querySelector("#card-front-date")
const cardBackCVC = document.querySelector("#card-back-cvc")
const formCard = document.querySelector(".form-card")

let month = 00, year = 00

formCard.addEventListener("keyup", (event) => {
    const element = event.target

    let isCardNameInput = element.className.includes("card-name") && element.value
    let isCardNumberInput = element.className.includes("card-number") && element.value
    let isCardDateInput = element.className.includes("card-exp-date") && element.value
    let isCardCVCInput = element.className.includes("card-cvc") && element.value

    if (isCardNameInput) {
        cardFrontName.innerHTML = element.value
    }
    
    if (isCardNumberInput) {
        cardFrontNumber.innerHTML = element.value
    }
    
    if (isCardDateInput) {
        if (element.dataset.date === "mm") {
            month = element.value
        } else if (element.dataset.date === "yy") {
            year = element.value
        }
        cardFrontDate.innerHTML = `${month}/${year}`
    }

    if (isCardCVCInput) {
        cardBackCVC.innerHTML = element.value
    }
    
})

