import { useState } from "react";
import { AlertTriangle, Camera, CheckCircle, DollarSign, FileText, Shield, Upload, User, X, Phone, CreditCard } from "lucide-react";

const CopyTradingForm = () => {
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Investment Details
    investmentAmount: '',
    investmentGoals: '',
    
    // Document Details
    aadharNumber: '',
    // Files
    aadharFile: null,
    signatureFile: null,
    
    // Agreements
    termsAccepted: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // ✅ STRICT VALIDATION FUNCTIONS
  
  // Email validation - More strict pattern
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
    return emailRegex.test(email.trim());
  };

  // Phone validation - EXACTLY 10 digits, starts with 6-9
  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, ''); // Remove all non-digits
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(cleanPhone) && cleanPhone.length === 10;
  };

  // PIN Code validation - EXACTLY 6 digits, first digit not 0
  const validatePincode = (pincode) => {
    const cleanPincode = pincode.replace(/\D/g, ''); // Remove all non-digits
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(cleanPincode) && cleanPincode.length === 6;
  };

  // Aadhar validation - EXACTLY 12 digits, valid Aadhar pattern
  const validateAadhar = (aadhar) => {
    const cleanAadhar = aadhar.replace(/\D/g, ''); // Remove all non-digits
    
    // Check if exactly 12 digits
    if (cleanAadhar.length !== 12) return false;
    
    // Aadhar should not start with 0 or 1
    if (cleanAadhar.charAt(0) === '0' || cleanAadhar.charAt(0) === '1') return false;
    
    // Check for repeated digits (invalid patterns)
    if (/^(.)\1{11}$/.test(cleanAadhar)) return false; // All same digits
    
    // Valid Aadhar pattern
    const aadharRegex = /^[2-9]{1}[0-9]{11}$/;
    return aadharRegex.test(cleanAadhar);
  };

  // Age validation - Must be between 18-80 years
  const validateAge = (dateOfBirth) => {
    if (!dateOfBirth) return false;
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    
    // Check if birth date is valid and not in future
    if (birthDate >= today) return false;
    
    const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
    return age >= 18 && age <= 80;
  };

  // Name validation - Only letters and spaces, 2-50 characters
  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim()) && name.trim().length >= 2;
  };

  // Investment amount validation
  const validateInvestmentAmount = (amount) => {
    const numAmount = parseFloat(amount);
    return !isNaN(numAmount) && numAmount >= 10000 && numAmount <= 10000000;
  };

  // File validation
  const validateFile = (file, type) => {
    if (!file) return { valid: false, error: 'File is required' };
    
    if (type === 'aadhar') {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Aadhar file must be JPG, PNG, or PDF' };
      }
      if (file.size > 5 * 1024 * 1024) {
        return { valid: false, error: 'Aadhar file size must be less than 5MB' };
      }
    } else if (type === 'signature') {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Signature file must be JPG or PNG' };
      }
      if (file.size > 2 * 1024 * 1024) {
        return { valid: false, error: 'Signature file size must be less than 2MB' };
      }
    }
    
    return { valid: true };
  };

  // ✅ STEP-WISE VALIDATION WITH STRICT RULES

  const validateStep1 = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name must be 2-50 characters, letters only';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name must be 2-50 characters, letters only';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation - STRICT
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
      } else if (!/^[6-9]/.test(cleanPhone)) {
        newErrors.phone = 'Phone number must start with 6, 7, 8, or 9';
      } else {
        newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
      }
    }

    // Date of Birth validation - STRICT
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!validateAge(formData.dateOfBirth)) {
      const age = formData.dateOfBirth ? Math.floor((Date.now() - new Date(formData.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0;
      if (age < 18) {
        newErrors.dateOfBirth = 'You must be at least 18 years old';
      } else if (age > 80) {
        newErrors.dateOfBirth = 'Maximum age limit is 80 years';
      } else {
        newErrors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    } else if (formData.address.trim().length > 200) {
      newErrors.address = 'Address must not exceed 200 characters';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (!validateName(formData.city)) {
      newErrors.city = 'City name must be 2-50 characters, letters only';
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    } else if (!validateName(formData.state)) {
      newErrors.state = 'State name must be 2-50 characters, letters only';
    }

    // PIN Code validation - STRICT
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (!validatePincode(formData.pincode)) {
      const cleanPincode = formData.pincode.replace(/\D/g, '');
      if (cleanPincode.length !== 6) {
        newErrors.pincode = 'PIN code must be exactly 6 digits';
      } else if (cleanPincode.charAt(0) === '0') {
        newErrors.pincode = 'PIN code cannot start with 0';
      } else {
        newErrors.pincode = 'Please enter a valid 6-digit PIN code';
      }
    }

    // Aadhar validation - STRICT
    if (!formData.aadharNumber.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!validateAadhar(formData.aadharNumber)) {
      const cleanAadhar = formData.aadharNumber.replace(/\D/g, '');
      if (cleanAadhar.length !== 12) {
        newErrors.aadharNumber = 'Aadhar number must be exactly 12 digits';
      } else if (cleanAadhar.charAt(0) === '0' || cleanAadhar.charAt(0) === '1') {
        newErrors.aadharNumber = 'Aadhar number cannot start with 0 or 1';
      } else if (/^(.)\1{11}$/.test(cleanAadhar)) {
        newErrors.aadharNumber = 'Invalid Aadhar number pattern';
      } else {
        newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    // Investment amount validation - STRICT
    if (!formData.investmentAmount) {
      newErrors.investmentAmount = 'Investment amount is required';
    } else if (!validateInvestmentAmount(formData.investmentAmount)) {
      const amount = parseFloat(formData.investmentAmount);
      if (isNaN(amount)) {
        newErrors.investmentAmount = 'Investment amount must be a valid number';
      } else if (amount < 10000) {
        newErrors.investmentAmount = 'Minimum investment amount is ₹10,000';
      } else if (amount > 10000000) {
        newErrors.investmentAmount = 'Maximum investment amount is ₹1,00,00,000';
      } else {
        newErrors.investmentAmount = 'Please enter a valid investment amount';
      }
    }

    // Investment goals validation - STRICT
    if (!formData.investmentGoals.trim()) {
      newErrors.investmentGoals = 'Investment goals are required';
    } else if (formData.investmentGoals.trim().length < 20) {
      newErrors.investmentGoals = 'Investment goals must be at least 20 characters';
    } else if (formData.investmentGoals.trim().length > 500) {
      newErrors.investmentGoals = 'Investment goals must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};

    // Aadhar file validation - STRICT
    if (!formData.aadharFile) {
      newErrors.aadharFile = 'Aadhar document is required';
    } else {
      const aadharValidation = validateFile(formData.aadharFile, 'aadhar');
      if (!aadharValidation.valid) {
        newErrors.aadharFile = aadharValidation.error;
      }
    }

    // Signature file validation - STRICT
    if (!formData.signatureFile) {
      newErrors.signatureFile = 'Signature file is required';
    } else {
      const signatureValidation = validateFile(formData.signatureFile, 'signature');
      if (!signatureValidation.valid) {
        newErrors.signatureFile = signatureValidation.error;
      }
    }

    // Terms acceptance - MANDATORY
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ INPUT CHANGE HANDLERS WITH FORMATTING

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = type === 'checkbox' ? checked : value;

    // Format specific fields
    if (name === 'phone') {
      // Allow only digits and limit to 10
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'aadharNumber') {
      // Allow only digits and limit to 12, format with spaces
      const digits = value.replace(/\D/g, '').slice(0, 12);
      processedValue = digits.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
    } else if (name === 'pincode') {
      // Allow only digits and limit to 6
      processedValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (name === 'firstName' || name === 'lastName' || name === 'city' || name === 'state') {
      // Allow only letters and spaces
      processedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
    } else if (name === 'investmentAmount') {
      // Allow only digits and decimal point
      processedValue = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const parts = processedValue.split('.');
      if (parts.length > 2) {
        processedValue = parts[0] + '.' + parts.slice(1).join('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));

      // Clear file error when user selects a file
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  // API URL
  const API_URL = 'https://trading-professor-server.onrender.com/';
  // const API_URL = 'http://localhost:5000/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'aadharFile' && key !== 'signatureFile') {
          submitData.append(key, formData[key]);
        }
      });

      // Add files
      if (formData.aadharFile) {
        submitData.append('aadharFile', formData.aadharFile);
      }
      if (formData.signatureFile) {
        submitData.append('signatureFile', formData.signatureFile);
      }

      // Submit to API
      const response = await fetch(`${API_URL}api/trading-form/applications`, {
        method: 'POST',
        body: submitData,
      });

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('API endpoint not found. Please check if the server is running.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Check if response has JSON content
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        throw new Error('Server returned non-JSON response: ' + textResponse);
      }

      const result = await response.json();

      if (result.success) {
        console.log('Copy trading application submitted successfully:', result.data);
        setSubmitSuccess(true);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      
      // More specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setServerError('Network error. Please check your connection and try again.');
      } else if (error.message.includes('JSON')) {
        setServerError('Server response error. Please contact support.');
      } else {
        setServerError(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    let isValid = false;
    
    if (currentStep === 1) {
      isValid = validateStep1();
    } else if (currentStep === 2) {
      isValid = validateStep2();
    }
    
    if (isValid) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({}); // Clear errors when going back
    // Scroll to top when moving to previous step
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset form function
  const resetForm = () => {
    setSubmitSuccess(false);
    setCurrentStep(1);
    setErrors({});
    setServerError('');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      investmentAmount: '',
      investmentGoals: '',
      aadharNumber: '',
      aadharFile: null,
      signatureFile: null,
      termsAccepted: false
    });
  };

  // Success screen
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
          <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
          <p className="text-gray-300 mb-6">
            Your copy trading application has been successfully submitted. Our team will review your application and contact you within 2-3 business days.
          </p>
          <button
            onClick={resetForm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Copy Trading Investment</h1>
          <p className="text-xl text-gray-300">Join our professional copy trading platform</p>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Server Error Display */}
        {serverError && (
          <div className="mb-6 bg-red-900/30 border border-red-600 rounded-lg p-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-red-400 font-medium">Submission Error</p>
              <p className="text-red-300 text-sm">{serverError}</p>
            </div>
            <button
              onClick={() => setServerError('')}
              className="text-red-400 hover:text-red-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-blue-400" />
                Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name * <span className="text-xs text-gray-400">(Letters only, 2-50 chars)</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter first name"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name * <span className="text-xs text-gray-400">(Letters only, 2-50 chars)</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter last name"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address * <span className="text-xs text-gray-400">(Valid email format)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter email address"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Phone Number * <span className="text-xs text-gray-400">(10 digits, starts with 6-9)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    maxLength="10"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.phone ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter 10-digit phone number"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Current: {formData.phone.length}/10 digits</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date of Birth * <span className="text-xs text-gray-400">(Age 18-80 years)</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    max={new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    min={new Date(Date.now() - 80 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    Aadhar Number * <span className="text-xs text-gray-400">(12 digits, auto-formatted)</span>
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    maxLength="14" // Including spaces
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.aadharNumber ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="XXXX XXXX XXXX"
                    required
                  />
                  {errors.aadharNumber && (
                    <p className="text-red-400 text-sm mt-1">{errors.aadharNumber}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Digits: {formData.aadharNumber.replace(/\D/g, '').length}/12
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address * <span className="text-xs text-gray-400">(10-200 characters)</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  maxLength="200"
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Enter complete address"
                  required
                />
                {errors.address && (
                  <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{formData.address.length}/200 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    City * <span className="text-xs text-gray-400">(Letters only)</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.city ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter city name"
                    required
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    State * <span className="text-xs text-gray-400">(Letters only)</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    maxLength="50"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.state ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter state name"
                    required
                  />
                  {errors.state && (
                    <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    PIN Code * <span className="text-xs text-gray-400">(6 digits, not starting with 0)</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    maxLength="6"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.pincode ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter PIN code"
                    required
                  />
                  {errors.pincode && (
                    <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Digits: {formData.pincode.length}/6</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Investment Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <DollarSign className="w-6 h-6 mr-3 text-green-400" />
                Investment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investment Amount (₹) * <span className="text-xs text-gray-400">(₹10,000 - ₹1,00,00,000)</span>
                  </label>
                  <input
                    type="text"
                    name="investmentAmount"
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 ${
                      errors.investmentAmount ? 'border-red-500' : 'border-gray-600'
                    }`}
                    placeholder="Enter investment amount"
                    required
                  />
                  {errors.investmentAmount && (
                    <p className="text-red-400 text-sm mt-1">{errors.investmentAmount}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-1">
                    Minimum: ₹10,000 | Maximum: ₹1,00,00,000
                    {formData.investmentAmount && (
                      <span className="block">
                        Formatted: ₹{parseFloat(formData.investmentAmount || 0).toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Goals * <span className="text-xs text-gray-400">(20-500 characters)</span>
                </label>
                <textarea
                  name="investmentGoals"
                  value={formData.investmentGoals}
                  onChange={handleInputChange}
                  rows="4"
                  maxLength="500"
                  placeholder="Describe your investment goals, risk tolerance, and expectations..."
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none ${
                    errors.investmentGoals ? 'border-red-500' : 'border-gray-600'
                  }`}
                  required
                />
                {errors.investmentGoals && (
                  <p className="text-red-400 text-sm mt-1">{errors.investmentGoals}</p>
                )}
                <p className="text-sm text-gray-400 mt-1">
                  {formData.investmentGoals.length}/500 characters
                  {formData.investmentGoals.length < 20 && (
                    <span className="text-yellow-400 ml-2">
                      (Need {20 - formData.investmentGoals.length} more characters)
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-purple-400" />
                Document Upload & Final Agreements
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Aadhar Card Upload * <span className="text-xs text-gray-400">(JPG, PNG, PDF - Max 5MB)</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${
                    errors.aadharFile ? 'border-red-500' : 'border-gray-600'
                  }`}>
                    <input
                      type="file"
                      name="aadharFile"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.pdf"
                      className="hidden"
                      id="aadhar-upload"
                      required
                    />
                    <label htmlFor="aadhar-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-300">
                        {formData.aadharFile ? formData.aadharFile.name : 'Click to upload Aadhar Card'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG, PDF (Max 5MB)</p>
                      {formData.aadharFile && (
                        <p className="text-xs text-green-400 mt-1">
                          Size: {(formData.aadharFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      )}
                    </label>
                  </div>
                  {errors.aadharFile && (
                    <p className="text-red-400 text-sm mt-1">{errors.aadharFile}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Signature Upload * <span className="text-xs text-gray-400">(JPG, PNG - Max 2MB)</span>
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${
                    errors.signatureFile ? 'border-red-500' : 'border-gray-600'
                  }`}>
                    <input
                      type="file"
                      name="signatureFile"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png"
                      className="hidden"
                      id="signature-upload"
                      required
                    />
                    <label htmlFor="signature-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-300">
                        {formData.signatureFile ? formData.signatureFile.name : 'Click to upload Signature'}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">JPG, PNG (Max 2MB)</p>
                      {formData.signatureFile && (
                        <p className="text-xs text-green-400 mt-1">
                          Size: {(formData.signatureFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      )}
                    </label>
                  </div>
                  {errors.signatureFile && (
                    <p className="text-red-400 text-sm mt-1">{errors.signatureFile}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500 focus:ring-2"
                    required
                  />
                  <div className="flex-1">
                    <label className="text-sm text-gray-300">
                      I agree to the <span className="text-blue-400 cursor-pointer hover:underline">Terms and Conditions</span> and <span className="text-blue-400 cursor-pointer hover:underline">Privacy Policy</span> *
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-red-400 text-xs mt-1">{errors.termsAccepted}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                ← Previous Step
              </button>
            )}

            <div className="ml-auto">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center"
                  disabled={Object.keys(errors).length > 0}
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Validation Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="mt-6 bg-red-900/30 border border-red-600 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                <h4 className="text-red-400 font-medium">Please fix the following errors to continue:</h4>
              </div>
              <ul className="text-red-300 text-sm space-y-1 ml-7">
                {Object.entries(errors).map(([field, error], index) => 
                  error && <li key={index}>• <strong>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {error}</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Form Progress Info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 bg-gray-800/60 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-700">
            <div className="flex items-center text-gray-300">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                // Personal info completion check
                formData.firstName && formData.lastName && formData.email && formData.phone && 
                formData.dateOfBirth && formData.address && formData.city && formData.state && 
                formData.pincode && formData.aadharNumber && 
                validateName(formData.firstName) && validateName(formData.lastName) &&
                validateEmail(formData.email) && validatePhone(formData.phone) &&
                validateAge(formData.dateOfBirth) && validatePincode(formData.pincode) &&
                validateAadhar(formData.aadharNumber)
                  ? 'bg-green-400' : 'bg-gray-600'
              }`}></div>
              <span className="text-sm">Personal Details</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                formData.investmentAmount && formData.investmentGoals &&
                validateInvestmentAmount(formData.investmentAmount) && formData.investmentGoals.length >= 20
                  ? 'bg-green-400' : 'bg-gray-600'
              }`}></div>
              <span className="text-sm">Investment Details</span>
            </div>
            <div className="flex items-center text-gray-300">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                formData.aadharFile && formData.signatureFile && formData.termsAccepted
                  ? 'bg-green-400' : 'bg-gray-600'
              }`}></div>
              <span className="text-sm">Documents & Agreements</span>
            </div>
          </div>
        </div>   
      </div>
    </div>
  );
};

export default CopyTradingForm;