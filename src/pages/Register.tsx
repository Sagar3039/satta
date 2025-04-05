import React, { useState, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Register(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = result.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });

      toast.success("Registration Successful!", { position: "top-center" });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      const errorMsg =
        error.code === "auth/email-already-in-use"
          ? "User already exists with this email."
          : error.message;
      toast.error(errorMsg, {
        position: "top-center",
      });
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="form bg-white text-black p-6 rounded-2xl max-w-md mx-auto mt-10 space-y-4"
    >
      <p className="text-2xl font-semibold text-blue-700 relative pl-8 title">Register</p>
      <p className="text-sm text-gray-600">Signup now and get full access to our app.</p>

      <div className="flex gap-3">
        <label className="w-full relative">
          <input
            type="text"
            className="input w-full p-2 border rounded-lg peer"
            placeholder=" "
            onChange={(e) => setFname(e.target.value)}
            required
          />
          <span className="absolute left-2 top-2 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-6 peer-focus:text-sm transition-all">
            Firstname
          </span>
        </label>

        <label className="w-full relative">
          <input
            type="text"
            className="input w-full p-2 border rounded-lg peer"
            placeholder=" "
            onChange={(e) => setLname(e.target.value)}
            required
          />
          <span className="absolute left-2 top-2 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-6 peer-focus:text-sm transition-all">
            Lastname
          </span>
        </label>
      </div>

      <label className="relative block">
        <input
          type="email"
          className="input w-full p-2 border rounded-lg peer"
          placeholder=" "
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span className="absolute left-2 top-2 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-6 peer-focus:text-sm transition-all">
          Email
        </span>
      </label>

      <label className="relative block">
        <input
          type={showPassword ? "text" : "password"}
          className="input w-full p-2 border rounded-lg peer pr-10"
          placeholder=" "
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="absolute left-2 top-2 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-6 peer-focus:text-sm transition-all">
          Password
        </span>
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-gray-500 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </label>

      <label className="relative block">
        <input
          type={showConfirmPassword ? "text" : "password"}
          className="input w-full p-2 border rounded-lg peer pr-10"
          placeholder=" "
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <span className="absolute left-2 top-2 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:top-6 peer-focus:text-sm transition-all">
          Confirm Password
        </span>
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-2 top-2 text-gray-500 cursor-pointer"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </label>

      <button
        type="submit"
        className="submit bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg w-full mt-4"
      >
        Submit
      </button>

      <p className="signin text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Signin
        </Link>
      </p>
    </form>
  );
}

export default Register;
