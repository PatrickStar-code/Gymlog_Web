"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Workout, WorkoutCategory } from "@/types/workout";

interface Props {
  open: boolean;
  isEditMode: boolean;
  formData: Partial<Workout>;
  onChange: (data: Partial<Workout>) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function WorkoutFormDialog({
  open,
  isEditMode,
  formData,
  onChange,
  onSubmit,
  onClose,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Treino" : "Criar Treino"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Atualize os dados do treino"
              : "Adicione um novo treino"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nome do treino"
            value={formData.name ?? ""}
            onChange={(e) =>
              onChange({ ...formData, name: e.target.value })
            }
          />

          <select
            className="w-full rounded-lg border px-3 py-2"
            value={formData.category}
            onChange={(e) =>
              onChange({
                ...formData,
                category: e.target.value as WorkoutCategory,
              })
            }
          >
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="mobility">Mobility</option>
          </select>

          <select
            className="w-full rounded-lg border px-3 py-2"
            value={formData.difficulty}
            onChange={(e) =>
              onChange({
                ...formData,
                difficulty: e.target.value as any,
              })
            }
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <Input
            type="number"
            placeholder="Duração (min)"
            value={formData.duration ?? 0}
            onChange={(e) =>
              onChange({
                ...formData,
                duration: Number(e.target.value),
              })
            }
          />

          <div className="flex gap-2">
            <Button className="flex-1" onClick={onSubmit}>
              {isEditMode ? "Atualizar" : "Criar"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dia
