// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { valid: false, message: 'Email is required' };
    if (!emailRegex.test(email)) return { valid: false, message: 'Invalid email format' };
    return { valid: true, message: '' };
};

// Password strength validation
export const validatePassword = (password) => {
    if (!password) return { valid: false, message: 'Password is required', strength: 0 };
    
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let strength = 0;
    if (minLength) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;
    
    if (!minLength) {
        return { valid: false, message: 'Password must be at least 8 characters', strength: 0 };
    }
    if (!hasUpperCase || !hasLowerCase) {
        return { valid: false, message: 'Password must contain uppercase and lowercase letters', strength };
    }
    if (!hasNumber) {
        return { valid: false, message: 'Password must contain at least one number', strength };
    }
    
    return { valid: true, message: '', strength };
};

// Get password strength label
export const getPasswordStrengthLabel = (strength) => {
    if (strength === 0) return { label: '', color: '' };
    if (strength <= 2) return { label: 'Weak', color: 'text-rose-500' };
    if (strength <= 3) return { label: 'Fair', color: 'text-orange-500' };
    if (strength <= 4) return { label: 'Good', color: 'text-emerald-500' };
    return { label: 'Strong', color: 'text-emerald-600' };
};

// Get password strength bar width
export const getPasswordStrengthWidth = (strength) => {
    return `${(strength / 5) * 100}%`;
};

// Get password strength bar color
export const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-rose-500';
    if (strength <= 3) return 'bg-orange-500';
    if (strength <= 4) return 'bg-emerald-500';
    return 'bg-emerald-600';
};
