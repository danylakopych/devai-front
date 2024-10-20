"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/services/login/action";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    try {
      const result = await doCredentialLogin(formData);
        
        console.log(result);
      if (!result.success) {
        router.push("/projects");
      } else {
        setError(result.message);
      }
    } catch (e) {
      setError("An unexpected error occurred.");
      console.error(e);
    }
  }

  return (
    <>
      <div className="text-xl text-red-500">{error}</div>
      <form
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
        onSubmit={onSubmit}
      >
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
                      id="email"
                      autoComplete="email"
            required
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
                      id="password"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Credential Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
