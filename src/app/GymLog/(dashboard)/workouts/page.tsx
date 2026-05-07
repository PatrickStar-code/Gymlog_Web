"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Dumbbell, ArrowRight } from "lucide-react";
import { fetchApi } from "@/lib/fetchApi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WorkoutsPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await fetchApi("/workoutPlans");
        if (res && res.length > 0) {
          setPlans(res);
        } else {
          // Dummy data for visual development
          setPlans([
            { id: 1, title: "Treino A - Peito, Ombro e Tríceps", target: "Hipertrofia" },
            { id: 2, title: "Treino B - Costas e Bíceps", target: "Hipertrofia" },
            { id: 3, title: "Treino C - Pernas Completo", target: "Força" },
          ]);
        }
      } catch (err) {
        setPlans([
          { id: 1, title: "Treino A - Peito, Ombro e Tríceps", target: "Hipertrofia" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Treinos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus planos de treinamento e acompanhe sua divisão muscular.
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
          <Plus className="h-4 w-4" /> Novo Plano
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col group hover:border-orange-500 transition-colors shadow-sm cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Dumbbell className="h-6 w-6 text-orange-500" />
                    {plan.title}
                  </CardTitle>
                  <CardDescription>Foco: {plan.target}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Clique para ver os exercícios, séries e gerenciar hipertrofia.
                  </p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Link href={`/GymLog/workouts/${plan.id}`}>
                    <Button variant="outline" className="w-full justify-between group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-200 dark:group-hover:bg-orange-950">
                      Visualizar Rotina
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Histórico Rápido</h2>
          <Link href="/GymLog/history">
            <Button variant="link" className="text-orange-600">Ver todo o histórico</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
             <div className="divide-y relative">
                <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition">
                  <div>
                    <h4 className="font-semibold text-sm">Treino A (Finalizado)</h4>
                    <p className="text-xs text-muted-foreground">Hoje às 14:30</p>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">Volume: 4,500kg</span>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-muted/50 transition">
                  <div>
                    <h4 className="font-semibold text-sm">Treino B (Finalizado)</h4>
                    <p className="text-xs text-muted-foreground">Ontem às 08:00</p>
                  </div>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">Volume: 5,200kg</span>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
