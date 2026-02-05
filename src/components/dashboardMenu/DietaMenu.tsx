import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Aliment {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  category: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  aliments: { alimentId: string; grams: number }[];
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
}

const defaultAliments: Aliment[] = [
  {
    id: "1",
    name: "Chicken Breast",
    protein: 31,
    carbs: 0,
    fat: 3.6,
    calories: 165,
    category: "Protein",
  },
  {
    id: "2",
    name: "Brown Rice",
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    calories: 111,
    category: "Carbs",
  },
  {
    id: "3",
    name: "Broccoli",
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    calories: 34,
    category: "Vegetables",
  },
  {
    id: "4",
    name: "Salmon",
    protein: 25,
    carbs: 0,
    fat: 13,
    calories: 208,
    category: "Protein",
  },
  {
    id: "5",
    name: "Sweet Potato",
    protein: 2,
    carbs: 20,
    fat: 0.1,
    calories: 86,
    category: "Carbs",
  },
  {
    id: "6",
    name: "Avocado",
    protein: 2,
    carbs: 9,
    fat: 15,
    calories: 160,
    category: "Fats",
  },
  {
    id: "7",
    name: "Eggs",
    protein: 13,
    carbs: 1.1,
    fat: 11,
    calories: 155,
    category: "Protein",
  },
  {
    id: "8",
    name: "Oatmeal",
    protein: 5,
    carbs: 27,
    fat: 3,
    calories: 150,
    category: "Carbs",
  },
  {
    id: "9",
    name: "Spinach",
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    calories: 23,
    category: "Vegetables",
  },
  {
    id: "10",
    name: "Almonds",
    protein: 6,
    carbs: 6,
    fat: 14,
    calories: 164,
    category: "Fats",
  },
];

const defaultMeals: Meal[] = [
  {
    id: "1",
    name: "Breakfast",
    time: "08:00",
    aliments: [
      { alimentId: "7", grams: 200 },
      { alimentId: "8", grams: 100 },
      { alimentId: "10", grams: 50 },
    ],
    totalProtein: 36,
    totalCarbs: 33,
    totalFat: 29,
    totalCalories: 542,
  },
  {
    id: "2",
    name: "Lunch",
    time: "13:00",
    aliments: [
      { alimentId: "1", grams: 150 },
      { alimentId: "2", grams: 100 },
      { alimentId: "3", grams: 100 },
    ],
    totalProtein: 49.3,
    totalCarbs: 30,
    totalFat: 6.3,
    totalCalories: 376,
  },
];

const DietPlanManager: React.FC = () => {
  const [aliments] = useState<Aliment[]>(defaultAliments);
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mealFoodSearch, setMealFoodSearch] = useState("");
  const [newMeal, setNewMeal] = useState<Partial<Meal>>({
    name: "",
    time: "",
    aliments: [],
  });

  const calculateMealNutrition = (
    mealAliments: { alimentId: string; grams: number }[],
  ) => {
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalories = 0;

    mealAliments.forEach(({ alimentId, grams }) => {
      const aliment = aliments.find((a) => a.id === alimentId);
      if (aliment) {
        const multiplier = grams / 100;
        totalProtein += aliment.protein * multiplier;
        totalCarbs += aliment.carbs * multiplier;
        totalFat += aliment.fat * multiplier;
        totalCalories += aliment.calories * multiplier;
      }
    });

    return {
      totalProtein: Math.round(totalProtein * 10) / 10,
      totalCarbs: Math.round(totalCarbs * 10) / 10,
      totalFat: Math.round(totalFat * 10) / 10,
      totalCalories: Math.round(totalCalories),
    };
  };

  const handleAddMeal = () => {
    if (
      newMeal.name &&
      newMeal.time &&
      newMeal.aliments &&
      newMeal.aliments.length > 0
    ) {
      const nutrition = calculateMealNutrition(newMeal.aliments);
      const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal.name,
        time: newMeal.time,
        aliments: newMeal.aliments,
        ...nutrition,
      };
      setMeals([...meals, meal]);
      setNewMeal({ name: "", time: "", aliments: [] });
      setIsAddMealOpen(false);
    }
  };

  const handleEditMeal = () => {
    if (
      selectedMeal &&
      newMeal.name &&
      newMeal.time &&
      newMeal.aliments &&
      newMeal.aliments.length > 0
    ) {
      const nutrition = calculateMealNutrition(newMeal.aliments);
      const updatedMeal: Meal = {
        ...selectedMeal,
        name: newMeal.name,
        time: newMeal.time,
        aliments: newMeal.aliments,
        ...nutrition,
      };
      setMeals(meals.map((m) => (m.id === selectedMeal.id ? updatedMeal : m)));
      setNewMeal({ name: "", time: "", aliments: [] });
      setIsAddMealOpen(false);
      setIsEditMode(false);
      setSelectedMeal(null);
    }
  };

  const handleDeleteMeal = (id: string) => {
    setMeals(meals.filter((m) => m.id !== id));
    if (selectedMeal?.id === id) {
      setIsModalOpen(false);
      setSelectedMeal(null);
    }
  };

  const openEditModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setNewMeal({
      name: meal.name,
      time: meal.time,
      aliments: meal.aliments,
    });
    setIsEditMode(true);
    setIsAddMealOpen(true);
  };

  const openMealDetails = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const addAlimentToMeal = (alimentId: string) => {
    const existingAliment = newMeal.aliments?.find(
      (a) => a.alimentId === alimentId,
    );
    if (existingAliment) {
      setNewMeal({
        ...newMeal,
        aliments: newMeal.aliments?.map((a) =>
          a.alimentId === alimentId ? { ...a, grams: a.grams + 100 } : a,
        ),
      });
    } else {
      setNewMeal({
        ...newMeal,
        aliments: [...(newMeal.aliments || []), { alimentId, grams: 100 }],
      });
    }
  };

  const removeAlimentFromMeal = (alimentId: string) => {
    setNewMeal({
      ...newMeal,
      aliments: newMeal.aliments?.filter((a) => a.alimentId !== alimentId),
    });
  };

  const updateAlimentGrams = (alimentId: string, grams: number) => {
    if (grams <= 0) {
      removeAlimentFromMeal(alimentId);
    } else {
      setNewMeal({
        ...newMeal,
        aliments: newMeal.aliments?.map((a) =>
          a.alimentId === alimentId ? { ...a, grams } : a,
        ),
      });
    }
  };

  const filteredAliments = aliments.filter((aliment) =>
    aliment.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredMealAliments = aliments.filter((aliment) =>
    aliment.name.toLowerCase().includes(mealFoodSearch.toLowerCase()),
  );

  const totalDailyNutrition = meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.totalProtein,
      carbs: acc.carbs + meal.totalCarbs,
      fat: acc.fat + meal.totalFat,
      calories: acc.calories + meal.totalCalories,
    }),
    { protein: 0, carbs: 0, fat: 0, calories: 0 },
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total de Proteina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(totalDailyNutrition.protein)}g
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total de Carboidratos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(totalDailyNutrition.carbs)}g
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Total de Calorias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(totalDailyNutrition.calories)} kcal
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="meals" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="meals">Refeições</TabsTrigger>
            <TabsTrigger value="aliments">Alimentos</TabsTrigger>
          </TabsList>

          <TabsContent value="meals" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Suas Refeições
              </h2>
              <Button
                onClick={() => {
                  setIsAddMealOpen(true);
                  setIsEditMode(false);
                  setNewMeal({ name: "", time: "", aliments: [] });
                  setMealFoodSearch("");
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar refeição
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {meals.map((meal) => (
                <Card
                  key={meal.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div
                        className="flex-1"
                        onClick={() => openMealDetails(meal)}
                      >
                        <CardTitle>{meal.name}</CardTitle>
                        <CardDescription>{meal.time}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(meal)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMeal(meal.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent onClick={() => openMealDetails(meal)}>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Proteina:</span>
                        <span className="ml-2 font-semibold">
                          {meal.totalProtein}g
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Carboidratos:
                        </span>
                        <span className="ml-2 font-semibold">
                          {meal.totalCarbs}g
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gordura:</span>
                        <span className="ml-2 font-semibold">
                          {meal.totalFat}g
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Calorias:</span>
                        <span className="ml-2 font-semibold">
                          {meal.totalCalories}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Badge variant="secondary">
                        {meal.aliments.length} items
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="aliments" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Alimentos Disponiveis
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Procurar Alimentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAliments.map((aliment) => (
                <Card key={aliment.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{aliment.name}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {aliment.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Proteina:</span>
                        <span className="font-medium">{aliment.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Carboidratos:
                        </span>
                        <span className="font-medium">{aliment.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gordura:</span>
                        <span className="font-medium">{aliment.fat}g</span>
                      </div>
                      <div className="flex justify-between border-t pt-1 mt-2">
                        <span className="text-muted-foreground">Calorias:</span>
                        <span className="font-semibold">
                          {aliment.calories} kcal
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMeal?.name}</DialogTitle>
            <DialogDescription>Time: {selectedMeal?.time}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {selectedMeal?.totalProtein}g
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Proteina
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {selectedMeal?.totalCarbs}g
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Carboidratos
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {selectedMeal?.totalFat}g
                    </div>
                    <div className="text-sm text-muted-foreground">Gordura</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {selectedMeal?.totalCalories}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Calorias
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-3">
                  {selectedMeal?.aliments.map(({ alimentId, grams }) => {
                    const aliment = aliments.find((a) => a.id === alimentId);
                    if (!aliment) return null;
                    const multiplier = grams / 100;
                    return (
                      <Card key={alimentId}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold">{aliment.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Amount: {grams}g
                              </p>
                            </div>
                            <Badge>{aliment.category}</Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-sm">
                            <div>
                              <div className="text-muted-foreground">
                                Protein
                              </div>
                              <div className="font-medium">
                                {Math.round(aliment.protein * multiplier * 10) /
                                  10}
                                g
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Carbs</div>
                              <div className="font-medium">
                                {Math.round(aliment.carbs * multiplier * 10) /
                                  10}
                                g
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Fat</div>
                              <div className="font-medium">
                                {Math.round(aliment.fat * multiplier * 10) / 10}
                                g
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">
                                Calories
                              </div>
                              <div className="font-medium">
                                {Math.round(aliment.calories * multiplier)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddMealOpen} onOpenChange={setIsAddMealOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Meal" : "Add New Meal"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update your meal details"
                : "Create a new meal for your diet plan"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="meal-name">Nome da Refeição</Label>
                <Input
                  id="meal-name"
                  placeholder="e.g., Breakfast"
                  value={newMeal.name || ""}
                  onChange={(e) =>
                    setNewMeal({ ...newMeal, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="meal-time">Time</Label>
                <Input
                  id="meal-time"
                  type="time"
                  value={newMeal.time || ""}
                  onChange={(e) =>
                    setNewMeal({ ...newMeal, time: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Adicionar Alimento</h3>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar alimento para Adicionar..."
                  value={mealFoodSearch}
                  onChange={(e) => setMealFoodSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ScrollArea className="h-[200px] border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredMealAliments.map((aliment) => (
                    <div
                      key={aliment.id}
                      className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => addAlimentToMeal(aliment.id)}
                    >
                      <div>
                        <div className="font-medium">{aliment.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {aliment.calories} kcal
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {newMeal.aliments && newMeal.aliments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Alimentos Selecionados:
                </h3>
                <div className="space-y-2">
                  {newMeal.aliments.map(({ alimentId, grams }) => {
                    const aliment = aliments.find((a) => a.id === alimentId);
                    if (!aliment) return null;
                    const multiplier = grams / 100;
                    return (
                      <div
                        key={alimentId}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{aliment.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round(aliment.calories * multiplier)} kcal
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateAlimentGrams(alimentId, grams - 50)
                            }
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={grams}
                            onChange={(e) =>
                              updateAlimentGrams(
                                alimentId,
                                parseFloat(e.target.value) || 0,
                              )
                            }
                            className="w-20 text-center"
                            step="10"
                            min="0"
                          />
                          <span className="text-sm text-muted-foreground">
                            g
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateAlimentGrams(alimentId, grams + 50)
                            }
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeAlimentFromMeal(alimentId)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddMealOpen(false);
                  setIsEditMode(false);
                  setMealFoodSearch("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={isEditMode ? handleEditMeal : handleAddMeal}>
                {isEditMode ? "Update Meal" : "Add Meal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DietPlanManager;
