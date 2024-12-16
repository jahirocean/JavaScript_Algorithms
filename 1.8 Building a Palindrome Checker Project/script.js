const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");


const isPalindrome = (text) => {
  // Remove non-alphanumeric characters and make lowercase
  const cleanedText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  // Reverse the cleaned text
  const reversedText = cleanedText.split("").reverse().join("");
  // Check if the cleaned text equals its reverse
  return cleanedText === reversedText;
};



checkBtn.addEventListener("click", () => {
  const inputValue = textInput.value;

  // Alert if the input is empty
  if (!inputValue.trim()) {
    alert("Please input a value");
    return;
  };
  const palindromeCheck = isPalindrome(inputValue);
  if(palindromeCheck){
    result.textContent = `${inputValue} is a palindrome`;
    result.style.color = "green";
    result.classList.toggle("hidden");
  }else{
    result.textContent = `${inputValue} is not a palindrome`;
    result.style.color = "red";
    result.classList.toggle("hidden");

  }

  });

