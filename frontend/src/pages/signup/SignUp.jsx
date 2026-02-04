import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox.jsx";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div
        className="
          w-full max-w-[680px]
          py-6 px-8
          rounded-2xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-2xl
        "
      >
        <h1 className="text-2xl font-bold text-center text-white mb-1">
          Create your account
        </h1>
        <p className="text-sm text-center text-gray-300 mb-5">
          Join <span className="text-blue-400 font-semibold">ChatApp</span> today
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="
                  w-full h-10 px-4 rounded-lg
                  bg-white/20 text-white placeholder-gray-400
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={inputs.fullName}
                onChange={(e) =>
                  setInputs({ ...inputs, fullName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe"
                className="
                  w-full h-10 px-4 rounded-lg
                  bg-white/20 text-white placeholder-gray-400
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="
                  w-full h-10 px-4 rounded-lg
                  bg-white/20 text-white placeholder-gray-400
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="
                  w-full h-10 px-4 rounded-lg
                  bg-white/20 text-white placeholder-gray-400
                  border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={inputs.confirmPassword}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Gender */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          {/* Footer */}
          <div className="flex justify-between items-center text-sm pt-1">
            <Link
              to="/login"
              className="text-gray-300 hover:text-blue-400 hover:underline"
            >
              Already have an account?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full h-10 mt-3 rounded-lg font-semibold
              bg-gradient-to-r from-blue-500 to-cyan-400
              hover:scale-[1.02] transition
              text-black
            "
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
