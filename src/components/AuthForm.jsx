import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase";

const authErrors = {
  "auth/email-already-in-use": "That email is already registered.",
  "auth/configuration-not-found":
    "Firebase Authentication is not enabled for this project yet.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/popup-closed-by-user": "Google sign-in was closed before finishing.",
  "auth/weak-password": "Password should be at least 6 characters.",
};

function AuthForm({ mode }) {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const title = isSignup ? "Create your account" : "Log in";
  const submitLabel = isSignup ? "Sign up" : "Log in";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isFirebaseConfigured || !auth) {
      setError("Firebase is not configured yet. Add your keys to a .env file.");
      return;
    }

    try {
      setLoading(true);
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(authErrors[err.code] || err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");

    if (!isFirebaseConfigured || !auth || !googleProvider) {
      setError("Firebase is not configured yet. Add your keys to a .env file.");
      return;
    }

    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      setError(authErrors[err.code] || err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-200 pt-[96px] px-4">
      <section className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">
          Save your watchlist under your own account.
        </p>

        {!isFirebaseConfigured && (
          <div className="mt-4 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
            Firebase keys are missing. Create a `.env` file from `.env.example`
            and restart the dev server.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </label>

          <label className="block text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              minLength={6}
              required
            />
          </label>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:cursor-pointer hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : submitLabel}
          </button>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-3 w-full rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-800 transition hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="font-semibold text-gray-900 underline hover:cursor-pointer"
          >
            {isSignup ? "Log in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
}

export default AuthForm;
