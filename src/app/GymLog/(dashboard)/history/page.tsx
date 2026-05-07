"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/fetchApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Clock, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetchApi("/trainingHistory");
        if (res) {
          setHistory(res);
        }
      } catch (err) {
        // Fallback for visual demonstration
        setHistory([
          { id: 1, title: "Peito e Tríceps", date: "2023-11-01T14:30:00", duration: "1h 15m", totalWeight: 4500 },
          { id: 2, title: "Costas e Bíceps", date: "2023-10-31T08:00:00", duration: "1h 05m", totalWeight: 5200 },
          { id: 3, title: "Pernas", date: "2023-10-29T10:00:00", duration: "1h 30m", totalWeight: 7500 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/GymLog/workouts" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico de Treinos</h1>
          <p className="text-muted-foreground mt-1">Suas sessões de treinamento concluídas.</p>
        </div>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {history.map((session, i) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Timeline icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-orange-100 text-orange-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
               <CalendarCheck className="h-5 w-5" />
            </div>

            {/* Card Content */}
            <Card className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] shadow-sm hover:shadow-md transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{session.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                   <Clock className="h-3 w-3" />
                   {new Date(session.date).toLocaleString("pt-BR", {
                     day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
                   })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                   <div className="bg-muted p-2 rounded">
                      <p className="text-muted-foreground text-xs mb-1">Duração</p>
                      <p className="font-semibold">{session.duration}</p>
                   </div>
                   <div className="bg-muted p-2 rounded">
                      <p className="text-muted-foreground text-xs mb-1">Volume</p>
                      <p className="font-semibold">{session.totalWeight} kg</p>
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
