import { HeroSection } from "@/components/layout/hero-section";
import { Footer } from "@/components/layout/footer";
import { StatCard } from "@/components/ui/stat-card";
import { BadgeDisplay } from "@/components/profile/badge-display";
import { StarRating } from "@/components/profile/star-rating";
import { Button } from "@/components/ui/button";
import { Badge, Shield, TrendingUp, Users, CheckCircle, Zap, Lock, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { mockGlobalStats, mockTopMembers } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Global Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={CheckCircle}
            value={mockGlobalStats.totalDeals}
            label="Deals Confirmés"
            variant="success"
          />
          <StatCard
            icon={Users}
            value={mockGlobalStats.activeMembers}
            label="Membres Vérifiés"
            variant="primary"
          />
          <StatCard
            icon={TrendingUp}
            value={`${mockGlobalStats.engagementRate}%`}
            label="Taux d'engagement"
            variant="primary"
          />
          <StatCard
            icon={Badge}
            value={`${mockGlobalStats.averageRating}/5`}
            label="Note moyenne"
            variant="success"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Comment ça marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              icon: "🤝",
              title: "Faites un deal",
              desc: "Achetez ou vendez à un membre",
            },
            {
              step: 2,
              icon: "✅",
              title: "Validez via Discord",
              desc: "Confirmation mutuelle sécurisée",
            },
            {
              step: 3,
              icon: "🏆",
              title: "Gagnez en crédibilité",
              desc: "Profil mis à jour automatiquement",
            },
            {
              step: 4,
              icon: "🔗",
              title: "Partagez votre lien",
              desc: "Prouvez votre fiabilité partout",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-bg-darker rounded-lg p-6 text-center border border-border hover:border-primary transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${item.step * 0.1}s` }}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <div className="text-2xl font-bold text-primary mb-2">{item.step}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Top Vendeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTopMembers.map((member, index) => (
            <Link
              key={member.username}
              to={`/${member.username}`}
              className="bg-bg-card rounded-lg p-6 border border-border hover:border-primary transition-all duration-300 hover:scale-105 glow-primary-on-hover group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={member.avatar}
                    alt={member.displayName}
                    className="w-24 h-24 rounded-full border-4 border-badge-10 glow-badge-10"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  @{member.username}
                </h3>
                <StarRating rating={member.rating} showValue className="mb-3" />
                <div className="flex items-center gap-2 text-text-secondary mb-4">
                  <Badge className="w-4 h-4" />
                  <span className="font-semibold">{member.totalDeals} deals</span>
                </div>
                <BadgeDisplay
                  level={member.badge.level as any}
                  text="Expert"
                  size="sm"
                  className="w-full"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why trust us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Pourquoi nous faire confiance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Lock,
              title: "Sécurisé",
              desc: "Validation double via Discord",
              color: "text-badge-10",
            },
            {
              icon: Zap,
              title: "Instantané",
              desc: "Profil mis à jour en temps réel",
              color: "text-primary",
            },
            {
              icon: BarChart3,
              title: "Transparent",
              desc: "Historique complet et vérifiable",
              color: "text-badge-5",
            },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="bg-bg-card rounded-lg p-8 border border-border hover:border-primary transition-all duration-300 hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-primary rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 blur-orange opacity-30" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Prêt à rejoindre la communauté ?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 500 membres actifs et commencez à construire votre
              réputation dès aujourd'hui
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href="https://discord.gg/notifyfrance"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rejoindre Discord <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
