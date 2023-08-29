// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options - will be a variable to store length of password from user input
function getPasswordOptions() {
  let lengthForPw = parseInt(
    prompt("How many characters would you like your password to contain?")
  )

  // Checks if number provided in prompt is a number
  if (isNaN(lengthForPw) === true) { 
    alert(`Password length must be provided as a number`); 
    return;
  }

   // alerts user on character length limit 
  if(lengthForPw < 10) {
    alert ('Password length must be atleast 10 characters please');
    return;
  }

  if(lengthForPw > 64) {
    alert ('Password length must be less than 65 characters please');
    return;
  }

  // Confirm character type 
  let hasSpecialChars = confirm(`Click ok to confirm including special characters`);
  let hasNumbers = confirm(`Click ok to confirm including numerical characters`);
  let hasLowerCaseChars = confirm(`Click ok to confirm including lower case characters`);
  let hasUpperCaseChars = confirm(`click ok to confirm including upper case characters`);
  
  // Check if one of the character types is selected
  if (hasSpecialChars === false &&
    hasNumbers === false &&
    hasLowerCaseChars === false &&
    hasUpperCaseChars === false) {
    alert("You must select at least one character type.");
    return;
  }

  // here i return an object which contains the users options
  let passwordOptions = {
    length: lengthForPw,
    hasSpecialChars: hasSpecialChars,
    hasLowerCaseChars: hasLowerCaseChars,
    hasUpperCaseChars: hasUpperCaseChars,
    hasNumbers: hasNumbers
  }

  return passwordOptions;

  
}

// Function for getting a random element from an array
function getRandom(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  let randomElement = arr[randomIndex];

  return randomElement;
  
}

// Function to generate password with user input
function generatePassword() {
  let options = getPasswordOptions();

  let result = []
  let possibleCharacters = []
  let guaranteedCharacters = []

/*
  The concat() method concatenates (joins) two or more arrays.
*/
if (options.hasSpecialChars) { 
  possibleCharacters = possibleCharacters.concat(specialCharacters);
  guaranteedCharacters.push(getRandom(specialCharacters));
}

if (options.hasLowerCaseChars) {
  possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
  guaranteedCharacters.push(getRandom(lowerCasedCharacters));
}

if (options.hasNumbers) {
  possibleCharacters = possibleCharacters.concat(numericCharacters);
  guaranteedCharacters.push(getRandom(numericCharacters));
}

if (options.hasUpperCaseChars) {
  possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
  guaranteedCharacters.push(getRandom(upperCasedCharacters));
}
  
for (let index = guaranteedCharacters.length; index < options.length; index++) { 
  let generated = getRandom(possibleCharacters);
  result.push(generated);
}

result = result.concat(guaranteedCharacters);

return result.join("");
}

// Get references to the #generate element
let generateBtn = document.querySelector('#generate');



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);