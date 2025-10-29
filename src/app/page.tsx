"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Dumbbell, Apple, TrendingUp, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface WaveBackgroundProps {
  className?: string;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    particleMaterial: THREE.ShaderMaterial;
    animationId: number | null;
  } | null>(null);

  const getCurrentTheme = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

  const getBackgroundColor = (theme: string) =>
    theme === "dark" ? new THREE.Color(0x0a0a0a) : new THREE.Color(0xffffff);

  const getParticleColor = (theme: string) =>
    theme === "dark"
      ? new THREE.Vector3(0.4, 0.6, 1.0)
      : new THREE.Vector3(0.2, 0.4, 0.8);

  const particleVertex = `
    attribute float scale;
    uniform float uTime;
    void main() {
      vec3 p = position;
      float s = scale;
      p.y += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      p.x += (sin(p.y + uTime) * 0.5);
      s += (sin(p.x + uTime) * 0.5) + (cos(p.y + uTime) * 0.1) * 2.0;
      vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
      gl_PointSize = s * 15.0 * (1.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFragment = `
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 0.5);
    }
  `;

  const initScene = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(
      75,
      winWidth / winHeight,
      0.01,
      1000
    );
    camera.position.set(0, 6, 5);

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(winWidth, winHeight);
    renderer.setClearColor(getBackgroundColor(getCurrentTheme()), 0);

    const gap = 0.3;
    const amountX = 200;
    const amountY = 200;
    const particleNum = amountX * amountY;

    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);

    let i = 0;
    let j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - (amountX * gap) / 2;
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - (amountY * gap) / 2;
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      "scale",
      new THREE.BufferAttribute(particleScales, 1)
    );

    const particleMaterial = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: getParticleColor(getCurrentTheme()) },
      },
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      particleMaterial,
      animationId: null,
    };
  };

  const animate = () => {
    if (!sceneRef.current) return;
    const { scene, camera, renderer, particleMaterial } = sceneRef.current;

    particleMaterial.uniforms.uTime.value += 0.05;
    particleMaterial.uniforms.uColor.value = getParticleColor(
      getCurrentTheme()
    );

    camera.lookAt(scene.position);
    renderer.render(scene, camera);

    sceneRef.current.animationId = requestAnimationFrame(animate);
  };

  const handleResize = () => {
    if (!sceneRef.current) return;
    const { camera, renderer } = sceneRef.current;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    initScene();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      if (sceneRef.current?.animationId)
        cancelAnimationFrame(sceneRef.current.animationId);
      window.removeEventListener("resize", handleResize);
      if (sceneRef.current) {
        const { scene, renderer, particles } = sceneRef.current;
        scene.remove(particles);
        particles.geometry.dispose();
        (particles.material as THREE.Material).dispose();
        renderer.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

const WorkoutDietManager: React.FC = () => {
  const features = [
    {
      icon: Dumbbell,
      title: "Controle de Treinos",
      description:
        "Registre e acompanhe seus treinos com estatísticas detalhadas.",
    },
    {
      icon: Apple,
      title: "Planejamento Alimentar",
      description:
        "Controle suas calorias, macros e monte planos personalizados.",
    },
    {
      icon: TrendingUp,
      title: "Evolução e Resultados",
      description:
        "Visualize seu progresso com gráficos e relatórios completos.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <WaveBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground/80 tracking-wide">
                Junte-se a mais de 10.000 pessoas focadas em boa forma
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                Transforme sua
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-primary to-orange-800">
                Jornada Fitness
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto"
            >
              Registre seus treinos, gerencie sua alimentação e alcance suas
              metas de forma inteligente com nossa plataforma completa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {" "}
              <Link href="/GymLog/login">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full cursor-pointer"
                >
                  <Dumbbell className="mr-2 h-5 w-5" /> Começar Agora
                </Button>
              </Link>
              <Link href="/Gymlog">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-full cursor-pointer"
                >
                  <Calendar className="mr-2 h-5 w-5" /> Saiba Mais
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="bg-card/50 backdrop-blur border border-border/50"
                >
                  <CardHeader className="flex flex-col items-center gap-2">
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-xl text-center">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDietManager;
