"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Settings,
  LogOut,
  ChevronLeft,
  Activity,
  Target,
  Flame,
  Clock,
  CheckCircle2,
  Plus,
  Award,
} from "lucide-react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import TreinosMenu from "@/components/dashboardMenu/TreinosMenu";
import DietaMenu from "@/components/dashboardMenu/DietaMenu";
import ConfigMenu from "@/components/dashboardMenu/ConfigMenu";
// Types
interface Metric {
  label: string;
  value: string;
  trend: number;
  unit?: string;
}

interface Goal {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface Exercise {
  iconSrc: string;
  name: string;
  detail: string;
}

interface StatCardData {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<{ className?: string }>;
  chartData: { name: string; uv: number }[];
}

// Custom Tooltip for Charts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background/80 p-2 text-sm shadow-md backdrop-blur-sm">
        <p className="text-foreground">{`Valor: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  chartData,
}: StatCardData) {
  const chartColor = changeType === "positive" ? "#4ade80" : "#f87171";

  return (
    <div className="group rounded-2xl border border-border bg-card p-5 shadow-lg transition-all duration-300 ease-in-out hover:border-border/80 hover:bg-card/80 transform hover:-translate-y-1 cursor-pointer">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div className="flex flex-col">
          <p className="text-3xl font-bold tracking-tighter text-foreground">
            {value}
          </p>
          <p
            className={`mt-1 text-xs ${
              changeType === "positive" ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </p>
        </div>
        <div className="h-12 w-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id={`colorUv-${title}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "rgba(255,255,255,0.1)",
                  strokeWidth: 1,
                  strokeDasharray: "3 3",
                }}
              />
              <Line
                type="monotone"
                dataKey="uv"
                stroke={chartColor}
                strokeWidth={2}
                dot={false}
                fillOpacity={1}
                fill={`url(#colorUv-${title})`}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Activity Card Component
function ActivityCard({
  metrics = [],
  dailyGoals = [],
  onAddGoal,
  onToggleGoal,
}: {
  metrics?: Metric[];
  dailyGoals?: Goal[];
  onAddGoal?: () => void;
  onToggleGoal?: (goalId: string) => void;
}) {
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const METRIC_COLORS: Record<string, string> = {
    Calorias: "#FF2D55",
    Exercício: "#2CD758",
    Água: "#007AFF",
  };

  return (
    <div className="relative h-full rounded-3xl p-6 bg-card border border-border hover:border-border/80 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-muted">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Progresso de Hoje
          </h3>
          <p className="text-sm text-muted-foreground">Atividade</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovering(metric.label)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div
                className={cn(
                  "absolute inset-0 rounded-full border-4 transition-all duration-500",
                  isHovering === metric.label && "scale-105",
                )}
                style={{
                  borderColor: METRIC_COLORS[metric.label] || "#007AFF",
                  clipPath: `polygon(0 0, 100% 0, 100% ${metric.trend}%, 0 ${metric.trend}%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-foreground">
                  {metric.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {metric.unit}
                </span>
              </div>
            </div>
            <span className="mt-3 text-sm font-medium text-foreground">
              {metric.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {metric.trend}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Target className="w-4 h-4" />
              Metas de Hoje
            </h4>
            <button
              title="button to add Goal"
              type="button"
              onClick={onAddGoal}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-2">
            {dailyGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => onToggleGoal?.(goal.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50 hover:border-border transition-all",
                )}
              >
                <CheckCircle2
                  className={cn(
                    "w-5 h-5",
                    goal.isCompleted
                      ? "text-emerald-500"
                      : "text-muted-foreground",
                  )}
                />
                <span
                  className={cn(
                    "text-sm text-left",
                    goal.isCompleted
                      ? "text-muted-foreground line-through"
                      : "text-foreground",
                  )}
                >
                  {goal.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Workout Card Component
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 },
  },
};

function WorkoutCard({
  date,
  sessionTitle,
  sessionDuration,
  exercises,
}: {
  date: string;
  sessionTitle: string;
  sessionDuration: number;
  exercises: Exercise[];
}) {
  return (
    <div className="w-full rounded-3xl bg-muted p-2.5">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground">{date}</p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Treino do Dia
        </h2>
      </div>
      <div className="mt-4 w-full rounded-2xl bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">{sessionTitle}</h3>
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{sessionDuration} min</span>
          </div>
        </div>
        <motion.ul
          className="mt-6 space-y-3"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {exercises.map((exercise, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-4 rounded-xl bg-muted p-4"
              variants={itemVariants}
            >
              <div className="flex h-10 w-10  items-center justify-center rounded-full">
                <Image
                  width={40}
                  height={40}
                  src={exercise.iconSrc}
                  alt={`${exercise.name} icon`}
                  className="h-10 w-10"
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">
                  {exercise.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

// Pricing Card Component
// function PricingCard({
//   title,
//   price,
//   description,
//   features,
//   highlight = false,
// }: {
//   title: string;
//   price: string;
//   description: string;
//   features: string[];
//   highlight?: boolean;
// }) {
//   return (
//     <div
//       className={`flex flex-col justify-between p-6 space-y-4 ${
//         highlight
//           ? "bg-secondary rounded-xl w-full md:w-1/2 space-y-8"
//           : "flex-1"
//       }`}
//     >
//       <div className={highlight ? "grid gap-6 sm:grid-cols-2" : ""}>
//         <div className="space-y-4">
//           <div>
//             <h2 className="font-medium text-foreground">{title}</h2>
//             <span className="my-3 block text-2xl font-semibold text-foreground">
//               {price}
//             </span>
//             <p className="text-muted-foreground text-sm">{description}</p>
//           </div>
//           <Button
//             className="w-full"
//             variant={highlight ? "default" : "outline"}
//           >
//             Começar Agora
//           </Button>
//         </div>
//       </div>
//       {highlight && (
//         <div className="text-sm font-medium text-foreground">
//           Tudo do Grátis, mais:
//         </div>
//       )}
//       <ul
//         className={`${
//           highlight ? "mt-4" : "border-t border-border pt-4"
//         } list-outside space-y-3 text-sm`}
//       >
//         {features.map((item, index) => (
//           <li key={index} className="flex items-center gap-2 text-foreground">
//             <CheckCircle2 className="w-4 h-4 text-primary" />
//             {item}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// Main Dashboard Component
function GymLogDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "30min de Yoga Matinal", isCompleted: true },
    { id: "2", title: "Beber 2L de Água", isCompleted: false },
    { id: "3", title: "Completar Treino de Força", isCompleted: false },
  ]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Workout>>({});

  const handleCreate = () => {
  setFormData({});
  setIsEditMode(false);
  setIsCreateOpen(true);
};

const handleEdit = (workout: Workout) => {
  setSelectedWorkout(workout);
  setFormData(workout);
  setIsEditMode(true);
};

const handleCloseDialogs = () => {
  setIsCreateOpen(false);
  setIsEditMode(false);
  setSelectedWorkout(null);
};


  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
    { name: "Treinos", icon: Dumbbell, href: "#treinos" },
    { name: "Dieta", icon: UtensilsCrossed, href: "#dieta" },
    { name: "Configurações", icon: Settings, href: "#config" },
    { name: "Sair", icon: LogOut, href: "#sair" },
  ];

  const analyticsData: StatCardData[] = [
    {
      title: "Calorias Queimadas",
      value: "2,450",
      change: "+12.5%",
      changeType: "positive",
      icon: Flame,
      chartData: [
        { name: "Seg", uv: 2100 },
        { name: "Ter", uv: 2300 },
        { name: "Qua", uv: 2000 },
        { name: "Qui", uv: 2450 },
        { name: "Sex", uv: 2200 },
        { name: "Sáb", uv: 2600 },
        { name: "Dom", uv: 2450 },
      ],
    },
    {
      title: "Treinos Completos",
      value: "18",
      change: "+25%",
      changeType: "positive",
      icon: Dumbbell,
      chartData: [
        { name: "Seg", uv: 12 },
        { name: "Ter", uv: 14 },
        { name: "Qua", uv: 13 },
        { name: "Qui", uv: 16 },
        { name: "Sex", uv: 15 },
        { name: "Sáb", uv: 17 },
        { name: "Dom", uv: 18 },
      ],
    },
    {
      title: "Tempo de Treino",
      value: "8.5h",
      change: "+8%",
      changeType: "positive",
      icon: Clock,
      chartData: [
        { name: "Seg", uv: 7 },
        { name: "Ter", uv: 8 },
        { name: "Qua", uv: 7.5 },
        { name: "Qui", uv: 9 },
        { name: "Sex", uv: 8 },
        { name: "Sáb", uv: 8.5 },
        { name: "Dom", uv: 8.5 },
      ],
    },
    {
      title: "Metas Atingidas",
      value: "24",
      change: "+15%",
      changeType: "positive",
      icon: Award,
      chartData: [
        { name: "Seg", uv: 18 },
        { name: "Ter", uv: 20 },
        { name: "Qua", uv: 19 },
        { name: "Qui", uv: 22 },
        { name: "Sex", uv: 21 },
        { name: "Sáb", uv: 23 },
        { name: "Dom", uv: 24 },
      ],
    },
  ];

  const metrics: Metric[] = [
    { label: "Calorias", value: "420", trend: 85, unit: "kcal" },
    { label: "Exercício", value: "35", trend: 70, unit: "min" },
    { label: "Água", value: "1.5", trend: 75, unit: "L" },
  ];

  const exercises: Exercise[] = [
    {
      iconSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ZZfiEQIFOGeqPmFDkIYdNbWbSwhGOy.png&w=320&q=75",
      name: "Agachamento",
      detail: "4 séries x 12 reps",
    },
    {
      iconSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-GM1g71NpPRRnefhKHqhn5fqHXV709G.png&w=320&q=75",
      name: "Supino",
      detail: "3 séries x 10 reps",
    },
    {
      iconSrc:
        "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-rYlgXFYWRAgTR7Ui67Hvg1honG39aV.png&w=320&q=75",
      name: "Remada",
      detail: "3 séries x 12 reps",
    },
  ];

  const handleToggleGoal = (goalId: string) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, isCompleted: !goal.isCompleted } : goal,
      ),
    );
  };

  const handleAddGoal = () => {
    const newGoal: Goal = {
      id: `goal-${goals.length + 1}`,
      title: `Nova Meta ${goals.length + 1}`,
      isCompleted: false,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const render = {
    Treinos: <TreinosMenu />,
    Dieta: <DietaMenu />,
    Configurações: <ConfigMenu />,
  };

  const renderContent = () => {
    if (activeItem === "Dashboard") {
      return (
        <div className="space-y-8">
          <header className="flex items-center justify-between pb-6 border-b border-border">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Bem-vindo! Aqui está seu resumo de desempenho.
              </p>
            </div>
            <Button className="mr-20">Gerar Relatório</Button>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {analyticsData.map((data) => (
              <StatCard key={data.title} {...data} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityCard
              metrics={metrics}
              dailyGoals={goals}
              onAddGoal={handleAddGoal}
              onToggleGoal={handleToggleGoal}
            />
            <WorkoutCard
              date="Qua Jul 17"
              sessionTitle="Treino de Força"
              sessionDuration={45}
              exercises={exercises}
            />
          </div>
        </div>
      );
    }

    if (
      activeItem === "Treinos" ||
      activeItem === "Dieta" ||
      activeItem === "Configurações"
    ) {
      return (
        <div className="space-y-8">
          <header className="pb-6 border-b border-border">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {activeItem}
            </h1>
            {activeItem && activeItem !== "Configurações" && (
              <p className="mt-1 text-sm text-muted-foreground">
                Gerencie seus {activeItem.toLowerCase()} com IA
              </p>
            )}
          </header>
          <div className=" rounded-xl shadow-lg p-8 border border-border">
            {render[activeItem]}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative min-h-screen bg-background">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-card border-r border-border transition-all duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          isCollapsed ? "lg:w-20" : "lg:w-64"
        } w-64 shadow-2xl`}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-foreground tracking-wide">
                GymLog AI
              </h1>
            )}
          </div>
          <button
            title="button to open sideBar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:block p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <ChevronLeft
              size={20}
              className={`transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                {!isCollapsed && (
                  <span className="font-medium transition-colors duration-200">
                    {item.name}
                  </span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full opacity-80" />
                )}
              </button>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 px-4 py-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">
                  JD
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  João Silva
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  joao@exemplo.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <div className="p-8 ml-16 lg:ml-0">{renderContent()}</div>
      </div>
    </div>
  );
}

export default GymLogDashboard;
