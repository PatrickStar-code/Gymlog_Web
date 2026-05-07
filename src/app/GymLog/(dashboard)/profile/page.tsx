"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/Contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/fetchApi";
import { motion } from "framer-motion";
import { User, Mail, Activity, ArrowRight, Save } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    goal: "Hipertrofia",
    height: "175",
    weight: "75",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Optionally fetch dynamic user profile logic from /api/user/profile
    async function fetchProfile() {
      try {
        const res = await fetchApi("/users/me");
        if (res) {
          setData(prev => ({
            ...prev,
            name: res.name || prev.name,
            email: res.email || prev.email,
            goal: res.goal || prev.goal,
            height: res.height || prev.height,
            weight: res.weight || prev.weight,
          }));
        }
      } catch (e) {
        // Ignored
      }
    }
    fetchProfile();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await fetchApi("/users/me", {
        method: "PUT",
        data: data,
      });
      setMessage("Perfil atualizado com sucesso!");
    } catch (err: any) {
      setMessage("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Conta</CardTitle>
            <CardDescription>
              Atualize suas informações pessoais e objetivos físicos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" /> Nome Completo
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Endereço de Email
                  </label>
                  <input
                    type="email"
                    value={data.email}
                    disabled
                    className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm opacity-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <ArrowRight className="h-4 w-4" /> Altura (cm)
                  </label>
                  <input
                    type="number"
                    value={data.height}
                    onChange={(e) => setData({ ...data, height: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4" /> Peso Inicial (kg)
                  </label>
                  <input
                    type="number"
                    value={data.weight}
                    onChange={(e) => setData({ ...data, weight: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <Button type="submit" disabled={loading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </Button>
                {message && (
                  <span className={`text-sm ${message.includes("Erro") ? "text-red-500" : "text-green-500"}`}>
                    {message}
                  </span>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
