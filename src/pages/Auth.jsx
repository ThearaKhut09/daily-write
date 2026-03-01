import React, { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useUserLoginMutation } from "../app/features/auth/auth";
import { storeAccessToken, getDecryptedAccessToken } from "../util/tokenUtil";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loginUser, { data: userResponse, isLoading, isError, error: loginError }] = useUserLoginMutation();

  useEffect(() => {
    if (userResponse?.data?.accessToken) {
      storeAccessToken(userResponse.data.accessToken);
      const realAccessToken = getDecryptedAccessToken();
      console.log("Real Access Token: ", realAccessToken);
      navigate("/");
    }
  }, [userResponse, navigate]);

  useEffect(() => {
    if (isError) {
      setError(loginError?.data?.message || "Login failed. Please check your credentials.");
    }
  }, [isError, loginError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginUser({
        email,
        password,
      }).unwrap();
    } catch (err) {
      // Error is handled by the useEffect above
      console.error("Failed to login: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-50" />

      {/* Back to Home Link */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="flex items-center text-orange-700 font-medium hover:underline"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to home
        </Link>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Side: Login Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 w-full max-w-md">
            <div className="flex flex-col items-center mb-8">
              {/* Logo Placeholder */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2645/2645897.png"
                    alt="Logo"
                    className="w-10 h-10"
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-orange-600">Login</h1>
              <p className="text-gray-500 mt-2 text-center text-sm">
                If you already a member, easily log in now.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <div className="text-right mt-2">
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:text-orange-600 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="py-4 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
                <p className="mx-4 text-xs text-gray-400 font-medium uppercase">
                  Or login with
                </p>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 text-white font-bold py-3.5 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Continue with Google
                </span>
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Do not have an account?{" "}
                <Link
                  to="/auth"
                  className="text-orange-600 font-bold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Illustration (Hidden on mobile) */}
        <div className="hidden lg:flex justify-center items-center">
          <div className="relative">
            {/* Note: In a real project, replace this placeholder with your actual SVG or Illustration */}
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-4437048-3705030.png"
              alt="Login Illustration"
              className="max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
