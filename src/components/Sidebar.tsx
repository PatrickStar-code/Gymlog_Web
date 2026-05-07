"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  LineChart,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/Contexts/AuthContext";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/GymLog/dashboard", icon: LayoutDashboard },
  { label: "Treitos", href: "/GymLog/workouts", icon: Dumbbell },
  { label: "Dieta", href: "/GymLog/diet", icon: UtensilsCrossed },
  { label: "Progresso", href: "/GymLog/progress", icon: LineChart },
  { label: "Perfil", href: "/GymLog/profile", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const content = (
    <>
      <div className="flex h-14 items-center border-b border-border/40 px-4 lg:h-[60px] lg:px-6">
        <Link href="/GymLog/dashboard" className="flex items-center gap-2 font-semibold">
          <Dumbbell className="h-6 w-6 text-primary" />
          <span className="text-lg">Gymlog</span>
        </Link>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-border/40 p-4">
        <div className="mb-4 hidden md:flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || "G"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">
              {user?.name || "Usuário"}
            </span>
            <span className="text-xs text-muted-foreground truncate">
              {user?.email || ""}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header trigger */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b border-border/40 bg-background/80 backdrop-blur z-40 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          <span className="font-semibold">Gymlog</span>
        </div>
        <button onClick={toggleSidebar} className="p-2">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm bg-background border-r border-border/40 flex flex-col md:hidden"
            >
              <div className="absolute top-2 right-2">
                <button p-2 onClick={toggleSidebar} className="p-2">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden border-r border-border/40 bg-card md:flex md:w-64 md:flex-col fixed inset-y-0 z-30">
        {content}
      </div>
    </>
  );
}
