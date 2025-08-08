import { useState } from "react";
import AnimatedBackground from "./AnimatedGridBackground";
import { AlertTriangle, Camera, CheckCircle, DollarSign, FileText, Shield, Upload, User } from "lucide-react";

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
    riskTolerance: '',
    investmentGoals: '',
    
    // Document Details
    aadharNumber: '',
    panNumber: '',
    
    // Files
    aadharFile: null,
    signatureFile: null,
    
    // Agreements
    disclaimerAccepted: false,
    riskWarningAccepted: false,
    termsAccepted: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [adminData, setAdminData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save to admin dashboard (simulate)
    const submissionData = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending_review',
      aadharFileName: formData.aadharFile?.name || '',
      signatureFileName: formData.signatureFile?.name || ''
    };

    // Add to admin data
    setAdminData(prev => [...prev, submissionData]);
    
    console.log('Submission saved to admin dashboard:', submissionData);
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  if (submitSuccess) {
    return (
      <AnimatedBackground>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
            <div className="bg-green-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Application Submitted!</h2>
            <p className="text-gray-300 mb-6">
              Your copy trading application has been successfully submitted. Our team will review your application and contact you within 2-3 business days.
            </p>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setCurrentStep(1);
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
                  riskTolerance: '',
                  investmentGoals: '',
                  aadharNumber: '',
                  panNumber: '',
                  aadharFile: null,
                  signatureFile: null,
                  disclaimerAccepted: false,
                  riskWarningAccepted: false,
                  termsAccepted: false
                });
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground>
      <div className="relative z-10 min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Copy Trading Investment</h1>
            <p className="text-xl text-gray-300">Join our professional copy trading platform</p>
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-600 text-gray-400'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            
            {/* Step 1: Disclaimer & Risk Warning */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                  Disclaimer & Risk Warning
                </h2>

                <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Disclaimer
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Copy trading involves automatically replicating the trades of other traders. While this allows you to benefit from the experience and strategies of professional traders, past performance is not indicative of future results. All trading involves risk, and there is no guarantee of profit or protection from losses.
                  </p>
                </div>

                <div className="bg-red-900/30 border border-red-600 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Warning
                  </h3>
                  <ul className="text-gray-300 space-y-2 leading-relaxed">
                    <li>• Your capital is at risk. You may lose all or part of your investment.</li>
                    <li>• Market conditions can change rapidly and may impact trade performance.</li>
                    <li>• The trader you are copying may change their strategy or experience losses.</li>
                    <li>• Copy trading does not eliminate the need for careful decision-making.</li>
                    <li>• You should only invest funds you can afford to lose.</li>
                    <li>• We are not liable for any losses incurred through copy trading activities.</li>
                  </ul>
                </div>

                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">Important Note</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Before participating in copy trading, ensure that you fully understand the risks involved and consider seeking independent financial advice if necessary.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center text-white cursor-pointer">
                    <input
                      type="checkbox"
                      name="disclaimerAccepted"
                      checked={formData.disclaimerAccepted}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      required
                    />
                    I have read and accept the disclaimer
                  </label>
                  
                  <label className="flex items-center text-white cursor-pointer">
                    <input
                      type="checkbox"
                      name="riskWarningAccepted"
                      checked={formData.riskWarningAccepted}
                      onChange={handleInputChange}
                      className="mr-3 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      required
                    />
                    I acknowledge and accept all risks mentioned in the risk warning
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-blue-400" />
                  Personal Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX XXXX XXXX"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Investment Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-green-400" />
                  Investment Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Investment Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="investmentAmount"
                      value={formData.investmentAmount}
                      onChange={handleInputChange}
                      min="10000"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                    <p className="text-sm text-gray-400 mt-1">Minimum investment: ₹10,000</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Risk Tolerance *
                    </label>
                    <select
                      name="riskTolerance"
                      value={formData.riskTolerance}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400"
                      required
                    >
                      <option value="">Select Risk Level</option>
                      <option value="low">Low Risk</option>
                      <option value="medium">Medium Risk</option>
                      <option value="high">High Risk</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Investment Goals *
                  </label>
                  <textarea
                    name="investmentGoals"
                    value={formData.investmentGoals}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Please describe your investment goals and expectations..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-400 resize-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Document Upload */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-purple-400" />
                  Document Upload
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Aadhar Card Upload *
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
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
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Signature Upload *
                    </label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
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
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Final Terms & Conditions</h3>
                  <label className="flex items-start text-white cursor-pointer">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mr-3 mt-1 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 flex-shrink-0"
                      required
                    />
                    <span>
                      I agree to the terms and conditions, privacy policy, and confirm that all information provided is accurate. I understand that copy trading involves significant risks and I am prepared to accept potential losses.
                    </span>
                  </label>
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
                  Previous
                </button>
              )}

              <div className="ml-auto">
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (currentStep === 1 && (!formData.disclaimerAccepted || !formData.riskWarningAccepted)) ||
                      (currentStep === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.aadharNumber)) ||
                      (currentStep === 3 && (!formData.investmentAmount || !formData.riskTolerance || !formData.investmentGoals))
                    }
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.termsAccepted || !formData.aadharFile || !formData.signatureFile}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Admin Dashboard Preview (for demo purposes) */}
          {adminData.length > 0 && (
            <div className="mt-12 bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">Admin Dashboard - Recent Submissions</h3>
              <div className="space-y-4">
                {adminData.map((submission) => (
                  <div key={submission.id} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Applicant</p>
                        <p className="text-white font-semibold">{submission.firstName} {submission.lastName}</p>
                        <p className="text-gray-300 text-sm">{submission.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Investment Amount</p>
                        <p className="text-white font-semibold">₹{submission.investmentAmount}</p>
                        <p className="text-gray-300 text-sm">Risk: {submission.riskTolerance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Status</p>
                        <span className="inline-block bg-yellow-600 text-yellow-100 px-2 py-1 rounded text-xs">
                          {submission.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default CopyTradingForm;
