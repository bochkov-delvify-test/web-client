export const emailValidator = (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!isEmailValid(email)) return 'Email is invalid';
    return null;
};

export const isEmailValid = (email: string): boolean => {
    return /^\S+@\S+$/.test(email);
};

export const passwordValidator = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (!isPasswordValid(password))
        return 'Password must be at least 8 characters';
    return null;
};

export const nonEmptyValidator = (value: string): string | null => {
    if (!value) return 'Field is required';
    return null;
};

export const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
};
