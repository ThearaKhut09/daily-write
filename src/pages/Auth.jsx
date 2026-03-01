import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { useUserLoginMutation } from "../app/features/auth/auth";
import {
  storeAccessToken,
  storeRefreshToken,
  getDecryptedAccessToken,
} from "../util/tokenUtil";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/DaliyWriteLogo.svg";
import logIn from "../assets/Auth/login.svg";
import signUp from "../assets/Auth/sign-up-animate.svg";

const LoginPage = () => {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [
    loginUser,
    { data: userResponse, isLoading, isError, error: loginError },
  ] = useUserLoginMutation();

  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (userResponse?.data?.accessToken) {
      storeAccessToken(userResponse.data.accessToken);
      if (userResponse.data.refreshToken) {
        storeRefreshToken(userResponse.data.refreshToken);
      }
      const realAccessToken = getDecryptedAccessToken();
      console.log("Real Access Token: ", realAccessToken);
      navigate("/");
    }
  }, [userResponse, navigate]);

  useEffect(() => {
    if (isError) {
      setError(
        loginError?.data?.message ||
          "Login failed. Please check your credentials.",
      );
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
      console.error("Failed to login: ", err);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("Registration Data:", formData);
  };

  const handleSwitch = () => {
    setView(view === "login" ? "register" : "login");
    setError("");
  };

  // Input field className generator
  const getInputClassName = (isSelect = false) => {
    return `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all text-sm sm:text-base ${
      isSelect ? "appearance-none" : ""
    }`;
  };

  return (
    <>
      {view === "login" ? (
        <div
          className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {/* Decorative Background Blobs - Adjusted for mobile */}
          <div
            className="absolute top-[-20%] left-[-20%] w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30 sm:opacity-50"
            style={{ backgroundColor: "var(--primary-500)" }}
          />
          <div
            className="absolute bottom-[-20%] right-[-20%] w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30 sm:opacity-50"
            style={{ backgroundColor: "var(--primary-500)" }}
          />

          {/* Back to Home Link - Responsive positioning */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20">
            <Link
              to="/"
              className="flex items-center font-medium text-sm sm:text-base hover:underline"
              style={{ color: "var(--primary-700)" }}
            >
              <ArrowLeft size={16} className="mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Back to home</span>
              <span className="xs:hidden">Back</span>
            </Link>
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center z-10">
            {/* Left Side: Login Card - Full width on mobile, centered */}
            <div className="flex justify-center lg:justify-end col-span-1">
              <div
                className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-sm w-full max-w-md"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                  {/* Logo */}
                  <div className="mb-3 sm:mb-4">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16"
                      />
                    </div>
                  </div>
                  <h1
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ color: "var(--primary-500)" }}
                  >
                    Login
                  </h1>
                  <p
                    className="mt-1 sm:mt-2 text-center text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    If you already a member, easily log in now.
                  </p>
                </div>

                {error && (
                  <div
                    className="mb-4 p-3 text-xs sm:text-sm rounded-lg sm:rounded-xl text-center"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      color: "rgb(239, 68, 68)",
                    }}
                  >
                    {error}
                  </div>
                )}

                <form className="space-y-3 sm:space-y-4" onSubmit={handleLogin}>
                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                        e.target.style.borderColor = "var(--primary-500)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.borderColor = "";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                        e.target.style.borderColor = "var(--primary-500)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.borderColor = "";
                      }}
                    />
                    <div className="text-right mt-1 sm:mt-2">
                      <a
                        href="#"
                        className="text-xs transition-colors hover:underline"
                        style={{ color: "var(--text-secondary)" }}
                        onMouseEnter={(e) =>
                          (e.target.style.color = "var(--primary-500)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.color = "var(--text-secondary)")
                        }
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <div
                    className="py-2 sm:py-4 flex items-center before:flex-1 before:border-t after:flex-1 after:border-t"
                    style={{
                      before: { borderColor: "var(--border-color)" },
                      after: { borderColor: "var(--border-color)" },
                    }}
                  >
                    <p
                      className="mx-3 sm:mx-4 text-xs font-medium uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Or login with
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white font-bold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--primary-500)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "var(--primary-700)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--primary-500)")
                    }
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "var(--bg-secondary)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--bg-primary)")
                    }
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="text-xs sm:text-sm font-semibold">
                      Continue with Google
                    </span>
                  </button>
                </form>

                <div className="mt-6 sm:mt-8 text-center">
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Do not have an account?{" "}
                    <span
                      className="font-bold hover:underline cursor-pointer"
                      style={{ color: "var(--primary-500)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--primary-700)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--primary-500)")
                      }
                      onClick={handleSwitch}
                    >
                      Register
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Illustration - Hidden on mobile (below lg breakpoint) */}
            <div className="hidden lg:block justify-center items-center">
              <div className="relative">
                <img
                  src={logIn}
                  alt="Login Illustration"
                  className="max-w-lg drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {/* Decorative Background Blobs */}
          <div
            className="absolute top-[-20%] left-[-20%] w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30 sm:opacity-50"
            style={{ backgroundColor: "var(--primary-500)" }}
          />
          <div
            className="absolute bottom-[-20%] right-[-20%] w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30 sm:opacity-50"
            style={{ backgroundColor: "var(--primary-500)" }}
          />

          {/* Back to Home Link */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20">
            <Link
              to="/"
              className="flex items-center font-medium text-sm sm:text-base hover:underline"
              style={{ color: "var(--primary-700)" }}
            >
              <ArrowLeft size={16} className="mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Back to home</span>
              <span className="xs:hidden">Back</span>
            </Link>
          </div>

          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center z-10">
            {/* Left Side: Illustration - Hidden on mobile (below lg breakpoint) */}
            <div className="hidden lg:block justify-center items-center">
              <div className="relative">
                <img
                  src={signUp}
                  alt="Register Illustration"
                  className="max-w-xl drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Right Side: Register Card - Full width on mobile, centered */}
            <div className="flex justify-center lg:justify-start col-span-1">
              <div
                className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-sm w-full max-w-lg"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                  {/* Logo */}
                  <div className="mb-3 sm:mb-4">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-12 h-12 sm:w-16 sm:h-16"
                      />
                    </div>
                  </div>
                  <h1
                    className="text-2xl sm:text-3xl font-bold"
                    style={{ color: "var(--primary-500)" }}
                  >
                    Register
                  </h1>
                  <p
                    className="mt-1 sm:mt-2 text-center text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Write what in you mind with DailyWrite
                  </p>
                </div>

                {error && (
                  <div
                    className="mb-4 p-3 text-xs sm:text-sm rounded-lg sm:rounded-xl text-center"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      color: "rgb(239, 68, 68)",
                    }}
                  >
                    {error}
                  </div>
                )}

                <form
                  className="space-y-3 sm:space-y-4"
                  onSubmit={handleRegister}
                >
                  {/* Row: Username and Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label
                        className="block text-xs sm:text-sm font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                        required
                        className={`${getInputClassName()} input-field`}
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                          e.target.style.borderColor = "var(--primary-500)";
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = "none";
                          e.target.style.borderColor = "";
                        }}
                      />
                    </div>
                    <div className="relative">
                      <label
                        className="block text-xs sm:text-sm font-semibold mb-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Gender
                      </label>
                      <select
                        className={`${getInputClassName(true)} input-field`}
                        style={{
                          backgroundColor: "var(--bg-primary)",
                          color: "var(--text-primary)",
                        }}
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        required
                        onFocus={(e) => {
                          e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                          e.target.style.borderColor = "var(--primary-500)";
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = "none";
                          e.target.style.borderColor = "";
                        }}
                      >
                        <option value="" style={{ color: "var(--text-secondary)" }}>
                          Select Gender
                        </option>
                        <option value="male" style={{ color: "var(--text-primary)" }}>
                          Male
                        </option>
                        <option value="female" style={{ color: "var(--text-primary)" }}>
                          Female
                        </option>
                        <option value="other" style={{ color: "var(--text-primary)" }}>
                          Other
                        </option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 sm:right-4 top-[2.2rem] sm:top-[2.4rem] pointer-events-none"
                        size={16}
                        style={{ color: "var(--text-secondary)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                        e.target.style.borderColor = "var(--primary-500)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.borderColor = "";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      minLength={6}
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                        e.target.style.borderColor = "var(--primary-500)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.borderColor = "";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                      minLength={6}
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
                        e.target.style.borderColor = "var(--primary-500)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = "none";
                        e.target.style.borderColor = "";
                      }}
                    />
                  </div>

                  <div
                    className="py-2 sm:py-4 flex items-center before:flex-1 before:border-t after:flex-1 after:border-t"
                    style={{
                      before: { borderColor: "var(--border-color)" },
                      after: { borderColor: "var(--border-color)" },
                    }}
                  >
                    <p
                      className="mx-3 sm:mx-4 text-xs font-medium uppercase"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Or register with
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white font-bold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all active:scale-[0.98] text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--primary-500)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "var(--primary-700)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--primary-500)")
                    }
                  >
                    Register
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base"
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "var(--bg-secondary)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--bg-primary)")
                    }
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <span className="text-xs sm:text-sm font-semibold">
                      Continue with Google
                    </span>
                  </button>
                </form>

                <div className="mt-4 sm:mt-6 text-center">
                  <p
                    className="text-xs sm:text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Already have an account?{" "}
                    <span
                      className="font-bold hover:underline cursor-pointer"
                      style={{ color: "var(--primary-500)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--primary-700)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--primary-500)")
                      }
                      onClick={handleSwitch}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;