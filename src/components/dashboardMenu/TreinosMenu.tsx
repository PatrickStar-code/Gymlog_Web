"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  Dumbbell,
  Heart,
  Zap,
  Clock,
  Calendar,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

// ======================
// Types
// ======================
export type WorkoutCategory = "strength" | "cardio" | "mobility" | "all";

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
}

export interface Workout {
  id: string;
  name: string;
  category: WorkoutCategory;
  exercises: Exercise[];
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  createdAt: string;
  lastPerformed?: string;
}

// ======================
// Props
// ======================
interface TreinosMenuProps {
  onCreate: () => void;
  onView: (workout: Workout) => void;
  onEdit: (workout: Workout) => void;
  onDelete?: (id: string) => void;
}

// ======================
// Mock Data (pode remover depois)
// ======================
const initialWorkouts: Workout[] = [
  {
    id: "1",
    name: "Full Body Strength",
    category: "strength",
    exercises: [
      { id: "e1", name: "Squats", sets: 4, reps: 12 },
      { id: "e2", name: "Bench Press", sets: 4, reps: 10 },
    ],
    duration: 60,
    difficulty: "intermediate",
    createdAt: "2024-01-15",
    lastPerformed: "2024-01-20",
  },
  {
    id: "2",
    name: "HIIT Cardio",
    category: "cardio",
    exercises: [{ id: "e3", name: "Burpees", duration: 30 }],
    duration: 30,
    difficulty: "advanced",
    createdAt: "2024-01-10",
  },
];

// ======================
// UI Helpers
// ======================
const categoryColors = {
  strength: "bg-blue-100 text-blue-700",
  cardio: "bg-red-100 text-red-700",
  mobility: "bg-green-100 text-green-700",
};

const difficultyColors = {
  beginner: "bg-emerald-100 text-emerald-700",
  intermediate: "bg-amber-100 text-amber-700",
  advanced: "bg-rose-100 text-rose-700",
};

// ======================
// Component
// ======================
export default function TreinosMenu({
  onCreate,
  onView,
  onEdit,
  onDelete,
}: TreinosMenuProps) {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<WorkoutCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // ======================
  // Filters
  // ======================
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || workout.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ======================
  // Render
  // ======================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Treino
        </Button>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            Lista
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ml-2" />
          <Input
            placeholder="    Buscar treinos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {(["all", "strength", "cardio", "mobility"] as WorkoutCategory[]).map(
            (cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.toUpperCase()}
              </Button>
            ),
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredWorkouts.map((workout) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-lg">{workout.name}</h3>
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge className={categoryColors[workout.category]}>
                        {workout.category}
                      </Badge>
                      <Badge className={difficultyColors[workout.difficulty]}>
                        {workout.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      {workout.duration} min
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      {workout.exercises.length} exercícios
                    </div>

                    {workout.lastPerformed && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        {workout.lastPerformed}
                      </div>
                    )}

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => onView(workout)}
                      >
                        Ver
                      </Button>
                      <Button variant="outline" onClick={() => onEdit(workout)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          onDelete
                            ? onDelete(workout.id)
                            : setWorkouts((prev) =>
                                prev.filter((w) => w.id !== workout.id),
                              )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredWorkouts.map((workout) => (
                <TableRow key={workout.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{workout.name}</TableCell>
                  <TableCell>
                    <Badge className={categoryColors[workout.category]}>
                      {workout.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={difficultyColors[workout.difficulty]}>
                      {workout.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{workout.duration} min</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onView(workout)}
                    >
                      👁
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onEdit(workout)}
                    >
                      ✏️
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        onDelete
                          ? onDelete(workout.id)
                          : setWorkouts((prev) =>
                              prev.filter((w) => w.id !== workout.id),
                            )
                      }
                    >
                      🗑
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
