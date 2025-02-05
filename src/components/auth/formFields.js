const signUpFormFields = {
  username: {
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    validation: (value) => {
      if (!value) return "Username is required.";
      if (value.length < 3) return "Username must be at least 3 characters.";
      return "";
    },
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    validation: (value) => {
      if (!value) return "Email is required.";
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/.test(value))
        return "Enter a valid email address.";
      return "";
    },
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    validation: (value) => {
      if (!value) return "Password is required.";
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
      )
        return "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.";
      return "";
    },
  },
};

export const LoginFormFields = {
  email: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    validation: (value) => {
      if (!value) return "Email is required.";
      return "";
    },
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
    validation: (value) => {
      if (!value) return "Password is required.";
      return "";
    },
  },
};

export default signUpFormFields;
