const inputNumber = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

const checkUserInput = () => {
  const input = parseInt(inputNumber.value);
  console.log("Input value:", input);

  if (!input || isNaN(input)) {
    output.textContent = "Please enter a valid number";
    return;
  } else if (input < 0) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  } else if (input > 3999) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  } else {
    const romanNumeral = romanNumeralConverter(input);
    output.textContent =romanNumeral;
   
  }

  inputNumber.value = "";
  
};

const romanNumeralConverter = (num) => {
  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let romanNumeral = '';
  while (num > 0) {
    const largestRomanNumeral = Object.keys(romanNumerals).find(key => romanNumerals[key] <= num);
    romanNumeral += largestRomanNumeral;
    num -= romanNumerals[largestRomanNumeral];
  }

  return romanNumeral;
};

convertBtn.addEventListener("click", checkUserInput);
inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});