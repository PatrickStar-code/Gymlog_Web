import React, { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Dumbbell,
  Heart,
  Activity,
  Clock,
  Target,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
}

interface Workout {
  id: string;
  name: string;
  category: "strength" | "cardio" | "mobility";
  duration: number;
  exercises: Exercise[];
  description: string;
  createdAt: string;
}

const WorkoutDashboard: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "1",
      name: "Upper Body Strength",
      category: "strength",
      duration: 45,
      description: "Focus on chest, back, and arms",
      createdAt: "2024-01-15",
      exercises: [
        { id: "e1", name: "Bench Press", sets: 4, reps: 10, rest: 90 },
        { id: "e2", name: "Pull-ups", sets: 3, reps: 12, rest: 60 },
        { id: "e3", name: "Dumbbell Rows", sets: 4, reps: 10, rest: 60 },
      ],
    },
    {
      id: "2",
      name: "HIIT Cardio",
      category: "cardio",
      duration: 30,
      description: "High intensity interval training",
      createdAt: "2024-01-14",
      exercises: [
        { id: "e4", name: "Burpees", sets: 5, reps: 15, rest: 30 },
        { id: "e5", name: "Mountain Climbers", sets: 5, reps: 20, rest: 30 },
        { id: "e6", name: "Jump Squats", sets: 5, reps: 15, rest: 30 },
      ],
    },
    {
      id: "3",
      name: "Yoga Flow",
      category: "mobility",
      duration: 60,
      description: "Full body stretching and mobility",
      createdAt: "2024-01-13",
      exercises: [
        { id: "e7", name: "Sun Salutation", sets: 3, reps: 5, rest: 0 },
        { id: "e8", name: "Warrior Pose", sets: 2, reps: 10, rest: 15 },
        { id: "e9", name: "Pigeon Pose", sets: 2, reps: 5, rest: 15 },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Workout>>({
    name: "",
    category: "strength",
    duration: 30,
    description: "",
    exercises: [],
  });

  const [exerciseForm, setExerciseForm] = useState<Partial<Exercise>>({
    name: "",
    sets: 3,
    reps: 10,
    rest: 60,
  });

  const categoryIcons = {
    strength: Dumbbell,
    cardio: Heart,
    mobility: Activity,
  };

  const categoryColors = {
    strength: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    cardio: "bg-red-500/10 text-red-500 border-red-500/20",
    mobility: "bg-green-500/10 text-green-500 border-green-500/20",
  };

  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch =
      workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || workout.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateWorkout = () => {
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: formData.name || "New Workout",
      category: formData.category || "strength",
      duration: formData.duration || 30,
      description: formData.description || "",
      exercises: formData.exercises || [],
      createdAt: new Date().toISOString().split("T")[0],
    };
    setWorkouts([...workouts, newWorkout]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditWorkout = () => {
    if (!selectedWorkout) return;
    setWorkouts(
      workouts.map((w) =>
        w.id === selectedWorkout.id ? { ...selectedWorkout, ...formData } : w,
      ),
    );
    setIsEditDialogOpen(false);
    setSelectedWorkout(null);
    resetForm();
  };

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "strength",
      duration: 30,
      description: "",
      exercises: [],
    });
    setExerciseForm({
      name: "",
      sets: 3,
      reps: 10,
      rest: 60,
    });
  };

  const addExerciseToForm = () => {
    if (!exerciseForm.name) return;
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseForm.name,
      sets: exerciseForm.sets || 3,
      reps: exerciseForm.reps || 10,
      rest: exerciseForm.rest || 60,
    };
    setFormData({
      ...formData,
      exercises: [...(formData.exercises || []), newExercise],
    });
    setExerciseForm({
      name: "",
      sets: 3,
      reps: 10,
      rest: 60,
    });
  };

  const removeExerciseFromForm = (id: string) => {
    setFormData({
      ...formData,
      exercises: (formData.exercises || []).filter((e) => e.id !== id),
    });
  };

  const openEditDialog = (workout: Workout) => {
    setSelectedWorkout(workout);
    setFormData({
      name: workout.name,
      category: workout.category,
      duration: workout.duration,
      description: workout.description,
      exercises: workout.exercises,
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsViewDialogOpen(true);
  };

  const stats = {
    total: workouts.length,
    strenght: workouts.filter((w) => w.category === "strength").length,
    cardio: workouts.filter((w) => w.category === "cardio").length,
    mobility: workouts.filter((w) => w.category === "mobility").length,
  };

  return (
    <div className=" bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-muted-foreground mt-1">
              Organize e acompanhe suas rotinas de exercícios.
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Crie seu Treino
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crie um Novo Treino</DialogTitle>
                <DialogDescription>
                  Adicione um novo treino a sua lista
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Treino</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Treino de Força"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(
                        value: "strength" | "cardio" | "mobility",
                      ) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Força</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="mobility">Mobilidade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva seu treino..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exercícios</Label>
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Nome do exercicio"
                        value={exerciseForm.name}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            name: e.target.value,
                          })
                        }
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          type="number"
                          placeholder="Sets"
                          value={exerciseForm.sets}
                          onChange={(e) =>
                            setExerciseForm({
                              ...exerciseForm,
                              sets: parseInt(e.target.value),
                            })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Reps"
                          value={exerciseForm.reps}
                          onChange={(e) =>
                            setExerciseForm({
                              ...exerciseForm,
                              reps: parseInt(e.target.value),
                            })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Descanço"
                          value={exerciseForm.rest}
                          onChange={(e) =>
                            setExerciseForm({
                              ...exerciseForm,
                              rest: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExerciseToForm}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Exercício
                    </Button>
                    {formData.exercises && formData.exercises.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {formData.exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="flex items-center justify-between bg-muted p-2 rounded"
                          >
                            <span className="text-sm">
                              {exercise.name} - {exercise.sets}x{exercise.reps}{" "}
                              ({exercise.rest}s descanço)
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                removeExerciseFromForm(exercise.id)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateWorkout}>Criar Treino</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Treinos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Força
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {stats.strenght}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cardio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {stats.cardio}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mobilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {stats.mobility}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar Treinos..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full md:w-auto"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="strength">Força</TabsTrigger>
                  <TabsTrigger value="cardio">Cardio</TabsTrigger>
                  <TabsTrigger value="mobility">Mobilidade</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkouts.map((workout) => {
            const Icon = categoryIcons[workout.category];
            return (
              <Card
                key={workout.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openViewDialog(workout)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg ${categoryColors[workout.category]}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {workout.name}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {workout.description}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(workout);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteWorkout(workout.id);
                          }}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>{workout.exercises.length} Exercícios</span>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={categoryColors[workout.category]}
                    >
                      {workout.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredWorkouts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum treino Encontrando
              </h3>
              <p className="text-muted-foreground">
                Tente ajustar o filtro de pesquisa
              </p>
            </CardContent>
          </Card>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edite o seu Treino</DialogTitle>
              <DialogDescription>
                Atualize os detalhes do seu treino
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome do treino</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(
                      value: "strength" | "cardio" | "mobility",
                    ) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">Força</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="mobility">Mobilidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duração (minutos)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Exercícios</Label>
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Nome do exercício"
                      value={exerciseForm.name}
                      onChange={(e) =>
                        setExerciseForm({
                          ...exerciseForm,
                          name: e.target.value,
                        })
                      }
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        placeholder="Sets"
                        value={exerciseForm.sets}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            sets: parseInt(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Reps"
                        value={exerciseForm.reps}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            reps: parseInt(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Descanço"
                        value={exerciseForm.rest}
                        onChange={(e) =>
                          setExerciseForm({
                            ...exerciseForm,
                            rest: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addExerciseToForm}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicione o Exercício
                  </Button>
                  {formData.exercises && formData.exercises.length > 0 && (
                    <div className="space-y-2 mt-3">
                      {formData.exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="flex items-center justify-between bg-muted p-2 rounded"
                        >
                          <span className="text-sm">
                            {exercise.name} - {exercise.sets}x{exercise.reps} (
                            {exercise.rest}s descanço)
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExerciseFromForm(exercise.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditWorkout}>Salvar Mudanças</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedWorkout && (
                  <>
                    {React.createElement(
                      categoryIcons[selectedWorkout.category],
                      { className: "h-5 w-5" },
                    )}
                    {selectedWorkout.name}
                  </>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedWorkout?.description}
              </DialogDescription>
            </DialogHeader>
            {selectedWorkout && (
              <div className="space-y-4 py-4">
                <div className="flex gap-4">
                  <Badge
                    variant="outline"
                    className={categoryColors[selectedWorkout.category]}
                  >
                    {selectedWorkout.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedWorkout.duration} minutos</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Exercícios</h4>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                      {selectedWorkout.exercises.map((exercise, index) => (
                        <Card key={exercise.id}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">
                                  {index + 1}. {exercise.name}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                  {exercise.sets} sets × {exercise.reps} reps
                                </div>
                              </div>
                              <Badge variant="secondary">
                                {exercise.rest}s descanço
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  if (selectedWorkout) {
                    setIsViewDialogOpen(false);
                    openEditDialog(selectedWorkout);
                  }
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar treino
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default WorkoutDashboard;
