import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { EyeOff } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BadgeChip, getTierColor, tierFromCount } from "@/components/ui/badge-chip";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/useCountUp";
import { useUserProfile } from "@/hooks/useUserProfile";
import type { UserProfile } from "@/lib/types";

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const { data: user, isLoading, error } = useUserProfile(username!);

  if (error && (error as { status?: number }).status === 404) {
    return <Navigate to="/not-found" replace state={{ query: username }} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base">
        <Navbar />
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-12 md:px-14">
          <div className="flex items-center gap-7">
            <Skeleton className="h-[120px] w-[120px] rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-7 w-48" />
            </div>
            <Skeleton className="h-24 w-48 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-96 rounded-xl" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/not-found" replace state={{ query: username }} />;
  }

  return <ProfileView user={user} />;
}

function ProfileView({ user }: { user: UserProfile }) {
  const tier = tierFromCount(user.stats.totalDeals);
  const tierColor = getTierColor(tier);

  const confirmed = useCountUp(user.stats.confirmed);
  const pending = useCountUp(user.stats.pending);
  const rate = useCountUp(user.stats.successRate);
  const partners = useCountUp(user.stats.partnersCount);
  const rank = useCountUp(user.ranking.position);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const historyLength = user.history?.length ?? 0;

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />

      {/* HERO */}
      <div className="relative px-6 pt-14 md:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-80px] h-[420px] w-[720px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(240,123,60,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-7">
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar}
                alt={user.displayName}
                className="h-[120px] w-[120px] rounded-full object-cover"
                style={{
                  boxShadow: `0 0 0 2px #1a1a1a, 0 0 0 4px ${tierColor}`,
                }}
              />
            </div>
            <div>
              <h1 className="mb-1.5 text-[44px] font-extrabold leading-none tracking-[-0.04em] md:text-[60px]">
                {user.displayName}
              </h1>
              <div className="mb-4 font-mono text-[16px] italic text-text-secondary">
                @{user.username}
              </div>
              <BadgeChip tier={tier} size="lg" />
            </div>
          </div>

          <div className="min-w-[180px] rounded-2xl border border-white/[0.08] bg-bg-card px-6 py-5 text-right">
            <div className="mb-2 text-[11px] uppercase tracking-[0.15em] text-text-muted">
              Classement
            </div>
            <div className="flex items-baseline justify-end gap-1 font-mono text-[40px] font-bold leading-none tracking-tight">
              <span className="animate-nf-glow text-primary">#{rank}</span>
              <span className="text-[18px] text-text-muted">
                / {user.ranking.totalMembers}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="mx-auto mt-10 max-w-6xl px-6 md:px-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            value={fmt(confirmed)}
            label="deals confirmés"
            accent="primary"
          />
          <StatCard value={fmt(pending)} label="en cours" accent="muted" />
          <StatCard
            value={`${rate}%`}
            label="taux de succès"
            accent={user.stats.successRate >= 90 ? "badge10" : "default"}
          />
          <StatCard
            value={fmt(partners)}
            label="partenaires uniques"
            accent="default"
          />
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:px-14 lg:grid-cols-[1fr_380px]">
        {/* HISTORY */}
        <div>
          <h2 className="mb-5 text-[22px] font-light italic tracking-tight text-text-secondary">
            Les{" "}
            <span className="font-semibold not-italic text-foreground">
              {historyLength === 0
                ? "deals"
                : `${historyLength} ${historyLength > 1 ? "derniers deals" : "dernier deal"}`}
            </span>
          </h2>

          {user.hideDealsDetails && (
            <div className="mb-4 flex items-center gap-2.5 rounded-[10px] border border-primary/30 bg-primary/5 px-4 py-3.5 text-[13px] text-text-secondary">
              <EyeOff className="h-4 w-4 flex-shrink-0 text-primary" />
              <span>
                Ce membre a masqué le détail de ses deals. Seul le nombre est
                public.
              </span>
            </div>
          )}

          {historyLength === 0 ? (
            <div className="rounded-xl border border-white/[0.08] bg-bg-card px-6 py-10 text-center text-sm text-text-muted">
              Aucun deal dans l'historique.
            </div>
          ) : (
            <div className="flex flex-col gap-2" data-nf-animate>
              {user.history.map((h, i) => (
                <DealRow
                  key={`${h.partnerUsername}-${i}`}
                  deal={h}
                  index={i}
                  mounted={mounted}
                  masked={user.hideDealsDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COL */}
        <aside className="flex flex-col gap-5">
          {/* Top partners */}
          <SidePanel title="Partenaires récurrents">
            {user.topPartners.length === 0 ? (
              <p className="text-sm text-text-muted">Pas encore de partenaire récurrent.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {user.topPartners.map((tp) => (
                  <Link
                    key={tp.username}
                    to={`/${encodeURIComponent(tp.username)}`}
                    className="flex items-center gap-3 rounded-[10px] border border-white/[0.08] bg-bg-darkest px-3 py-2.5 transition-all hover:-translate-y-px hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(240,123,60,0.2),0_10px_30px_rgba(240,123,60,0.12)]"
                  >
                    <img
                      src={tp.avatar}
                      alt={tp.username}
                      className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold tracking-tight">
                        {tp.username}
                      </div>
                      <div className="truncate font-mono text-[11px] text-text-muted">
                        @{tp.username}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-lg font-bold leading-none tracking-tight">
                        {tp.dealsCount}
                      </div>
                      <div className="mt-0.5 text-[10px] text-text-muted">
                        deal{tp.dealsCount > 1 ? "s" : ""}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </SidePanel>

          {/* Key dates */}
          <SidePanel title="Repères">
            <div className="flex flex-col">
              <DateRow
                label="Membre depuis"
                value={formatDate(user.memberSince)}
              />
              <DateRow
                label="Premier deal"
                value={formatRelative(user.keyDates.firstDeal)}
              />
              <DateRow
                label="Dernier deal"
                value={formatRelative(user.keyDates.lastDeal)}
                accent
                last
              />
            </div>
          </SidePanel>

          {/* CTA */}
          <DealCta username={user.username} />
        </aside>
      </div>

      <Footer />
    </div>
  );
}

function StatCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: "primary" | "muted" | "badge10" | "default";
}) {
  const colorClass =
    accent === "primary"
      ? "text-primary"
      : accent === "muted"
      ? "text-text-muted"
      : accent === "badge10"
      ? "text-[#80ff80]"
      : "text-foreground";
  return (
    <div className="rounded-xl border border-white/[0.08] bg-bg-card px-6 py-5">
      <div
        className={`font-mono text-[32px] font-bold leading-none tracking-tight md:text-[36px] ${colorClass}`}
      >
        {value}
      </div>
      <div className="mt-2 text-[13px] text-text-secondary">{label}</div>
    </div>
  );
}

function SidePanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-bg-card p-5">
      <div className="mb-4 text-[11px] uppercase tracking-[0.15em] text-text-muted">
        {title}
      </div>
      {children}
    </div>
  );
}

function DateRow({
  label,
  value,
  accent,
  last,
}: {
  label: string;
  value: string;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between pb-3 ${
        last ? "" : "mb-3 border-b border-white/[0.08]"
      }`}
    >
      <span className="text-[13px] text-text-secondary">{label}</span>
      <span
        className={`text-sm font-medium ${accent ? "text-primary" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
}

type DealRowProps = {
  deal: UserProfile["history"][number];
  index: number;
  mounted: boolean;
  masked: boolean;
};

function DealRow({ deal, index, mounted, masked }: DealRowProps) {
  const hiddenObject = masked || deal.object === "Masqué" || !deal.object;
  return (
    <Link
      to={`/${encodeURIComponent(deal.partnerUsername)}`}
      className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[10px] border border-white/[0.08] bg-bg-card px-4 py-3.5 pl-5 transition-all hover:translate-x-0.5 hover:border-primary/40 hover:bg-[rgba(240,123,60,0.04)]"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 420ms cubic-bezier(0.22,1,0.36,1) ${index * 55}ms, transform 420ms cubic-bezier(0.22,1,0.36,1) ${index * 55}ms, border-color 220ms, background-color 220ms`,
      }}
    >
      <span
        aria-hidden
        className="absolute bottom-2 left-0 top-2 w-[2px] rounded-sm bg-primary opacity-0 transition-opacity group-hover:opacity-100"
      />
      <img
        src={deal.partnerAvatar}
        alt={deal.partnerUsername}
        className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        loading="lazy"
      />
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-baseline gap-2 text-sm">
          <span className="font-mono text-text-secondary">
            @{deal.partnerUsername}
          </span>
          <span className="text-white/15">·</span>
          {hiddenObject ? (
            <span className="italic text-text-muted">Masqué</span>
          ) : (
            <span className="font-medium text-foreground">{deal.object}</span>
          )}
        </div>
        {!hiddenObject && deal.comment && (
          <div className="text-xs italic text-text-muted">
            « {deal.comment} »
          </div>
        )}
      </div>
      <div className="whitespace-nowrap font-mono text-[11px] tracking-wide text-text-muted">
        {formatRelative(deal.date)}
      </div>
    </Link>
  );
}

function DealCta({ username }: { username: string }) {
  const guildId = import.meta.env.VITE_DISCORD_GUILD_ID as string | undefined;
  const channelId = import.meta.env.VITE_DISCORD_DEAL_CHANNEL_ID as string | undefined;
  const inviteUrl =
    (import.meta.env.VITE_DISCORD_INVITE_URL as string | undefined) ??
    "https://notify-france.fr";

  const discordDeepLink = guildId
    ? channelId
      ? `https://discord.com/channels/${guildId}/${channelId}`
      : `https://discord.com/channels/${guildId}`
    : inviteUrl;

  return (
    <div
      className="rounded-2xl border border-primary/30 px-5 py-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(240,123,60,0.08), rgba(240,123,60,0.02))",
      }}
    >
      <div className="mb-1.5 text-[15px] font-semibold">
        Un deal avec <span className="font-mono">@{username}</span> ?
      </div>
      <div className="mb-4 text-[13px] leading-relaxed text-text-secondary">
        Lance{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          /legit done @{username}
        </code>{" "}
        sur Discord pour archiver le deal ici.
      </div>
      <a
        href={discordDeepLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center rounded-[10px] bg-primary px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
      >
        Ouvrir Discord →
      </a>
      <div className="mt-3 text-center text-[11px] text-text-muted">
        Pas encore membre ?{" "}
        <a
          href={inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors hover:brightness-125"
        >
          Rejoindre Notify France
        </a>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatRelative(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const diffMs = Date.now() - d.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `il y a ${days}j`;
  const months = Math.floor(days / 30);
  if (months < 12) return `il y a ${months} mois`;
  const years = Math.floor(months / 12);
  return `il y a ${years} an${years > 1 ? "s" : ""}`;
}
