"use client";
import { Spinner, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { FaGoogle, FaFacebookF, FaEnvelope } from "react-icons/fa";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }

      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(email)) {
        setError("Invalid email address");
        setLoading(false);
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          [
            "Password must be at least 8 characters long",
            "and contain at least one uppercase letter,",
            "one lowercase letter, and one special character.",
          ].join("\n")
        );

        setLoading(false);
        return;
      }

      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res?.error) {
        setLoading(false);
        setError("Invalid email or password");
      } else {
        setError("");
        router.replace("/");
        // router.push("/userprofile");
      }
    } catch (error) {
      setError("An unexpected error occurred");

      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center background-pattern"></div>
      <div className="relative z-10 p-8 bg-white rounded-lg shadow-lg max-w-sm mx-auto w-full">
        <h1 className="text-2xl text-center font-semibold mb-2">
          Welcome back!
        </h1>
        <p className="mb-4 text-gray-600 text-center">
          We're really happy to see you again!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type={"email"}
            placeholder="example@123.com"
            name="email"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type={"password"}
            placeholder="**********"
            name="password"
            className="w-full px-4 py-2 border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Alert color="failure" icon={HiInformationCircle}>
              {error}
            </Alert>
          )}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center text-center justify-center"
          >
            {loading ? (
              <>
                <Spinner aria-label="Small spinner example" size="sm" />
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="mt-4 text-center text-gray-600">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Reset Here
            </a>
          </p>
          <p className="text-center mt-4">Or Log In With</p>
          <div className="flex justify-around mt-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaGoogle size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaEnvelope size={24} />
            </a>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
