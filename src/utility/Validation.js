// ===== Check BD Phone Number =====
export function validatePhoneNumber(number) {
  // Remove spaces and other non-numeric characters
  const cleaned = number.replace(/[^+\d]/g, "");

  // Define the regex for validation
  const regex = /^(?:\+8801|01)(3|4|5|6|7|8|9)\d{8}$/;

  return regex.test(cleaned);
}

// ===== Check Email Address =====
export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// ===== Check Password =====
export function validatePassword(password) {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}
