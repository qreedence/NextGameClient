export class validationService{
    public static validateEmail = (email : string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            return true;
        }
        return false;
    }

    public static validatePassword = (password : string) => {
        if (password.length >= 8){
            return true;
        }
        return false;
    }

    public static validatePasswordsMatch = (password : string, confirmPassword : string) => {
        if (this.validatePassword(password)){
            if (password === confirmPassword){
                return true;
            }
        }
        return false;
    }
}