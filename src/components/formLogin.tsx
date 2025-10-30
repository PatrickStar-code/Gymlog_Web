"use client";

import React from "react";
import { motion } from "framer-motion";
import { slide } from "@/app/GymLog/login/page";

export default function FormLogin() {
  return (
    <motion.form
      key="signin"
      variants={slide as any}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-5"
    >
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-3 rounded-lg text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="password"
        placeholder="Senha"
        className="w-full text-black px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

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
