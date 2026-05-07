"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/fetchApi";
import { motion } from "framer-motion";
import { Activity, Scale, TrendingUp, Plus } from "lucide-react";

export default function ProgressPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetchApi("/progress");
        if (res) {
          setLogs(res);
        }
      } catch (err) {
        // Ignorar se vazio ou erro inicial.
        setLogs([
          { id: 1, date: "2023-09-01", weight: 75.5, bodyFat: 18.0 },
          { id: 2, date: "2023-09-15", weight: 74.8, bodyFat: 17.5 },
          { id: 3, date: "2023-10-01", weight: 74.0, bodyFat: 16.8 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  async function handleAddLog(e: React.FormEvent) {
    e.preventDefault();
    try {
      const newLog = { weight: parseFloat(weight), bodyFat: parseFloat(bodyFat), date: new Date().toISOString().split("T")[0] };
      setLogs([...logs, { ...newLog, id: Math.random() }]);
      await fetchApi("/progress", { method: "POST", data: newLog });
      setWeight("");
      setBodyFat("");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progresso Corporal</h1>
          <p className="text-muted-foreground mt-1">
            Mantenha o rastreamento das suas métricas para avaliar seus ganhos.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <Card className="h-full border-orange-200 dark:border-orange-900 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Adicionar Registro</CardTitle>
              <CardDescription>Insira as métricas de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddLog} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Peso (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gordura Corporal (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                  <Plus className="h-4 w-4" />
                  Salvar
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <div className="space-y-1">
                <CardTitle className="text-lg">Últimos Registros</CardTitle>
              </div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 relative">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">Nenhum registro encontrado.</p>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted/50 text-muted-foreground">
                        <tr>
                          <th className="px-4 py-3 font-medium">Data</th>
                          <th className="px-4 py-3 font-medium"><Scale className="h-4 w-4 inline mr-2 text-orange-500" />Peso (kg)</th>
                          <th className="px-4 py-3 font-medium"><TrendingUp className="h-4 w-4 inline mr-2 text-red-500" />Gordura (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {logs.slice().reverse().map((log, i) => (
                          <tr key={log.id} className="hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-4">{new Date(log.date).toLocaleDateString("pt-BR")}</td>
                            <td className="px-4 py-4 font-semibold text-foreground/80">{log.weight}</td>
                            <td className="px-4 py-4 text-foreground/80">{log.bodyFat || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
