export const nameValidator = (name: string): boolean => {
    const nameRegex: RegExp = /^[A-Za-z]{4,}$/;
    const isValidName: boolean = nameRegex.test(name);
    return isValidName;
};

export const emailValidator = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    return isValidEmail
};

export const passwordValidator = (password: string): boolean => {
    const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const isValidPassword: boolean = passwordRegex.test(password);
    return isValidPassword;
};