"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { slide } from "@/app/GymLog/auth/login/page";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useAuth } from "@/app/Contexts/AuthContext";
import { fetchApi } from "@/lib/fetchApi";

const LoginSchema = zod.object({
  email: zod.string().email("Email inválido"),
  password: zod.string().min(6, "Senha inválida"),
});

export type LoginFormData = zod.infer<typeof LoginSchema>;

export default function FormLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  async function submit(data: LoginFormData) {
    setLoading(true);
    setGlobalError("");
    try {
      const res = await fetchApi("/auth/login", {
        method: "POST",
        data,
      });
      if (res && res.token) {
        login(res.token, res.user || { email: data.email });
        reset();
      }
    } catch (e: any) {
      setGlobalError(e.message || "Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      key="signin"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants={slide as any}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-5"
      onSubmit={handleSubmit(submit)}
    >
      {globalError && (
        <div className="p-3 text-sm text-red-500 bg-red-100/50 rounded-lg border border-red-200">
          {globalError}
        </div>
      )}
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className={`w-full px-4 py-3 rounded-lg text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.email ? "border-red-500" : ""
          }`}
      />
      {errors.email && (
        <span className="text-sm text-red-500">{errors.email.message}</span>
      )}
      <input
        type="password"
        placeholder="Senha"
        {...register("password")}
        className={`w-full text-black px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${errors.password ? "border-red-500" : ""
          }`}
      />
      {errors.password && (
        <span className="text-sm text-red-500">{errors.password.message}</span>
      )}

      <div className="flex justify-between text-sm text-gray-500">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 rounded text-orange-500" />
          <span>Manter conectado</span>
        </label>
        <button type="button" className="hover:underline">
          Esqueci a senha
        </button>
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
      >
        Entrar
      </motion.button>
    </motion.form>
  );
}
