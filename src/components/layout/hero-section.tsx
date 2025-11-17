import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logoNF from "@/assets/logo-nf.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Blur effect background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-orange opacity-30 animate-float" />

      <div className="container relative z-10 text-center px-4">
        <div className="flex justify-center mb-8 animate-slide-up">
          <img
            src={logoNF}
            alt="Notify France Logo"
            className="w-32 h-32 drop-shadow-2xl"
          />
        </div>

        <div className="flex items-center justify-center gap-3 mb-4 animate-slide-up">
          <Shield className="w-12 h-12 text-primary" />
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-primary">
            Prouvez votre fiabilité
          </h1>
        </div>

        <p className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          en 2 secondes
        </p>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Le système de confiance n°1 du resell français sur Discord
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-6 text-lg glow-primary transition-all duration-300 hover:scale-105"
            asChild
          >
            <a
              href="https://discord.gg/notifyfrance"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rejoindre Notify France <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link to="/gattogaming">Voir un profil exemple</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
