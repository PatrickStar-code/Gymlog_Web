import React, { useState } from "react";
import { motion } from "framer-motion";
import { slide } from "@/app/GymLog/auth/login/page";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { fetchApi } from "@/lib/fetchApi";
import { useAuth } from "@/app/Contexts/AuthContext";

const RegisterSchema = zod.object({
  email: zod.string().email("Email inválido"),
  password: zod.string().min(6, "Senha inválida"),
  nome: zod.string().min(3, "Nome inválido"),
});

type RegisterFormData = zod.infer<typeof RegisterSchema>;

export default function FormRegister() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  async function submit(data: RegisterFormData) {
    setLoading(true);
    setGlobalError("");
    try {
      const res = await fetchApi("/auth/register", {
        method: "POST",
        data: {
          name: data.nome,
          email: data.email,
          password: data.password,
        },
      });
      // Optionally login automatically
      if (res && res.token) {
        login(res.token, res.user || { name: data.nome, email: data.email });
      } else {
        // Fallback standard explicit login simulation just in case
        const loginRes = await fetchApi("/auth/login", {
          method: "POST",
          data: { email: data.email, password: data.password },
        });
        if (loginRes && loginRes.token) {
          login(loginRes.token, loginRes.user || { name: data.nome, email: data.email });
        }
      }
      reset();
    } catch (e: any) {
      setGlobalError(e.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      key="register"
      onSubmit={handleSubmit(submit)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants={slide as any}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-5"
    >
      {globalError && (
        <div className="p-3 text-sm text-red-500 bg-red-100/50 rounded-lg border border-red-200">
          {globalError}
        </div>
      )}
      <input
        type="text"
        placeholder="Nome completo"
        className={`w-full px-4 py-3 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
          errors.nome ? "border-red-500" : ""
        }`}
        {...register("nome")}
      />
      {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
      <input
        type="email"
        placeholder="Email"
        className={`w-full px-4 py-3 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
          errors.email ? "border-red-500" : ""
        }`}
        {...register("email")}
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <input
        type="password"
        placeholder="Senha"
        className={`w-full px-4 py-3  text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
          errors.password ? "border-red-500" : ""
        }`}
        {...register("password")}
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
      >
        Criar conta
      </motion.button>
    </motion.form>
  );
}
