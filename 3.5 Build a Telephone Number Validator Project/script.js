const userInput = document.getElementById("user-input");
    const checkBtn = document.getElementById("check-btn");
    const clearBtn = document.getElementById("clear-btn");
    const resultsDiv = document.getElementById("results-div");

    const phoneNumberRegex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?\d{3})([\s-]?\d{4})$/;

    checkBtn.addEventListener("click", () => {
      const phoneNumber = userInput.value.trim();
      

      if (!phoneNumber) {
        alert("Please provide a phone number");
        return;
      }

      const isValid = phoneNumberRegex.test(phoneNumber);
      
      const resultText = isValid ? `Valid US number: ${phoneNumber}` : `Invalid US number: ${phoneNumber}`;
      resultsDiv.textContent = resultText;
    });

    clearBtn.addEventListener("click", () => {
      resultsDiv.textContent = "";
      userInput.value = "";
    });