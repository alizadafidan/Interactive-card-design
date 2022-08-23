const regEX_text = /[A-Za-zÑñÁ-Úá-ó]/g; //RegEX for letters
const regEx_number = /[\d]/g; //RegEX for numbers
const regEx_specialCharacter = /[&/\#,+()$~%.¨'":*¿?!¡=<>{}\[\]\-\_\\]/g; //Regex for special character

//Selecting elements

//Cardholder Name
let nameCard = document.querySelector(".card-details-name");
let nameCardInput = document.querySelector("#cardholder");
let nameError = document.querySelector(".form-cardholder-error");

//Card number
let numberCard = document.querySelector(".card-number");
let numberCardInput = document.querySelector("#cardnumber");
let numberCardError = document.querySelector(".form-cardnumber-error");

//Months
let cardMonth = document.querySelector(".card-details-month");
let cardMonthInput = document.querySelector("#cardmonth");
let cardMonthError = document.querySelector(".form-mm-error");
console.log(cardMonthInput);
//Years
let cardYear = document.querySelector(".card-details-year");
let cardYearInput = document.querySelector("#cardyear");
let cardYearError = document.querySelector(".form-yy-error");

//CVC
let cardCvc = document.querySelector(".card-cvc");
let cardCvcInput = document.querySelector("#cardcvc");
let cardCvcError = document.querySelector(".form-cvc-error");

//Confirm button
let btnConfirm = document.querySelector(".form-submit");
let ValueName = false;
let ValueNumber = false;
let ValueMonth = false;
let ValueYear = false;
let ValueCVC = false;

//Initializers
nameCardInput.value = "";
numberCardInput.value = "";
cardMonthInput.value = "";
cardYearInput.value = "";
cardCvcInput.value = "";

//FUNCTIONS
const showError = function (DivInput, DivError, msgError, show) {
  if (show) {
    DivError.innerText = msgError;
    DivInput.style.borderColor = "hsl(0, 100%, 66%)";
  } else {
    DivError.innerText = msgError;
    DivInput.style.borderColor = "hsl(279, 6%, 55%)";
  }
};

const VerifyInputState = function (DivInput, DivError) {
  if (parseInt(DivInput.value.length) > 0) {
    showError(DivInput, DivError, "", false);
    return true;
  } else {
    showError(DivInput, DivError, "Can't be blank", true);
    DivInput.style.borderColor = "hsl(0, 100%, 66%)";
    return false;
  }
};

const ValidateNumber = function (input, DivError) {
  if (regEx_number.test(input.value)) {
    showError(input, DivError, "", false);
  } else {
    showError(input, DivError, "Wrong value", true);
  }
};

//AUTO ENTRIES

//Name

nameCardInput.addEventListener("input", function (e) {
  let InputValueName = e.target.value;
  nameCard.innerText = nameCardInput.value;
  //Setting standarts
  nameCardInput.value = InputValueName.replace(regEx_number, "").replace(
    regEx_specialCharacter,
    ""
  );

  //Checking errors
  if (regEX_text.test(nameCardInput.value)) {
    showError(nameCardInput, nameError, "", false);
  } else {
    showError(
      nameCardInput,
      nameError,
      "Wrong format, only letters [A-z]",
      true
    );
  }

  if (nameCardInput.value === "") {
    nameCard.innerText = "Fidan Alizada";
  }
});

//NUMBER
numberCardInput.addEventListener("input", function (e) {
  let InputValueNumber = e.target.value;
  numberCard.innerText = numberCardInput.value;
  if (regEx_number.test(numberCardInput.value)) {
    //Add spaces every 4 digits and remove spaces added by the user.
    numberCardInput.value = InputValueNumber.replace(/[\s]/g, "").replace(
      /([0-9]{4})/g,
      "$1 "
    );
    showError(numberCardInput, numberCardError, "", false);
    ValidateNumber(numberCardInput, numberCardError);
  } else if (regEx_specialCharacter.test(numberCardInput.value)) {
    numberCardInput.value = InputValueNumber.replace(
      regEx_specialCharacter,
      ""
    );
    showError(
      numberCardInput,
      numberCardError,
      "Wrong format, numbers only",
      true
    );
  } else {
    // Validate only numbers that are entered.
    numberCardInput.value = InputValueNumber.replace(regEX_text, "").trim(); // prevent text input in the number field
    showError(
      numberCardInput,
      numberCardError,
      "Wrong format, numbers only",
      true
    );
  }
  // If the field is empty it shows the following default values
  if (numberCardInput.value === "") {
    numberCard.innerText = "0000 0000 0000 0000";
  }
});

//Month

cardMonthInput.addEventListener("input", function (e) {
  let InputValueMonth = e.target.value;

  if (InputValueMonth.length === 1) {
    let result = "0".concat(InputValueMonth);
    cardMonthInput.value = result;
  } else if (InputValueMonth.length === 3) {
    cardMonthInput.value = InputValueMonth.replace("0", "").trim();
  }
  cardMonth.innerText = cardMonthInput.value;
  ValidateNumber(cardMonthInput, cardMonthError);
});

//Year
cardYearInput.addEventListener("input", () => {
  cardYear.innerText = cardYearInput.value;
  ValidateNumber(cardYearInput, cardYearError);
});

//CVC

cardCvcInput.addEventListener("input", () => {
  cardCvc.innerText = cardCvcInput.value;
  ValidateNumber(cardCvcInput, cardCvcError);
});

//HANDLING BUTTON
btnConfirm.addEventListener("click", function (e) {
  e.preventDefault();
  //Validate name
  if (VerifyInputState(nameCardInput, nameError) === true) {
    if (nameCardInput.value.length >= 6) {
      showError(nameCardInput, nameError, "", false);
      ValueName = true;
    } else {
      showError(nameCardInput, nameError, "Wrong name");
      ValueName = false;
    }
  }

  //Validate number
  if (VerifyInputState(numberCardInput, numberCardError) === true) {
    if (numberCardInput.value.length >= 19) {
      showError(nameCardInput, numberCardError, "", false);
      ValueNumber = true;
    } else {
      showError(numberCardInput, numberCardError, "Wrong number");
      ValueNumber = false;
    }
  }

  //Validate month
  if (VerifyInputState(cardMonthInput, cardMonthError)) {
    if (
      parseInt(cardMonthInput.value) >= 1 &&
      parseInt(cardMonthInput.value) < 13
    ) {
      showError(cardMonthInput, cardMonthError, "", false);
      ValueMonth = true;
    } else {
      showError(cardMonthInput, cardMonthError, "Wrong month", true);
      ValueMonth = false;
    }
  }

  //Validate year
  let date = new Date();
  let YearLocal = date.getFullYear().toString().slice(-2);
  //Gets the last two values of the current year. example: 2022 => 22
  if (VerifyInputState(cardYearInput, cardYearError)) {
    if (
      parseInt(cardYearInput.value) > parseInt(YearLocal) - 6 &&
      parseInt(cardYearInput.value) <= parseInt(YearLocal) + 5
    ) {
      showError(cardYearInput, cardYearError, "", false);
      ValueYear = true;
    } else {
      showError(cardYearInput, cardYearError, "Wrong year", true);
      ValueYear = false;
    }
  }

  //Validate CVC
  if (VerifyInputState(cardCvcInput, cardCvcError)) {
    if (
      cardCvcInput.value.length === 3 &&
      regEx_number.test(cardCvcInput.value)
    ) {
      showError(cardCvcInput, cardCvcError, "", false);
      ValueCVC = true;
    } else {
      showError(cardCvcInput, cardCvcError, "Wrong CVC", true);
      ValueCVC = false;
    }
  }

  if (
    ValueName == true &&
    ValueNumber == true &&
    ValueMonth == true &&
    ValueYear == true &&
    ValueCVC == true
  ) {
    console.log("PASSED");
    let formSection = document.querySelector(".form");
    let thanksSection = document.querySelector(".thanks-section");

    formSection.style.display = "none";
    thanksSection.style.display = "block";
  }
});
