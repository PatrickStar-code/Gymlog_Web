import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Dumbbell,
  Apple,
  Settings,
  Mail,
  Phone,
  MapPin,
  Save,
  RotateCcw,
} from "lucide-react";

export default function ConfigMenu() {
  const [formData, setFormData] = useState({
    nome: "João Silva",
    idade: "28",
    altura: "175",
    peso: "78",
    objetivo: "hipertrofia",
    nivelAtividade: "moderado",
    diasTreino: "4",
    tipoTreino: "musculacao",
    duracaoTreino: "60",
    preferenciaExercicio: "academia",
    sugestaoTreinoIA: true,
    tipoDieta: "balanceada",
    restricoes: "",
    refeicoesdia: "5",
    metaCalorica: "2500",
    planoAlimentarIA: true,
    idioma: "pt-br",
    notificacoes: true,
    tema: "claro",
    integracaoDispositivos: false,
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    endereco: "São Paulo, SP",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Salvando configurações:", formData);
    alert("Configurações salvas com sucesso!");
  };

  const handleReset = () => {
    if (confirm("Tem certeza que deseja restaurar as configurações padrão?")) {
      setFormData({
        nome: "João Silva",
        idade: "28",
        altura: "175",
        peso: "78",
        objetivo: "hipertrofia",
        nivelAtividade: "moderado",
        diasTreino: "4",
        tipoTreino: "musculacao",
        duracaoTreino: "60",
        preferenciaExercicio: "academia",
        sugestaoTreinoIA: true,
        tipoDieta: "balanceada",
        restricoes: "",
        refeicoesdia: "5",
        metaCalorica: "2500",
        planoAlimentarIA: true,
        idioma: "pt-br",
        notificacoes: true,
        tema: "claro",
        integracaoDispositivos: false,
        email: "joao.silva@email.com",
        telefone: "(11) 98765-4321",
        endereco: "São Paulo, SP",
      });
      alert("Configurações restauradas!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="shadow-lg border-emerald-100 dark:border-emerald-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                Perfil do Usuário
              </CardTitle>
              <CardDescription>
                Informações pessoais e objetivos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={formData.idade}
                    onChange={(e) => handleInputChange("idade", e.target.value)}
                    placeholder="Anos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="altura">Altura (cm)</Label>
                  <Input
                    id="altura"
                    type="number"
                    value={formData.altura}
                    onChange={(e) =>
                      handleInputChange("altura", e.target.value)
                    }
                    placeholder="cm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    value={formData.peso}
                    onChange={(e) => handleInputChange("peso", e.target.value)}
                    placeholder="kg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Select
                  value={formData.objetivo}
                  onValueChange={(value) =>
                    handleInputChange("objetivo", value)
                  }
                >
                  <SelectTrigger id="objetivo">
                    <SelectValue placeholder="Selecione seu objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                    <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                    <SelectItem value="manutencao">Manutenção</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nivelAtividade">
                  Nível de Atividade Física
                </Label>
                <Select
                  value={formData.nivelAtividade}
                  onValueChange={(value) =>
                    handleInputChange("nivelAtividade", value)
                  }
                >
                  <SelectTrigger id="nivelAtividade">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentario">Sedentário</SelectItem>
                    <SelectItem value="leve">Leve</SelectItem>
                    <SelectItem value="moderado">Moderado</SelectItem>
                    <SelectItem value="intenso">Intenso</SelectItem>
                    <SelectItem value="muito-intenso">Muito Intenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-blue-100 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-blue-600" />
                Configurações de Treino
              </CardTitle>
              <CardDescription>
                Personalize sua rotina de exercícios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="diasTreino">Dias de Treino por Semana</Label>
                <Select
                  value={formData.diasTreino}
                  onValueChange={(value) =>
                    handleInputChange("diasTreino", value)
                  }
                >
                  <SelectTrigger id="diasTreino">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 dia</SelectItem>
                    <SelectItem value="2">2 dias</SelectItem>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="4">4 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="6">6 dias</SelectItem>
                    <SelectItem value="7">7 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoTreino">Tipo de Treino</Label>
                <Select
                  value={formData.tipoTreino}
                  onValueChange={(value) =>
                    handleInputChange("tipoTreino", value)
                  }
                >
                  <SelectTrigger id="tipoTreino">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="musculacao">Musculação</SelectItem>
                    <SelectItem value="funcional">Funcional</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="crossfit">CrossFit</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracaoTreino">
                  Duração Média do Treino (minutos)
                </Label>
                <Input
                  id="duracaoTreino"
                  type="number"
                  value={formData.duracaoTreino}
                  onChange={(e) =>
                    handleInputChange("duracaoTreino", e.target.value)
                  }
                  placeholder="Minutos"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferenciaExercicio">
                  Preferência de Exercícios
                </Label>
                <Select
                  value={formData.preferenciaExercicio}
                  onValueChange={(value) =>
                    handleInputChange("preferenciaExercicio", value)
                  }
                >
                  <SelectTrigger id="preferenciaExercicio">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academia">Academia</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="ar-livre">Ao Ar Livre</SelectItem>
                    <SelectItem value="misto">Misto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="sugestaoTreinoIA">
                    Sugestões de Treino por IA
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receba treinos personalizados automaticamente
                  </p>
                </div>
                <Switch
                  id="sugestaoTreinoIA"
                  checked={formData.sugestaoTreinoIA}
                  onCheckedChange={(checked) =>
                    handleInputChange("sugestaoTreinoIA", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-orange-100 dark:border-orange-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-orange-600" />
                Configurações de Dieta
              </CardTitle>
              <CardDescription>Personalize seu plano alimentar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="tipoDieta">Tipo de Dieta</Label>
                <Select
                  value={formData.tipoDieta}
                  onValueChange={(value) =>
                    handleInputChange("tipoDieta", value)
                  }
                >
                  <SelectTrigger id="tipoDieta">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanceada">Balanceada</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                    <SelectItem value="cetogenica">Cetogênica</SelectItem>
                    <SelectItem value="vegetariana">Vegetariana</SelectItem>
                    <SelectItem value="vegana">Vegana</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="restricoes">Restrições Alimentares</Label>
                <Textarea
                  id="restricoes"
                  value={formData.restricoes}
                  onChange={(e) =>
                    handleInputChange("restricoes", e.target.value)
                  }
                  placeholder="Ex: lactose, glúten, frutos do mar..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="refeicoesdia">Refeições por Dia</Label>
                  <Select
                    value={formData.refeicoesdia}
                    onValueChange={(value) =>
                      handleInputChange("refeicoesdia", value)
                    }
                  >
                    <SelectTrigger id="refeicoesdia">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 refeições</SelectItem>
                      <SelectItem value="4">4 refeições</SelectItem>
                      <SelectItem value="5">5 refeições</SelectItem>
                      <SelectItem value="6">6 refeições</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaCalorica">Meta Calórica Diária</Label>
                  <Input
                    id="metaCalorica"
                    type="number"
                    value={formData.metaCalorica}
                    onChange={(e) =>
                      handleInputChange("metaCalorica", e.target.value)
                    }
                    placeholder="kcal"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="planoAlimentarIA">
                    Plano Alimentar por IA
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Gere cardápios personalizados automaticamente
                  </p>
                </div>
                <Switch
                  id="planoAlimentarIA"
                  checked={formData.planoAlimentarIA}
                  onCheckedChange={(checked) =>
                    handleInputChange("planoAlimentarIA", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-purple-100 dark:border-purple-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-600" />
                Preferências Gerais
              </CardTitle>
              <CardDescription>Configurações do aplicativo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Select
                  value={formData.idioma}
                  onValueChange={(value) => handleInputChange("idioma", value)}
                >
                  <SelectTrigger id="idioma">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <Select
                  value={formData.tema}
                  onValueChange={(value) => handleInputChange("tema", value)}
                >
                  <SelectTrigger id="tema">
                    <SelectValue placeholder="Selecione o tema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="sistema">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notificacoes">Notificações</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes de treino e dieta
                  </p>
                </div>
                <Switch
                  id="notificacoes"
                  checked={formData.notificacoes}
                  onCheckedChange={(checked) =>
                    handleInputChange("notificacoes", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="integracaoDispositivos">
                    Integração com Dispositivos
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Conecte smartwatch e outros dispositivos
                  </p>
                </div>
                <Switch
                  id="integracaoDispositivos"
                  checked={formData.integracaoDispositivos}
                  onCheckedChange={(checked) =>
                    handleInputChange("integracaoDispositivos", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-slate-100 dark:border-slate-800 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-slate-600" />
                Informações de Contato
              </CardTitle>
              <CardDescription>
                Dados para comunicação e suporte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Telefone
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) =>
                      handleInputChange("telefone", e.target.value)
                    }
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Localização
                  </Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) =>
                      handleInputChange("endereco", e.target.value)
                    }
                    placeholder="Cidade, Estado"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleSave}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
          >
            <Save className="w-5 h-5 mr-2" />
            Salvar Alterações
          </Button>
          <Button
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="border-slate-300 dark:border-slate-700"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Restaurar Padrões
          </Button>
        </div>
      </div>
    </div>
  );
}
