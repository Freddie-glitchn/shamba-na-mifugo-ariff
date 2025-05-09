
/**
 * Utility functions for form validations
 */

/**
 * Validates an email address
 * @param email Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (simple validation)
 * @param phone Phone number to validate
 * @returns Boolean indicating if phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // Simple validation: at least 10 digits
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone.replace(/[^0-9]/g, ''));
};

/**
 * Validates a password
 * @param password Password to validate
 * @returns Object containing validity and reasons if invalid
 */
export const validatePassword = (password: string): { 
  isValid: boolean; 
  reasons: string[] 
} => {
  const reasons: string[] = [];
  
  if (password.length < 8) {
    reasons.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    reasons.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    reasons.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    reasons.push('Password must contain at least one number');
  }
  
  return {
    isValid: reasons.length === 0,
    reasons
  };
};

/**
 * Check if two passwords match
 * @param password Primary password
 * @param confirmPassword Confirmation password
 * @returns Boolean indicating if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * Formats a date as YYYY-MM-DD
 * @param date Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Validates if a string is a valid date in YYYY-MM-DD format
 * @param dateString Date string to validate
 * @returns Boolean indicating if date string is valid
 */
export const isValidDateString = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
