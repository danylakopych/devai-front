"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "@/app/services/login/action";
import styles from "./login.module.css";

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
        className={styles.form}
        onSubmit={onSubmit}
      >
        <div className={styles.wrapper}>
          <div className={styles.floatingLabel}>
            
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <label className={styles.label} htmlFor="email">Email Address</label>
          </div>

          <div className={styles.floatingLabel}>
            
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
            <label className={styles.label} htmlFor="password">Password</label>
          </div>

          <button
            type="submit"
            className={styles.button}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
