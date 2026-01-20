export type WorkoutCategory = "strength" | "cardio" | "mobility" | "all";

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
  rest?: number;
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
