"use client";

import React, { useState, useEffect } from "react";
import { fetchApi } from "@/lib/fetchApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function FoodsIndexPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetchApi("/foods");
        if (res && res.length > 0) {
          setFoods(res);
        } else {
          // Dummy data
          setFoods([
            { id: 1, name: "Peito de Frango", serving: "100g", calories: 165, p: 31, c: 0, f: 3.6 },
            { id: 2, name: "Arroz Integral", serving: "100g", calories: 111, p: 2.6, c: 23, f: 0.9 },
            { id: 3, name: "Aveia em flocos", serving: "30g", calories: 114, p: 4.3, c: 17, f: 2.2 },
            { id: 4, name: "Ovo Cozido", serving: "1 un (50g)", calories: 78, p: 6.3, c: 0.6, f: 5.3 },
          ]);
        }
      } catch (err) {
        // Ignored
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/GymLog/diet" className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cátalogo de Alimentos</h1>
            <p className="text-muted-foreground mt-1">Busque ou cadastre novos alimentos na base.</p>
          </div>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 gap-2 text-white">
          <PlusCircle className="h-4 w-4" /> Novo Alimento
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por peito de frango, arroz..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.map((food) => (
          <Card key={food.id} className="hover:border-orange-200 transition-colors group">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
               <div>
                  <CardTitle className="text-lg">{food.name}</CardTitle>
                  <CardDescription>Porção: {food.serving}</CardDescription>
               </div>
               <div className="text-right">
                  <span className="font-bold text-orange-500">{food.calories}</span>
                  <span className="text-xs ml-1 font-medium text-muted-foreground">kcal</span>
               </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-xs font-medium border-t pt-3 mt-2">
                <div className="text-blue-600 flex flex-col items-center">
                  <span className="text-[10px] uppercase text-muted-foreground">Proteína</span>
                  <span>{food.p}g</span>
                </div>
                <div className="text-green-600 flex flex-col items-center">
                  <span className="text-[10px] uppercase text-muted-foreground">Carbs</span>
                  <span>{food.c}g</span>
                </div>
                <div className="text-yellow-600 flex flex-col items-center">
                  <span className="text-[10px] uppercase text-muted-foreground">Gordura</span>
                  <span>{food.f}g</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredFoods.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Nenhum alimento encontrado com "<span className="font-semibold">{searchTerm}</span>"
          </div>
        )}
      </div>
    </div>
  );
}
