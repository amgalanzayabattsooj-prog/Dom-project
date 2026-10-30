const generatePasswordButton = document.getElementById("generate-password");
const passwordLengthRangeInput = document.getElementById("password-length-range-input");
const passwordLengthOutput = document.getElementById("password-length-range-output");
const messege = document.getElementById("messege");
const copyGeneratedPasswordButton = document.getElementById("copy-generated-password");
const showGeneratedPassword = document.getElementById("show-generated-password");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";

const generatePassword = () => {
  let password = "";

  const random = new Uint32Array(1);

  const limit = Math.floor(2 ** 32 / characters.length) * characters.length;

  for (let i = 0; i < Number(passwordLengthRangeInput.value); i++) {
    do {
      crypto.getRandomValues(random);
    } while (random[0] > limit);

    password += characters[random[0] % characters.length];
  }

  showGeneratedPassword.textContent = password;
};

const generatePasswordFromRange = () => {
  passwordLengthOutput.textContent = passwordLengthRangeInput.value;
  generatePassword();
};

const copyGeneratedPassword = () => {

  navigator.clipboard.writeText(showGeneratedPassword.textContent)  
  copyGeneratedPasswordButton.textContent = "Copied";
  messege.textContent = "Password copied to clipboard.";

  setTimeout(() => {
      copyGeneratedPasswordButton.textContent = "Copy";
  messege.textContent = "Uses letters, numbers, and symbols.";
  }, 1000);
  
};
copyGeneratedPasswordButton.addEventListener("click", copyGeneratedPassword);
passwordLengthRangeInput.addEventListener("input", generatePasswordFromRange);
generatePasswordButton.addEventListener("click", generatePassword);

generatePassword();
