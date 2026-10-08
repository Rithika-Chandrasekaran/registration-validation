// Registration form validation for the Smart User Registration & Validation lab project.
const form = document.getElementById('registrationForm');
const submitMessage = document.getElementById('submitMessage');
const resetBtn = document.getElementById('resetBtn');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const strengthText = document.getElementById('strengthText');
const strengthFill = document.getElementById('strengthFill');

function setFieldState(input, isValid, message = '') {
  const field = input.closest('.field');
  const errorMessage = field ? field.querySelector('.error-message') : null;

  if (!field || !errorMessage) {
    return false;
  }

  field.classList.remove('invalid', 'valid');
  field.classList.add(isValid ? 'valid' : 'invalid');
  errorMessage.textContent = isValid ? '' : message;
  return isValid;
}

function setGroupState(groupId, isValid, message = '') {
  const group = document.getElementById(groupId);
  const errorMessage = group ? group.parentElement.querySelector('.error-message') : null;

  if (!group || !errorMessage) {
    return false;
  }

  group.classList.remove('invalid', 'valid');
  group.classList.add(isValid ? 'valid' : 'invalid');
  errorMessage.textContent = isValid ? '' : message;
  return isValid;
}

function clearFormStatus() {
  submitMessage.textContent = '';
  submitMessage.className = 'form-status';
}

function validateName() {
  const value = document.getElementById('fullName').value.trim();

  if (!value) {
    return setFieldState(document.getElementById('fullName'), false, 'Full name is required.');
  }

  if (value.length < 3) {
    return setFieldState(document.getElementById('fullName'), false, 'Full name must be at least 3 characters long.');
  }

  if (!/^[A-Za-z ]+$/.test(value)) {
    return setFieldState(document.getElementById('fullName'), false, 'Full name should contain only alphabets and spaces.');
  }

  return setFieldState(document.getElementById('fullName'), true);
}

function validateEmail() {
  const value = document.getElementById('email').value.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!value) {
    return setFieldState(document.getElementById('email'), false, 'Email address is required.');
  }

  if (!emailRegex.test(value)) {
    return setFieldState(document.getElementById('email'), false, 'Please enter a valid email address.');
  }

  return setFieldState(document.getElementById('email'), true);
}

function validatePhone() {
  const value = document.getElementById('phone').value.trim();

  if (!value) {
    return setFieldState(document.getElementById('phone'), false, 'Phone number is required.');
  }

  if (!/^\d{10}$/.test(value)) {
    return setFieldState(document.getElementById('phone'), false, 'Phone number must contain exactly 10 digits.');
  }

  return setFieldState(document.getElementById('phone'), true);
}

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (!password) {
    return { label: 'Weak', className: 'weak', width: '0%' };
  }

  if (score <= 2) {
    return { label: 'Weak', className: 'weak', width: '35%' };
  }

  if (score <= 4) {
    return { label: 'Medium', className: 'medium', width: '70%' };
  }

  return { label: 'Strong', className: 'strong', width: '100%' };
}

function updatePasswordStrength() {
  const password = passwordInput.value;
  const strength = getPasswordStrength(password);

  strengthFill.className = `strength-fill ${strength.className}`;
  strengthText.textContent = strength.label;
  strengthFill.style.width = strength.width;
}

function validatePassword() {
  const value = passwordInput.value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!value) {
    return setFieldState(passwordInput, false, 'Password is required.');
  }

  if (value.length < 8) {
    return setFieldState(passwordInput, false, 'Password must contain at least 8 characters.');
  }

  if (!passwordRegex.test(value)) {
    return setFieldState(passwordInput, false, 'Password must include uppercase, lowercase, number, and special character.');
  }

  return setFieldState(passwordInput, true);
}

function validateConfirmPassword() {
  const value = confirmPasswordInput.value;

  if (!value) {
    return setFieldState(confirmPasswordInput, false, 'Please confirm your password.');
  }

  if (value !== passwordInput.value) {
    return setFieldState(confirmPasswordInput, false, 'Passwords do not match.');
  }

  return setFieldState(confirmPasswordInput, true);
}

function validateDOB() {
  const value = document.getElementById('dob').value;

  if (!value) {
    return setFieldState(document.getElementById('dob'), false, 'Date of birth is required.');
  }

  const selectedDate = new Date(value);
  const today = new Date();

  if (selectedDate > today) {
    return setFieldState(document.getElementById('dob'), false, 'Date of birth cannot be in the future.');
  }

  return setFieldState(document.getElementById('dob'), true);
}

function validateGender() {
  const selectedGender = document.querySelector('input[name="gender"]:checked');

  if (!selectedGender) {
    return setGroupState('genderField', false, 'Please select your gender.');
  }

  return setGroupState('genderField', true);
}

function validateAddress() {
  const value = document.getElementById('address').value.trim();

  if (!value) {
    return setFieldState(document.getElementById('address'), false, 'Address is required.');
  }

  if (value.length < 10) {
    return setFieldState(document.getElementById('address'), false, 'Address must be at least 10 characters long.');
  }

  return setFieldState(document.getElementById('address'), true);
}

function validateCity() {
  const value = document.getElementById('city').value.trim();

  if (!value) {
    return setFieldState(document.getElementById('city'), false, 'City is required.');
  }

  if (!/^[A-Za-z ]+$/.test(value)) {
    return setFieldState(document.getElementById('city'), false, 'Please enter a valid city name.');
  }

  return setFieldState(document.getElementById('city'), true);
}

function validateState() {
  const value = document.getElementById('state').value;

  if (!value) {
    return setFieldState(document.getElementById('state'), false, 'Please select a state.');
  }

  return setFieldState(document.getElementById('state'), true);
}

function validatePinCode() {
  const value = document.getElementById('pinCode').value.trim();

  if (!value) {
    return setFieldState(document.getElementById('pinCode'), false, 'PIN code is required.');
  }

  if (!/^\d{6}$/.test(value)) {
    return setFieldState(document.getElementById('pinCode'), false, 'Please enter a valid 6-digit PIN code.');
  }

  return setFieldState(document.getElementById('pinCode'), true);
}

function validateTerms() {
  const terms = document.getElementById('terms');
  const termsError = document.getElementById('termsError');

  if (!terms.checked) {
    termsError.textContent = 'Please accept the Terms and Conditions.';
    return false;
  }

  termsError.textContent = '';
  return true;
}

function validateForm() {
  let isValid = true;

  if (!validateName()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validatePhone()) isValid = false;
  if (!validatePassword()) isValid = false;
  if (!validateConfirmPassword()) isValid = false;
  if (!validateDOB()) isValid = false;
  if (!validateGender()) isValid = false;
  if (!validateAddress()) isValid = false;
  if (!validateCity()) isValid = false;
  if (!validateState()) isValid = false;
  if (!validatePinCode()) isValid = false;
  if (!validateTerms()) isValid = false;

  return isValid;
}

function handleReset() {
  clearFormStatus();
  document.querySelectorAll('.field').forEach((field) => {
    field.classList.remove('invalid', 'valid');
    const errorText = field.querySelector('.error-message');
    if (errorText) errorText.textContent = '';
  });

  const genderField = document.getElementById('genderField');
  genderField.classList.remove('invalid', 'valid');
  document.getElementById('termsError').textContent = '';
  strengthFill.className = 'strength-fill weak';
  strengthFill.style.width = '0%';
  strengthText.textContent = 'Weak';
}

document.getElementById('fullName').addEventListener('blur', validateName);
document.getElementById('fullName').addEventListener('input', function () {
  if (this.value.trim()) {
    validateName();
  } else {
    setFieldState(this, false, 'Full name is required.');
  }
});

document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('email').addEventListener('input', validateEmail);

document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('phone').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 10);
  if (this.value.length > 0) {
    validatePhone();
  } else {
    setFieldState(this, false, 'Phone number is required.');
  }
});

passwordInput.addEventListener('input', function () {
  updatePasswordStrength();
  if (this.value.length > 0) {
    validatePassword();
  } else {
    setFieldState(this, false, 'Password is required.');
  }
  if (confirmPasswordInput.value.length > 0) {
    validateConfirmPassword();
  }
});

confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);

document.getElementById('dob').addEventListener('change', validateDOB);
document.getElementById('dob').addEventListener('blur', validateDOB);

document.querySelectorAll('input[name="gender"]').forEach((radio) => {
  radio.addEventListener('change', validateGender);
});

document.getElementById('address').addEventListener('blur', validateAddress);
document.getElementById('address').addEventListener('input', function () {
  if (this.value.trim()) {
    validateAddress();
  } else {
    setFieldState(this, false, 'Address is required.');
  }
});

document.getElementById('city').addEventListener('blur', validateCity);
document.getElementById('city').addEventListener('input', validateCity);

document.getElementById('state').addEventListener('change', validateState);
document.getElementById('pinCode').addEventListener('blur', validatePinCode);
document.getElementById('pinCode').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, '').slice(0, 6);
  if (this.value.length > 0) {
    validatePinCode();
  } else {
    setFieldState(this, false, 'PIN code is required.');
  }
});

document.getElementById('terms').addEventListener('change', validateTerms);

form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearFormStatus();

  const isValid = validateForm();

  if (!isValid) {
    submitMessage.textContent = 'Please correct the highlighted fields and try again.';
    submitMessage.className = 'form-status error visible';
    return;
  }

  submitMessage.textContent = 'Registration Successful!\nYour details have been validated successfully.';
  submitMessage.className = 'form-status success visible';
});

resetBtn.addEventListener('click', function (event) {
  event.preventDefault();
  form.reset();
  handleReset();
});

window.addEventListener('load', function () {
  updatePasswordStrength();
  clearFormStatus();
});
