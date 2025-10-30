"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormLogin from "@/components/formLogin";
import FormRegister from "@/components/formRegister";
import { Facebook, NotepadText } from "lucide-react";
import { Button } from "@/components/button-notFound";
import { RiFacebookFill, RiGoogleFill } from "@remixicon/react";

export const slide = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -60,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const switchTo = (m: "signin" | "register") => setMode(m);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
      {/* Floating animated orbs */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 left-12 w-24 h-24 rounded-full bg-orange-300/30 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-orange-400/40 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-orange-100"
      >
        {/* LEFT SECTION */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col items-center justify-center gap-6 p-12 bg-gradient-to-b from-orange-600 to-orange-500 text-white relative overflow-hidden"
        >
          <motion.h2 className="text-4xl font-extrabold drop-shadow-lg text-center">
            {mode === "signin"
              ? "Bem-vindo(a) de volta!"
              : "Bora começar sua jornada!"}
          </motion.h2>
          <p className="text-orange-100/90 max-w-sm text-center">
            {mode === "signin"
              ? "Entre e continue acompanhando sua dieta e treinos."
              : "Crie uma conta e comece a gerenciar sua alimentação e desempenho físico."}
          </p>

          <motion.div
            initial={{ rotate: -5, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 w-64 h-64 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg"
          >
            <NotepadText className="w-32 h-32" />
            {/* <motion.img
              src="/fitness-illustration.svg"
              alt="Fitness illustration"
              className="w-44 h-44 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            /> */}
          </motion.div>
        </motion.div>

        {/* RIGHT SECTION */}
        <div className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-tr from-white via-orange-50 to-orange-100">
          <div className="w-full max-w-md">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {mode === "signin" ? "Entrar" : "Criar conta"}
                </h1>
                <p className="text-sm text-gray-500">
                  {mode === "signin"
                    ? "Use suas credenciais para continuar"
                    : "Preencha os dados para começar"}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => switchTo("signin")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    mode === "signin"
                      ? "bg-orange-100 text-orange-700"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => switchTo("register")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    mode === "register"
                      ? "bg-orange-500 text-white"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Cadastrar
                </button>
              </div>
            </div>

            {/* FORMS */}
            <AnimatePresence mode="wait" initial={false}>
              {mode === "signin" ? (
                <FormLogin key="signin" />
              ) : (
                <FormRegister key="register" />
              )}
            </AnimatePresence>

            {/* Social Login */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Ou continue com</p>
              <div className="inline-flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  aria-label="Login with Google"
                  size="icon"
                >
                  <RiGoogleFill size={16} aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  aria-label="Login with Facebook"
                  size="icon"
                >
                  <RiFacebookFill size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
