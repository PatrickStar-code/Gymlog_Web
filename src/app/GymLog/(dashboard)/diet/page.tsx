"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/fetchApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Plus, Search, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function DietPage() {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Targets de caloria diária (Poderia vir de Context e do UserController)
  const targets = { calories: 2500, protein: 160, carbs: 280, fat: 70 };
  const [consumed, setConsumed] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetchApi("/meals");
        if (res && res.length > 0) {
          setMeals(res);
        } else {
          // Dummy data
          const dummyMeals = [
            { id: 1, title: "Café da Manhã", time: "08:00", calories: 450, macros: { p: 30, c: 50, f: 15 }, items: ["Aveia", "Ovos", "Banana"] },
            { id: 2, title: "Almoço", time: "12:30", calories: 650, macros: { p: 50, c: 70, f: 20 }, items: ["Frango", "Arroz Integral", "Brócolis"] },
          ];
          setMeals(dummyMeals);
          
          // Calculator logic for progress
          let totalCals = 0, totalP = 0, totalC = 0, totalF = 0;
          dummyMeals.forEach(m => {
            totalCals += m.calories;
            totalP += m.macros.p;
            totalC += m.macros.c;
            totalF += m.macros.f;
          });
          setConsumed({ calories: totalCals, protein: totalP, carbs: totalC, fat: totalF });
        }
      } catch (err) {
         setMeals([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMeals();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diário Alimentar</h1>
          <p className="text-muted-foreground mt-1">
            Planeje, acompanhe e alcance suas metas nutricionais diárias.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/GymLog/diet/foods">
            <Button variant="outline" className="gap-2">
              <Search className="h-4 w-4" /> Buscar Alimentos
            </Button>
          </Link>
          <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
            <Plus className="h-4 w-4" /> Nova Refeição
          </Button>
        </div>
      </div>

      {/* Macros Overview */}
      <Card className="border-orange-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground">Calorias (kcal)</p>
              <div className="text-2xl font-bold">{consumed.calories} <span className="text-sm font-normal text-muted-foreground">/ {targets.calories}</span></div>
              <Progress value={(consumed.calories / targets.calories) * 100} className="h-2" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground">Proteína (g)</p>
              <div className="text-2xl font-bold">{consumed.protein} <span className="text-sm font-normal text-muted-foreground">/ {targets.protein}</span></div>
              <Progress value={(consumed.protein / targets.protein) * 100} className="h-2 text-blue-500" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground">Carboidratos (g)</p>
              <div className="text-2xl font-bold">{consumed.carbs} <span className="text-sm font-normal text-muted-foreground">/ {targets.carbs}</span></div>
              <Progress value={(consumed.carbs / targets.carbs) * 100} className="h-2 text-green-500" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm font-medium text-muted-foreground">Gorduras (g)</p>
              <div className="text-2xl font-bold">{consumed.fat} <span className="text-sm font-normal text-muted-foreground">/ {targets.fat}</span></div>
              <Progress value={(consumed.fat / targets.fat) * 100} className="h-2 text-yellow-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight border-b pb-2">Refeições de Hoje</h2>
        {meals.map((meal, idx) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="hover:border-orange-200 transition-colors">
              <CardHeader className="py-4 border-b bg-muted/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UtensilsCrossed className="h-5 w-5 text-orange-500" />
                    {meal.title}
                  </CardTitle>
                  <span className="font-semibold text-lg">{meal.calories} kcal</span>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Itens:</span> {meal.items.join(", ")}
                  </div>
                  <div className="flex gap-4 text-sm font-medium">
                     <span className="text-blue-600">P: {meal.macros?.p}g</span>
                     <span className="text-green-600">C: {meal.macros?.c}g</span>
                     <span className="text-yellow-600">G: {meal.macros?.f}g</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
