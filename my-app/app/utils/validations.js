// validation.js
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validateMobileNumber = (mobileNo) => {
    const mobileRegex = /^[6-9]\d{9}$/; // Ensures Indian mobile numbers (10 digits)
    return mobileRegex.test(mobileNo);
  };
  
  export const validateNotEmpty = (value) => {
    return value.trim() !== "";
  };
  

  export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password regex: Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Full name validation: Check if it's not empty and doesn't contain numbers or special characters
  export const isValidFullName = (fullName) => {
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    return fullName.trim() && fullNameRegex.test(fullName);
  };

  //profile
  // validations.js
export const validateProfileData = (profileData) => {
  let errors = {};

  // Check for required fields
  if (!profileData.fullName.trim()) {
    errors.fullName = "Full Name is required";
  }

  if (!profileData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
    errors.email = "Email address is invalid";
  }

  if (!profileData.contactNo.trim()) {
    errors.contactNo = "Contact number is required";
  } else if (!/^\d{10}$/.test(profileData.contactNo)) {
    errors.contactNo = "Contact number is invalid";
  }

  if (!profileData.pincode.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(profileData.pincode)) {
    errors.pincode = "Pincode is invalid";
  }

  return errors;
};
