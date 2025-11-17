import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeDisplay } from "@/components/profile/badge-display";
import { StarRating } from "@/components/profile/star-rating";
import { StatCard } from "@/components/ui/stat-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge, CheckCircle, Clock, TrendingUp, Share2, Copy, Calendar, BarChart3, Star, Activity, Award } from "lucide-react";
import { mockUser, mockReviews, mockActivities, mockBadges, mockMonthlyDeals, mockCategoryDistribution } from "@/lib/mockData";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Profile() {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("stats");

  // For demo, only gattogaming exists
  if (username !== "gattogaming") {
    return <Navigate to="/not-found" replace />;
  }

  const user = mockUser;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(link);
    toast.success("Lien copié !", {
      description: "Le lien du profil a été copié dans le presse-papiers",
    });
  };

  const handleShare = async () => {
    const link = `${window.location.origin}/${username}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Profil Notify France - ${user.displayName}`,
          text: `Découvrez le profil de ${user.displayName} sur Notify France`,
          url: link,
        });
      } catch (err) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-bg-card rounded-lg p-6 border-l-4 border-primary sticky top-4 animate-slide-up">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <Avatar className="w-32 h-32 border-4 border-badge-10 glow-badge-10">
                  <AvatarImage src={user.avatar} alt={user.displayName} />
                  <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                </Avatar>
              </div>

              {/* Name & Verified */}
              <h1 className="text-2xl font-bold text-center mb-2">
                @{user.username}
              </h1>
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Vérifié Notify France
                </div>
              </div>

              {/* Main Stats */}
              <div className="bg-bg-darker rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold mb-2">{user.stats.totalDeals}</div>
                  <div className="text-text-muted text-sm">Deals confirmés</div>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <StarRating rating={user.stats.rating} showValue size="lg" />
                </div>
                <div className="text-center text-text-secondary text-sm">
                  {user.stats.reviewCount} avis
                </div>
                <div className="border-t border-border mt-4 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">Membre depuis</span>
                    <span className="font-semibold">
                      {format(new Date(user.memberSince), "MMM yyyy", { locale: fr })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge */}
              <div className="mb-6">
                <BadgeDisplay
                  level={user.badge.level}
                  text={user.badge.text}
                  icon={user.badge.icon}
                  size="lg"
                />
              </div>

              {/* Additional Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-sm">Taux de réponse</span>
                  <span className="font-semibold text-badge-10">{user.stats.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-sm">Délai moyen</span>
                  <span className="font-semibold text-text-secondary">{user.stats.avgResponseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted text-sm">Fiabilité</span>
                  <span className="font-semibold text-badge-10">{user.stats.reliability}%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary-dark font-semibold"
                  asChild
                >
                  <a href="https://discord.gg/notifyfrance" target="_blank" rel="noopener noreferrer">
                    Rejoindre Notify France
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager le profil
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleCopyLink}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copier le lien
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Statistiques</span>
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span className="hidden sm:inline">Avis ({mockReviews.length})</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Activité</span>
                </TabsTrigger>
                <TabsTrigger value="badges" className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="hidden sm:inline">Badges</span>
                </TabsTrigger>
              </TabsList>

              {/* Stats Tab */}
              <TabsContent value="stats" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard
                    icon={Badge}
                    value={user.stats.totalDeals}
                    label="Deals confirmés"
                    sublabel="+12 ce mois"
                    variant="primary"
                  />
                  <StatCard
                    icon={Star}
                    value={`${user.stats.rating}/5`}
                    label="Note moyenne"
                    sublabel={`Sur ${user.stats.reviewCount} avis`}
                    variant="primary"
                  />
                  <StatCard
                    icon={TrendingUp}
                    value={`${user.stats.reliability}%`}
                    label="Fiabilité"
                    sublabel="0 litige"
                    variant="success"
                  />
                </div>

                {/* Monthly deals chart placeholder */}
                <div className="bg-bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold mb-6">Deals par mois</h3>
                  <div className="h-64 flex items-end justify-around gap-4">
                    {mockMonthlyDeals.map((item) => (
                      <div key={item.month} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-primary rounded-t-lg transition-all duration-300 hover:bg-primary-dark"
                          style={{ height: `${(item.deals / 20) * 100}%`, minHeight: "20px" }}
                        />
                        <div className="text-xs text-text-muted mt-2">{item.month}</div>
                        <div className="text-sm font-semibold">{item.deals}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category distribution */}
                <div className="bg-bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold mb-6">Distribution par catégorie</h3>
                  <div className="space-y-4">
                    {mockCategoryDistribution.map((item, index) => (
                      <div key={item.category}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">{item.category}</span>
                          <span className="text-text-secondary">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-bg-darker rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              index === 0 ? "bg-primary" : index === 1 ? "bg-badge-10" : "bg-badge-1"
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <div className="bg-bg-card rounded-lg p-6 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">
                      {mockReviews.length} avis - Note moyenne : {user.stats.rating}/5
                    </h3>
                  </div>
                  <StarRating rating={user.stats.rating} showValue size="lg" className="mb-6" />
                </div>

                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-bg-darker rounded-lg p-6 border border-border hover:border-l-4 hover:border-l-primary transition-all duration-300 animate-slide-up"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={review.reviewer.avatar} />
                        <AvatarFallback>{review.reviewer.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold">@{review.reviewer.username}</h4>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          {review.verified && (
                            <span className="flex items-center gap-1 text-badge-10">
                              <CheckCircle className="w-3 h-3" />
                              Vérifié
                            </span>
                          )}
                          <span>•</span>
                          <span>{review.category}</span>
                          <span>•</span>
                          <span>{format(new Date(review.date), "dd MMM yyyy", { locale: fr })}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-text-secondary mb-4">{review.comment}</p>
                    {review.helpful > 0 && (
                      <div className="text-xs text-text-muted">
                        👍 {review.helpful} personnes ont trouvé cet avis utile
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <div className="bg-bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold mb-6">Activité récente</h3>
                  <div className="space-y-4">
                    {mockActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-bg-darker rounded-lg border border-border animate-slide-up"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full mt-1 ${
                            activity.type === "deal_confirmed" ? "bg-badge-10" : "bg-primary"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="text-text-muted text-xs mb-1">
                            {format(new Date(activity.date), "dd MMM yyyy à HH:mm", { locale: fr })}
                          </div>
                          {activity.type === "deal_confirmed" && (
                            <>
                              <p className="font-semibold mb-1">
                                Deal confirmé avec {activity.partner}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <span>{activity.category}</span>
                                <span>•</span>
                                <StarRating rating={activity.rating || 0} size="sm" />
                              </div>
                            </>
                          )}
                          {activity.type === "badge_unlocked" && (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{activity.icon}</span>
                              <p className="font-semibold">
                                Nouveau badge débloqué : {activity.badge}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Badges Tab */}
              <TabsContent value="badges" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockBadges.map((badge, index) => (
                    <div
                      key={badge.id}
                      className={`rounded-lg p-6 border-2 transition-all duration-300 hover:scale-105 animate-slide-up ${
                        badge.unlocked
                          ? "bg-bg-card border-badge-10 glow-badge-10"
                          : "bg-bg-darkest border-border opacity-60"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{badge.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">{badge.name}</h4>
                          <p className="text-text-secondary text-sm mb-3">{badge.description}</p>
                          {badge.unlocked ? (
                            <span className="text-badge-10 text-sm font-semibold">✓ Débloqué</span>
                          ) : badge.progress ? (
                            <div>
                              <div className="flex justify-between text-xs text-text-muted mb-1">
                                <span>{badge.progress.current} / {badge.progress.required}</span>
                                <span>{Math.round((badge.progress.current / badge.progress.required) * 100)}%</span>
                              </div>
                              <div className="w-full bg-bg-darker rounded-full h-2">
                                <div
                                  className="bg-primary rounded-full h-2 transition-all duration-500"
                                  style={{ width: `${(badge.progress.current / badge.progress.required) * 100}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-text-inactive text-sm">🔒 Verrouillé</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
