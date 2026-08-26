"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";
import { login } from "../api/authApi";
import { api } from "@/lib/axios";
import { useState } from "react";

type LoginFormData = z.infer<typeof loginSchema>;
// "Створи TypeScript-тип LoginFormData на основі Zod-схеми loginSchema."

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const result = await login(data);

          localStorage.setItem("accessToken", result.accessToken);

          const response = await api.get("/v1/auth/me");

          console.log(response.data);
        } catch {
          setErrorMessage("Invalid email or password");
        }
      })}
    >
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      {errorMessage && <p>{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
