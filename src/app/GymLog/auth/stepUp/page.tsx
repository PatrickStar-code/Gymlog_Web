"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Calendar,
  Weight,
  Target,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
interface FormData {
  gender: string;
  birthdate: string;
  height: string;
  weight: string;
  goal: string;
}

const formSchema = z.object({
  gender: z.string().min(1),
  birthdate: z
    .string()
    .min(1)
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
  height: z.coerce.number().positive(),
  weight: z.coerce.number().positive(),
  goal: z.string().min(1),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function StepUpRegister() {
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const { register, handleSubmit, watch, reset, setValue, control } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      birthdate: undefined,
      height: "",
      weight: "",
      goal: "",
    },
  });

  const gender = watch("gender");
  const birthdate = watch("birthdate");
  const height = watch("height");
  const weight = watch("weight");
  const goal = watch("goal");

  const onStepSubmit = (data: FormSchemaType) => {
    console.log("Form Data:", data);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return Boolean(gender);

      case 2:
        return birthdate;

      case 3:
        return (
          typeof height === "number" &&
          typeof weight === "number" &&
          Number(height) > 0 &&
          Number(weight) > 0
        );

      case 4:
        return Boolean(goal);

      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const stepIcons = [
    { icon: User, label: "Género" },
    { icon: Calendar, label: "Aniversário" },
    { icon: Weight, label: "Peso e Altura" },
    { icon: Target, label: "Objetivo" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <form onSubmit={handleSubmit(onStepSubmit)}>
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold">
                Finalize seu Perfil
              </CardTitle>
              <div className="text-sm text-muted-foreground font-medium">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            <CardDescription>
              Vamos começar sua jornada fitness! Complete seu perfil para
              personalizarmos sua experiência.
            </CardDescription>
            <Progress value={progress} className="h-2" />

            <div className="flex justify-between pt-4">
              {stepIcons.map((step, index) => {
                const StepIcon = step.icon;
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 flex-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isCurrent
                          ? "bg-primary/20 text-primary border-2 border-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        isCurrent ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardHeader>

          <CardContent className="space-y-6 min-h-[300px]">
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">
                    Selecione seu Gênero
                  </Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                      >
                        {["Homem", "Mulher", "Outro"].map((item) => (
                          <div key={item}>
                            <RadioGroupItem
                              value={item}
                              id={item}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={item}
                              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                            >
                              <User className="mb-3 h-8 w-8" />
                              <span className="font-medium">{item}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="space-y-3">
                  <Label htmlFor="birthdate" className="text-lg font-semibold">
                    Qual sua Data de Nascimento?
                  </Label>
                  <Input
                    id="birthdate"
                    type="date"
                    placeholder="Select your birth date"
                    {...register("birthdate")}
                    className="text-lg h-14"
                    max={new Date().toISOString().split("T")[0]}
                  />
                  <p className="text-sm text-muted-foreground">
                    Isso nos ajuda a personalizar sua experiência.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">
                    Seu Peso/Alutra
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        {...register("height", { valueAsNumber: true })}
                        min="1"
                        className="h-12"
                        step="0.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        {...register("weight", { valueAsNumber: true })}
                        className="h-12"
                        min="1"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">
                    What's Your Goal?
                  </Label>
                  <Controller
                    control={control}
                    name="goal"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-1 gap-3"
                      >
                        {[
                          {
                            value: "lose_weight",
                            label: "Perder Peso",
                            desc: "Perder gordura e ficar em forma",
                          },
                          {
                            value: "gain_weight",
                            label: "Ganhar Músculo",
                            desc: "Construir força e massa",
                          },
                          {
                            value: "maintain_weight",
                            label: "Manter Peso",
                            desc: "Ficar saudável e em forma",
                          },
                          {
                            value: "define_body",
                            label: "Definir Corpo",
                            desc: "Tonificar músculos e melhorar a definição",
                          },
                        ].map((goal) => (
                          <div key={goal.value}>
                            <RadioGroupItem
                              value={goal.value}
                              id={goal.value}
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor={goal.value}
                              className="flex items-center justify-between rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                            >
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {goal.label}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {goal.desc}
                                </span>
                              </div>
                              <Target className="h-5 w-5" />
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  disabled={!isStepValid()}
                  className="gap-2"
                  type="submit"
                >
                  Complete
                  <Check className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
