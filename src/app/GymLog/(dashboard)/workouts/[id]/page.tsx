"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/fetchApi";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Exemplo de mock para renderização visual
  // Em prod usaríamos /workoutExercises?planId=id
  useEffect(() => {
    async function fetchExercises() {
      try {
        const res = await fetchApi(`/workoutPlans/${id}/exercises`);
        if (res && res.length > 0) {
          setExercises(res);
        } else {
          setExercises([
            { id: 1, name: "Supino Reto", sets: [{ reps: 10, weight: 60 }, { reps: 8, weight: 65 }] },
            { id: 2, name: "Supino Inclinado com Halteres", sets: [{ reps: 12, weight: 24 }, { reps: 10, weight: 26 }] },
            { id: 3, name: "Crucifixo Máquina", sets: [{ reps: 15, weight: 45 }, { reps: 15, weight: 45 }] },
          ]);
        }
      } catch (e) {
        setExercises([
          { id: 1, name: "Supino Reto", sets: [{ reps: 10, weight: 60 }] },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchExercises();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/GymLog/workouts" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Treino A</h1>
            <p className="text-muted-foreground mt-1">Peito, Ombro e Tríceps</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" /> Adicionar Exercício
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 gap-2 text-white">
            <Play className="h-4 w-4" /> Iniciar Treino
          </Button>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-6">
        {exercises.map((exercise, idx) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="hover:border-orange-200 transition-colors">
              <CardHeader className="pb-3 border-b border-border/40">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <span className="text-orange-500 text-base">{idx + 1}.</span>
                    {exercise.name}
                  </CardTitle>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-4 md:grid-cols-5 text-sm font-medium text-muted-foreground mb-2 text-center">
                    <div>Série</div>
                    <div>Repetições</div>
                    <div>Carga (kg)</div>
                    <div className="hidden md:block">Descanso</div>
                    <div>Ações</div>
                  </div>
                  {exercise.sets.map((set: any, sIdx: number) => (
                    <div key={sIdx} className="grid grid-cols-4 md:grid-cols-5 items-center text-center p-2 rounded hover:bg-muted/50">
                      <div className="font-semibold">{sIdx + 1}</div>
                      <div>
                        <input type="number" defaultValue={set.reps} className="w-16 bg-transparent border-b text-center focus:border-orange-500 outline-none" />
                      </div>
                      <div>
                        <input type="number" defaultValue={set.weight} className="w-16 bg-transparent border-b text-center focus:border-orange-500 outline-none" />
                      </div>
                      <div className="hidden md:block">
                         <span className="text-xs text-muted-foreground">90s</span>
                      </div>
                      <div>
                         <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500">
                            <Trash2 className="h-3 w-3" />
                         </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                    <Button variant="ghost" size="sm" className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 text-xs gap-1 border border-dashed border-orange-200">
                      <Plus className="h-3 w-3" /> Adicionar Série
                    </Button>
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
