import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { fetchApi } from "@/lib/fetchApi";
import { useAuth } from "@/app/Contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

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
      const res = await fetchApi("/users/register", {
        method: "POST",
        data: {
          username: data.nome,
          email: data.email,
          password: data.password,
        },
      });

      if (res) {
        console.log(res);
        if (res.status === 409) {
          const errorMessage = "Usuario ja cadastrado";
          setGlobalError(errorMessage);
          toast.error(errorMessage);
          reset();
          return;
        }

        toast.success("Cadastro realizado com sucesso!");

        const loginRes = await fetchApi("/auth/login", {
          method: "POST",
          data: {
            email: data.email,
            password: data.password,
          },
        });

        if (loginRes && loginRes.tokenJwt) {
          const userRes = await fetchApi("/users/me", {
            headers: {
              Authorization: `Bearer ${loginRes.tokenJwt}`,
            },
          });
          const redirectPath = loginRes.profileComplete
            ? "/GymLog/dashboard"
            : "/GymLog/auth/stepUp";
          login(
            loginRes.tokenJwt,
            userRes || { email: data.email },
            redirectPath,
          );
        }
      }
    } catch (e: unknown) {
      const errorMessage =
        (e as { message?: string }).message || "Erro ao registrar";
      setGlobalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      key="register"
      onSubmit={handleSubmit(submit)}
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
        disabled={loading}
        className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Criando conta...
          </div>
        ) : (
          "Criar conta"
        )}
      </motion.button>
    </motion.form>
  );
}
