"use client";

import {
  ArrowRightCircle,
  CalendarCheck,
  RulerDimensionLine,
  VenusAndMars,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import StepItem from "@/components/step/stepIten";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const stepUpSchema = zod.object({
  gender: zod.enum(["male", "female"], {
    required_error: "Selecione um gênero",
  }),
});

type StepUpFormData = zod.infer<typeof stepUpSchema>;

export default function StepUpRegister() {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StepUpFormData>({
    resolver: zodResolver(stepUpSchema),
  });

  const selectedGender = watch("gender");

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleSetGender = (gender: "male" | "female") => {
    setValue("gender", gender, { shouldValidate: true });
  };

  const genderCardBase =
    "p-6 w-full transition-all duration-300 border-2 rounded-2xl cursor-pointer flex items-center justify-center";

  const genderSelected = "border-orange-500 scale-105 ring-2 ring-orange-400";

  const genderUnselected =
    "border-gray-300 hover:border-orange-400 hover:scale-105";

  return (
    <main className="flex items-center justify-center flex-col min-h-screen px-4">
      <h1 className="text-2xl font-bold">Complete seu Registro</h1>

      {/* Steps */}
      <div className="mt-8 w-full max-w-3xl">
        <div className="relative grid grid-cols-4 gap-2 md:gap-4">
          {/* Barra de progresso */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded">
            <motion.div
              className="h-full bg-green-400 rounded"
              initial={{ width: 0 }}
              animate={{ width: `${(step - 1) * 35.33}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>

          <StepItem
            active={step >= 1}
            label="Gênero"
            icon={<VenusAndMars size={22} />}
          />
          <StepItem
            active={step >= 2}
            label="Idade"
            icon={<CalendarCheck size={22} />}
          />
          <StepItem
            active={step >= 3}
            label="Peso e Altura"
            icon={<RulerDimensionLine size={22} />}
          />
          <StepItem
            active={step >= 4}
            label="Objetivo"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm-1.4-6.4l5-5a1 1 0 1 0-1.4-1.4l-3.6 3.6-1.6-1.6a1 1 0 1 0-1.4 1.4l3 3a1 1 0 0 0 1.4 0z" />
              </svg>
            }
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(() => {})}
        className="mt-12 w-full max-w-3xl"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-8">
            <p className="text-xl font-medium font-sans">
              Etapa 1 – Selecione seu gênero biológico
            </p>

            <div className="flex gap-8 flex-col md:flex-row w-full">
              <div
                className={`${genderCardBase} ${
                  selectedGender === "male" ? genderSelected : genderUnselected
                }`}
                onClick={() => handleSetGender("male")}
              >
                <Image
                  src="/guy.svg"
                  alt="Masculino"
                  className="w-[130px] md:w-[180px]"
                  width={180}
                  height={180}
                />
              </div>

              <div
                className={`${genderCardBase} ${
                  selectedGender === "female"
                    ? genderSelected
                    : genderUnselected
                }`}
                onClick={() => handleSetGender("female")}
              >
                <Image
                  src="/girl.svg"
                  alt="Feminino"
                  className="w-[130px] md:w-[180px]"
                  width={180}
                  height={180}
                />
              </div>
            </div>

            <input type="hidden" {...register("gender")} />

            {selectedGender && (
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="flex gap-2 items-center justify-center bg-orange-600 rounded-2xl hover:bg-orange-700 transition-colors duration-300 text-xl px-6 py-3"
                >
                  Próximo <ArrowRightCircle size={32} />
                </button>
              </div>
            )}

            {errors.gender && (
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>
        )}

        {step === 2 && <div>Etapa 2 – Informe sua idade</div>}
        {step === 3 && <div>Etapa 3 – Peso e altura</div>}
        {step === 4 && <div>Etapa 4 – Objetivo</div>}
      </form>
    </main>
  );
}
