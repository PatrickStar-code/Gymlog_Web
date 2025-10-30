import React from "react";
import { motion } from "framer-motion";
import { slide } from "@/app/GymLog/login/page";

export default function FormRegister() {
  return (
    <motion.form
      key="register"
      variants={slide}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-5"
    >
      <input
        type="text"
        placeholder="Nome completo"
        className="w-full px-4 py-3 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full px-4 py-3  text-black rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

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
