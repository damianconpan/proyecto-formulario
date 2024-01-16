document.addEventListener("DOMContentLoaded", () => {
    form = document.querySelector("form");
    const alertMessage = document.querySelector(".alert");
    const sendButton = document.getElementById("sendButton");
    const cardNumber = document.getElementById("inputCardNumber");
    const cvc = document.getElementById("inputCVC");
    const amount = document.getElementById("Amount");
    const firstName = document.getElementById("inputFirstName");
    const lastName = document.getElementById("inputLastName");
    const city = document.getElementById("inputCity");
    const state = document.getElementById("inputState");
    const zip = document.getElementById("inputZip");
    const radioButtons = document.querySelectorAll(
      'input[name="inlineRadioOptions"]'
    );
    const messageTextarea = document.getElementById(
      "exampleFormControlTextarea1"
    );
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      resetFormValidation();
      const isValid = validateForm();
  
      if (isValid) {
        console.log("Form submitted!");
      } else {
        alertMessage.style.display = "block";
      }
    });
  
    sendButton.addEventListener("click", () => {
      form.dispatchEvent(new Event("submit"));
    });
  
    function resetFormValidation() {
      const formElements = [
        cardNumber,
        cvc,
        amount,
        firstName,
        lastName,
        city,
        state,
        zip,
        ...radioButtons,
      ];
  
      formElements.forEach((element) => {
        markAsValid(element);
      });
  
      alertMessage.style.display = "none";
    }
  
    function markAsInvalid(inputElement, errorMessage) {
      inputElement.classList.add("error-input");
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.textContent = errorMessage;
      inputElement.parentNode.appendChild(errorElement);
    }
  
    function markAsValid(inputElement) {
      inputElement.classList.remove("error-input");
      const errorElement =
        inputElement.parentNode.querySelector(".error-message");
      if (errorElement) {
        inputElement.parentNode.removeChild(errorElement);
      }
    }
  
    function validateForm() {
      let isValid = true;
  
      isValid =
        validateField(
          cardNumber,
          /^\d{15,16}$/,
          "Please enter a valid card number (15-16 digits)"
        ) && isValid;
      isValid =
        validateField(
          cvc,
          /^\d{3,4}$/,
          "Please enter a valid CVC (3 or 4 digits)"
        ) && isValid;
      isValid =
        validateField(
          amount,
          /^\d+$/,
          "Please enter a valid amount (numbers only)"
        ) && isValid;
      isValid =
        validateField(
          firstName,
          /^[A-Za-z]+$/,
          "Please enter a valid first name (letters only)"
        ) && isValid;
      isValid =
        validateField(
          lastName,
          /^[A-Za-z]+$/,
          "Please enter a valid last name (letters only)"
        ) && isValid;
      isValid =
        validateField(
          city,
          /^[A-Za-z]+$/,
          "Please enter a valid city (letters only)"
        ) && isValid;
      isValid =
        validateField(
          state,
          (value) => value !== "Pick a state",
          "Please select a state"
        ) && isValid;
      isValid =
        validateField(
          zip,
          /^\d+$/,
          "Please enter a valid zip code (numbers only)"
        ) && isValid;
        isValid =
        validateField(
          radioButtons[0],
          radioButtons[0].checked || radioButtons[1].checked || radioButtons[2].checked || radioButtons[3].checked,
          "Please select a card type"
        ) && isValid;
  
      return isValid;
    }
  
    function validateField(element, condition, errorMessage) {
      const value = element.value.trim();
      const isValid =
        typeof condition === "function"
          ? condition(value)
          : condition.test(value);
  
      if (!isValid) {
        markAsInvalid(element, errorMessage);
      } else {
        markAsValid(element);
      }
  
      return isValid;
    }
  });