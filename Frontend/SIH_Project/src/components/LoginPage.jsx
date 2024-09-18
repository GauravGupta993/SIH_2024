import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router-dom'; // Include useNavigate for redirection
import AlumniAnimation from '../assets/Animations/AlumniAnimation.json';
import ReCAPTCHA from 'react-google-recaptcha';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [recaptchaMessage, setRecaptchaMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const togglePasswordVisibility = (e) => {
    e.preventDefault(); 
    setShowPassword(!showPassword);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setIsRecaptchaVerified(true); // Set to true when reCAPTCHA is completed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setRecaptchaMessage('Please complete the reCAPTCHA.');
      setIsRecaptchaVerified(false);
      return;
    }

    // Demo credentials for login
    const demoEmailAlumni = 'demo@alumni.com';
    const demoPasswordAlumni = 'demo123';
    
    const demoEmailStudent = 'demo@student.com';
    const demoPasswordStudent = 'student123';

    if (email === demoEmailAlumni && password === demoPasswordAlumni) {
      // Set a simple auth token in local storage
      localStorage.setItem('authToken', 'demo-alumni-token');
      // Redirect to the alumni landing page
      navigate('/landing');
    } else if (email === demoEmailStudent && password === demoPasswordStudent) {
      // Set a simple auth token in local storage
      localStorage.setItem('authToken', 'demo-student-token');
      // Redirect to the student landing page
      navigate('/studentslanding');
    } else {
      alert('Invalid credentials. Please try again.');
    }

    // Reset message
    setRecaptchaMessage('');
  };

  return (
    <div className="flex flex-row gap-2">
      <div className="flex min-h-full mt-20 flex-1 flex-col justify-center ml-4 py-12 hidden md:block">
        <Lottie animationData={AlumniAnimation} className="h-full w-full" />
      </div>
      <div className="flex min-h-full flex-1 flex-col justify-center lg:mr-52 py-12 mt-20 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-[#4a2c2a]">
            Sign In
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="flex text-sm font-medium text-gray-900 outline-none"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm flex font-medium text-gray-900"
                style={{ outline: 'none' }}
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-semibold focus:ring-2 sm:text-sm sm:leading-6 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#cb0100] hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                </button>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <ReCAPTCHA
                sitekey="6Ld8OUcqAAAAAIPAq8cSVeA1QVzB826prjigIWMk"
                onChange={handleRecaptchaChange}
              />
            </div>

            {recaptchaMessage && (
              <p className="text-red-500 text-sm mb-2">
                {recaptchaMessage}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#cb0100] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cb0100]"
              >
                Sign in
              </button>
            </div>
            <div className="flex gap-2 text-sm mt-5 justify-center">
              <span>Don't have an account?</span>
              <Link to="/" className="text-blue-500">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
