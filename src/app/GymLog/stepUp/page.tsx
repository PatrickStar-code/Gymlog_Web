"use client";
import { RiNumber0 } from "@remixicon/react";
import { CalendarCheck, RulerDimensionLine, VenusAndMars } from "lucide-react";
import React, { useState } from "react";

export default function StepUpRegister() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
    console.log(step);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    console.log(step);
  };

  return (
    <main className="flex items-center justify-center flex-col min-h-screen">
      <h1 className="text-2xl font-bold ">Complete seu Registro</h1>
      <div className="mt-8">
        <div className="w-[50rem] py-6">
          <div className="flex">
            <div className="w-1/4">
              <div className="relative mb-2">
                <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-white w-full flex items-center justify-center">
                    <VenusAndMars size={30} />
                  </span>
                </div>
              </div>

              <div className="text-xs text-center md:text-base">Género</div>
            </div>

            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: `calc(100% - 2.5rem - 1rem)`,
                    top: `50%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-green-300 py-1 rounded"
                      style={{
                        width: step >= 2 ? "100%" : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className={`w-10 h-10 mx-auto  ${
                    step > 1 ? "bg-green-500 " : "bg-gray-200 "
                  } rounded-full text-lg  flex items-center`}
                >
                  <span
                    className={`text-center ${
                      step > 1 ? "text-white" : "text-gray-600"
                    }  w-full flex items-center justify-center`}
                  >
                    <CalendarCheck size={20} />
                  </span>
                </div>
              </div>

              <div className="text-xs text-center md:text-base">Idade</div>
            </div>

            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: `calc(100% - 2.5rem - 1rem)`,
                    top: `50%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className="w-0 bg-green-300 py-1 rounded"
                      style={{
                        width: step >= 3 ? "100%" : step > 2 ? "50%" : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className={`w-10 h-10 mx-auto ${
                    step > 2 ? "bg-green-500 " : "bg-gray-200 "
                  } border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}
                >
                  <span
                    className={`text-center ${
                      step > 2 ? "text-white" : "text-gray-600"
                    } w-full flex items-center justify-center`}
                  >
                    <RulerDimensionLine size={20} />
                  </span>
                </div>
              </div>

              <div className="text-xs text-center md:text-base">
                Peso e Altura
              </div>
            </div>

            <div className="w-1/4">
              <div className="relative mb-2">
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={{
                    width: `calc(100% - 2.5rem - 1rem)`,
                    top: `50%`,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div
                      className={`w-0 ${
                        step > 3 ? "bg-green-500 " : "bg-gray-200 "
                      } py-1 rounded`}
                      style={{
                        width: step >= 4 ? "100%" : step > 3 ? "50%" : "0%",
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className={`w-10 h-10 mx-auto ${
                    step >= 4 ? "bg-green-500" : "bg-white"
                  } border-2 border-gray-200 rounded-full text-lg text-white flex items-center`}
                >
                  <span
                    className={`text-center ${
                      step >= 4 ? "text-white" : "text-gray-600"
                    } w-full`}
                  >
                    <svg
                      className="w-full fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="text-xs text-center md:text-base">Objetivo</div>
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="flex items-center justify-center">
          Step 1 Content: Select Gender
        </div>
      )}
      {step === 2 && <div>Step 2 Content: Enter Age</div>}
      {step === 3 && <div>Step 3 Content: Input Weight and Height</div>}
      {step === 4 && <div>Step 4 Content: Choose Goal</div>}
    </main>
  );
}
