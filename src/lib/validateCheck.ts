function validateCheckEmail(email: string) {
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!EMAIL_REGEX.test(email)) {
    return false;
  }

  return true;
}

function validateCheckPassword(password: string) {
  const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!PASSWORD_REGEX.test(password)) {
    return false;
  }

  return true;
}

const validateCheck = {
  email: validateCheckEmail,
  password: validateCheckPassword,
};

export default validateCheck;
