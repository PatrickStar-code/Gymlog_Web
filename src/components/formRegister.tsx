import React from "react";
import { motion } from "framer-motion";
import { slide } from "@/app/GymLog/login/page";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";

const RegisterSchema = zod.object({
  email: zod.string().email("Email inválido"),
  password: zod.string().min(6, "Senha inválida"),
  nome: zod.string().min(3, "Nome inválido"),
});

type RegisterFormData = zod.infer<typeof RegisterSchema>;
export default function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  function submit(data: RegisterFormData) {
    console.log(data);
    reset();
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
