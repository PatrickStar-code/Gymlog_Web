"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Workout } from "@/types/workout";
import { Edit2, Trash2 } from "lucide-react";

interface Props {
  workout: Workout | null;
  onClose: () => void;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

export function WorkoutDetailsDialog({
  workout,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Dialog open={!!workout} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        {workout && (
          <>
            <DialogHeader>
              <DialogTitle>{workout.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p>Duração: {workout.duration} min</p>
              <p>Exercícios: {workout.exercises.length}</p>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => onEdit(workout)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => onDelete(workout.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
