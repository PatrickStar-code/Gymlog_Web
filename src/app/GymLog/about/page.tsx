/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Menu,
  X,
  Dumbbell,
  Apple,
  Brain,
  TrendingUp,
  Calendar,
  Users,
  Check,
  ChevronDown,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

// Smooth scroll function
function smoothScrollTo(elementId: string) {
  const element = document.querySelector(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Testimonial Card Component
export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        " from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-xs sm:max-w-xs",
        "transition-colors duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">{author.name}</h3>
          <p className="text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">{text}</p>
    </Card>
  );
}

// Animated Group Component
type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

function AnimatedGroup({ children, className, variants }: AnimatedGroupProps) {
  const defaultContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const defaultItemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = variants?.container || defaultContainerVariants;
  const itemVariants = variants?.item || defaultItemVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Logo Component
const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Dumbbell className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold">GymLog</span>
    </div>
  );
};

// Header Component
const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Preço", href: "#pricing" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 group"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <a
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => smoothScrollTo(item.href)}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                    >
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <button
                        onClick={() => {
                          smoothScrollTo(item.href);
                          setMenuState(false);
                        }}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                      >
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  onClick={() => smoothScrollTo("#pricing")}
                  size="sm"
                  className={cn(isScrolled ? "lg:inline-flex" : "lg:flex")}
                >
                  <span>Comece Agora!</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  const transitionVariants: {
    item: Variants;
  } = {
    item: {
      hidden: {
        opacity: 0,
        filter: "blur(12px)",
        y: 12,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
          type: "spring" as const,
          bounce: 0.3,
          duration: 1.5,
        },
      },
    },
  };

  return (
    <section className="relative pt-24 md:pt-36 overflow-hidden min-h-screen flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-background to-background" />
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
          <AnimatedGroup variants={transitionVariants}>
            <motion.button
              onClick={() => smoothScrollTo("#features")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:bg-background dark:hover:border-t-border bg-linear-to-r from-primary/10 to-purple-500/10 group mx-auto flex w-fit items-center gap-4 rounded-full border border-primary/20 p-1 pl-4 shadow-lg shadow-primary/20 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <span className="text-foreground text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI-Powered Workout & Diet Manager
              </span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-primary/50 dark:bg-zinc-700"></span>
              <div className="bg-background group-hover:bg-primary/10 size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                </div>
              </div>
            </motion.button>

            <motion.h1
              className="mt-8 max-w-5xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[6rem] font-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Transforme sua{" "}
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                  Jornada Fitness
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-primary to-orange-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>{" "}
              com GymLog
            </motion.h1>
            <p className="mx-auto mt-8 max-w-6xl text-balance text-xl text-muted-foreground leading-relaxed">
              Monitore seus treinos, gerencie sua dieta e receba planos de
              treinamento personalizados com inteligência artificial. Tudo o que
              você precisa para alcançar seus objetivos de condicionamento
              físico em uma única plataforma.
            </p>
          </AnimatedGroup>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

// Proof Section (Logo Cloud)
const ProofSection = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm text-muted-foreground mb-8">
          Aprovado por entusiastas do fitness em todo o mundo.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
          <div className="text-2xl font-bold">10K+</div>
          <div className="text-muted-foreground">Usuários Ativos</div>
          <div className="text-2xl font-bold">50K+</div>
          <div className="text-muted-foreground">Treinos Registrados</div>
          <div className="text-2xl font-bold">4.9★</div>
          <div className="text-muted-foreground">Nota pelos Usuários</div>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Dumbbell className="h-6 w-6" />,
      title: "Acompanhamento de Treinos",
      description:
        "Registre seus exercícios, séries, repetições e cargas. Acompanhe seu progresso ao longo do tempo com análises detalhadas.",
    },
    {
      icon: <Apple className="h-6 w-6" />,
      title: "Gestão de Dieta",
      description:
        "Planeje suas refeições, acompanhe calorias e macronutrientes. Receba recomendações nutricionais personalizadas.",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Tutor com IA",
      description:
        "Receba planos de treino personalizados gerados por IA com base em seus objetivos, experiência e equipamentos disponíveis.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Análise de Progresso",
      description:
        "Visualize sua jornada fitness com gráficos completos e insights detalhados.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Agendamento Inteligente",
      description:
        "Planeje seus treinos com antecedência e receba lembretes para manter a consistência.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Suporte da Comunidade",
      description:
        "Conecte-se com outros entusiastas do fitness, compartilhe seu progresso e mantenha-se motivado.",
    },
  ];

  return (
    <section
      id="features"
      className="dark:bg-muted/25 bg-zinc-50 py-16 md:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tudo que você precisa para o sucesso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades poderosas concebidas para o ajudar a atingir os seus
            objetivos de fitness mais rapidamente.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {feature.icon}
                    </motion.div>
                    {/* <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>  */}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const plans = [
    {
      name: "Gratuito",
      price: "$0",
      period: "para sempre",
      features: [
        "Acompanhamento básico de treinos",
        "Registro limitado de dieta",
        "Acesso à comunidade",
        "Acesso ao aplicativo móvel",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "por mês",
      features: [
        "Acompanhamento ilimitado de treinos",
        "Gerenciamento completo de dieta",
        "Gerador de treinos com IA",
        "Análises avançadas",
        "Suporte prioritário",
        "Planos de refeições personalizados",
      ],
      popular: true,
    },
    {
      name: "Equipe",
      price: "$29.99",
      period: "por mês",
      features: [
        "Tudo do plano Pro",
        "Até 5 membros da equipe",
        "Planos de treino compartilhados",
        "Acompanhamento do progresso da equipe",
        "Gerente de conta dedicado",
        "Integrações personalizadas",
      ],
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-16 md:py-32 relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Simples, Transparente{" "}
            <span className="bg-linear-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              Preços
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta às suas necessidades. Todos os
            planos incluem um período de teste gratuito de 14 dias.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                type: "spring",
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              {plan.popular && (
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-purple-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-300"></div>
              )}
              <Card
                className={cn(
                  "relative h-full transition-all duration-300",
                  plan.popular
                    ? "border-primary shadow-2xl shadow-primary/20"
                    : "hover:shadow-xl",
                  hoveredIndex === index &&
                    !plan.popular &&
                    "border-primary/50 shadow-lg",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <motion.span
                      className="bg-linear-to-r from-primary to-orange-600 text-primary-foreground px-6 py-1.5 rounded-full text-sm font-bold shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Mais Popular
                    </motion.span>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <motion.span
                      className="text-5xl font-black bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                      animate={
                        hoveredIndex === index ? { scale: 1.1 } : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {plan.price}
                    </motion.span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      /{plan.period}
                    </span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  ></motion.div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    href?: string;
  }>;
  className?: string;
}

function TestimonialsSection({
  title,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-0 scroll-mt-20",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center sm:gap-16">
        <motion.div
          className="flex flex-col items-center gap-4 px-4 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-2">
            <Users className="h-3 w-3 mr-1" />
            Depoimentos
          </Badge>
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl"></p>
        </motion.div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] gap-[(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around gap-[(--gap)] animate-marquee flex-row group-hover:paused]">
              {[...Array(4)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard key={`${setIndex}-${i}`} {...testimonial} />
                )),
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-linear-to-r from-background sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-background sm:block" />
        </div>
      </div>
    </section>
  );
}

// FAQ Section
const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      question: "Como funciona o gerador de treinos com IA?",
      answer:
        "Nossa IA analisa seu nível de condicionamento físico, objetivos, equipamentos disponíveis e preferências para criar planos de treino personalizados. Ela se adapta com base no seu progresso e feedback.",
    },
    {
      question: "Posso usar o GymLog offline?",
      answer:
        "Sim! Nosso aplicativo móvel funciona offline. Seus dados serão sincronizados automaticamente quando você voltar a ficar online.",
    },
    {
      question: "Existe um teste gratuito?",
      answer:
        "Com certeza! Todos os planos pagos incluem um teste gratuito de 14 dias. Não é necessário cartão de crédito para começar.",
    },
    {
      question: "Posso acompanhar diferentes tipos de treinos?",
      answer:
        "Sim, o GymLog oferece suporte a todos os tipos de treino, incluindo musculação, cardio, yoga, CrossFit e muito mais.",
    },
    {
      question: "Quão preciso é o controle de calorias?",
      answer:
        "Utilizamos um banco de dados alimentar completo com mais de 1 milhão de itens. Você também pode adicionar alimentos e receitas personalizadas para um acompanhamento mais preciso.",
    },
    {
      question: "Posso exportar meus dados?",
      answer:
        "Sim, você pode exportar todos os seus dados de treino e nutrição em formato CSV ou PDF a qualquer momento.",
    },
  ];

  return (
    <section
      id="faq"
      className="dark:bg-muted/25 bg-zinc-50 py-16 md:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">
            <Brain className="h-3 w-3 mr-1" />
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tudo que você precisa saber sobre o Gymlog
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold pr-8">{faq.question}</h3>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openIndex === index ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">
            <Send className="h-3 w-3 mr-1" />
            Contato
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-muted-foreground">
            Tem alguma dúvida? Adoraríamos ouvi-la.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome</label>
                    <Input placeholder="Seu Nome" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assunto</label>
                  <Input placeholder="Como podemos ajudar?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea placeholder="Fale mais..." rows={5} />
                </div>
                <Button className="w-full" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Section
const FooterSection = () => {
  return (
    <footer className="relative border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Logo className="mb-4" />
            <p className="mb-6 text-muted-foreground">
              Transforme sua jornada fitness com gerenciamento inteligente de
              treinos e dietas utilizando inteligência artificial.
            </p>
            <form className="relative">
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                className="pr-12"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Produto</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#features"
                className="block transition-colors hover:text-primary"
              >
                Funcionalidades
              </a>
              <a
                href="#pricing"
                className="block transition-colors hover:text-primary"
              >
                Planos
              </a>
              <a
                href="#testimonials"
                className="block transition-colors hover:text-primary"
              >
                Depoimentos
              </a>
              <a
                href="#faq"
                className="block transition-colors hover:text-primary"
              >
                Perguntas Frequentes
              </a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Empresa</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Sobre Nós
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Blog
              </a>
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Carreiras
              </a>
              <a
                href="#contact"
                className="block transition-colors hover:text-primary"
              >
                Contato
              </a>
            </nav>
          </div>

          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Siga-nos</h3>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 GymLog. Todos os direitos reservados.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Política de Privacidade
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Termos de Uso
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Configurações de Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function GymLogLandingPage() {
  const testimonials = [
    {
      author: {
        name: "Sarah Johnson",
        handle: "@sarahfit",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      },
      text: "O GymLog transformou completamente a minha abordagem à atividade física. O gerador de treinos com IA cria planos perfeitos para os meus objetivos, e acompanhar o meu progresso nunca foi tão fácil!",
    },
    {
      author: {
        name: "Mike Chen",
        handle: "@mikelifts",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      text: "Como personal trainer, recomendo o GymLog a todos os meus clientes. As funcionalidades de acompanhamento da dieta e registo de treinos são incrivelmente intuitivas e poderosas.",
    },
    {
      author: {
        name: "Emma Rodriguez",
        handle: "@emmastrong",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
      text: "Já experimentei muitas aplicações de fitness, mas o GymLog é de longe a melhor. O tutor de IA é como ter um personal trainer no bolso. Altamente recomendado!",
    },
    {
      author: {
        name: "David Park",
        handle: "@davidgains",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      text: "As análises de progresso do GymLog são incríveis. Ver a minha evolução ao longo do tempo mantém-me motivado e ajuda-me a manter a consistência nos treinos.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProofSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection
          title="Amado por entusiastas Fitness"
          description="Junte-se a milhares de usuários que transformaram sua jornada fitness com o GymLog.
"
          testimonials={testimonials}
        />
        <FAQSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
