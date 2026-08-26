"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../schemas/registerSchema";
import { register } from "../api/authApi";

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          setErrorMessage("");
          setSuccessMessage("");

          const result = await register(data);

          console.log(result);

          setSuccessMessage("Registration successful");
        } catch {
          setErrorMessage("Registration failed");
        }
      })}
    >
      <input {...registerField("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...registerField("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...registerField("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {successMessage && <p>{successMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
