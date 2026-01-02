"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";

function saveUser(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem("cv_users" )||"{}");
  users[email] = { email, password };
  localStorage.setItem("cv_users", JSON.stringify(users));
}

function checkUser(email: string, password: string) {
  const users = JSON.parse(localStorage.getItem("cv_users") || "{}");
  return users[email] && users[email].password === password;
}

export default function AuthForm({ mode = "login" }: { mode?: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Please enter email and password");
    if (mode === "signup") {
      saveUser(email, password);
      localStorage.setItem("cv_user", email);
      router.push("/product");
    } else {
      if (checkUser(email, password)) {
        localStorage.setItem("cv_user", email);
        router.push("/product");
      } else {
        setError("Invalid credentials. Try signing up first.");
      }
    }
  };

  return (
    <form onSubmit={submit} className={`mx-auto max-w-md space-y-4 ${styles.panel}`}>
      <h3 className={`text-lg font-semibold ${styles.text}`}>{mode === "login" ? "Sign in" : "Create account"}</h3>
      <div>
        <label className={styles.label}>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} className={styles.input} />
      </div>
      <div>
        <label className={styles.label}>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className={styles.input} />
      </div>
      {error && <div className="text-sm text-red-300">{error}</div>}
      <div className="flex justify-end">
        <button type="submit" className={styles.btn}>{mode === "login" ? "Sign in" : "Sign up"}</button>
      </div>
    </form>
  );
}
