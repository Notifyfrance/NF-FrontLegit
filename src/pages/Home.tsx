import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BadgeChip, tierFromCount } from "@/components/ui/badge-chip";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/useCountUp";
import { useGlobalStats } from "@/hooks/useGlobalStats";
import { useTopMembers } from "@/hooks/useTopMembers";
import { useUsernameSearch } from "@/hooks/useUsernameSearch";

function HandUnderline({ width = 300 }: { width?: number }) {
  return (
    <svg
      width={width}
      height="14"
      viewBox={`0 0 ${width} 14`}
      className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full"
      aria-hidden
    >
      <path
        d={`M2 8 Q ${width * 0.25} 2, ${width * 0.5} 7 T ${width - 2} 6`}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

export default function Home() {
  const { data: globalStats, isLoading: statsLoading } = useGlobalStats();
  const { data: topMembers, isLoading: membersLoading } = useTopMembers(3);
  const { query, setQuery, onSubmit: handleSearch } = useUsernameSearch();

  const deals = useCountUp(globalStats?.totalDeals ?? 0);
  const members = useCountUp(globalStats?.activeMembers ?? 0);
  const community = useCountUp(globalStats?.totalGuildMembers ?? 0);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(r);
  }, []);

  const underlineWidth = 320; // "vérifiable"

  return (
    <div className="min-h-screen bg-bg-base text-foreground">
      <Navbar />

      {/* TOP STATS BAR */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-b border-white/[0.08] bg-bg-darkest px-6 py-3.5 text-[13px] md:gap-x-12">
        {statsLoading ? (
          <Skeleton className="h-5 w-[340px] max-w-full" />
        ) : (
          <>
            {globalStats?.totalGuildMembers ? (
              <>
                <StatInline
                  value={fmt(community)}
                  label="membres communauté"
                />
                <span className="text-white/10">·</span>
              </>
            ) : null}
            <StatInline
              value={fmt(members)}
              label="vendeurs vérifiés"
            />
            <span className="text-white/10">·</span>
            <StatInline
              value={fmt(deals)}
              label="deals confirmés"
            />
          </>
        )}
      </div>

      {/* SPLIT HERO */}
      <div className="grid min-h-[720px] grid-cols-1 lg:grid-cols-[1fr_560px]">
        {/* LEFT */}
        <div
          data-nf-animate
          className="relative flex flex-col justify-center overflow-hidden px-6 py-16 md:px-14 md:py-20"
        >
          {/* soft orange wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-36 -top-36 h-[560px] w-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(240,123,60,0.18) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 max-w-[680px]">
            <h1 className="mb-7 font-extrabold leading-[0.98] tracking-[-0.03em] text-[48px] md:text-[76px]">
              <span className="font-light italic text-text-secondary">
                Chaque deal
              </span>
              <span className="text-foreground">,</span>
              <br />
              <span className="text-foreground">signé</span>
              <span className="text-foreground">,</span>{" "}
              <span className="text-foreground">daté</span>
              <span className="text-foreground">,</span>
              <br />
              <span className="relative inline-block whitespace-nowrap">
                <span className="animate-nf-glow inline-block text-primary">
                  vérifiable
                </span>
                <HandUnderline width={underlineWidth} />
              </span>
              <span className="text-foreground">.</span>
            </h1>

            <p className="mb-9 max-w-[540px] text-[18px] leading-relaxed text-text-secondary">
              <span className="font-medium text-foreground">
                Une communauté qui se vérifie elle-même.
              </span>{" "}
              Les deals entre membres Notify France sont signés par les deux
              parties, puis archivés ici. Avant d'acheter, vérifiez.
            </p>

            {/* CTAs */}
            <div className="mb-7 flex flex-wrap gap-3">
              <a
                href="https://notify-france.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[10px] bg-primary px-6 py-[15px] text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(240,123,60,0.35)] transition-all hover:scale-[1.02] hover:brightness-110"
              >
                Rejoindre le Discord →
              </a>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("top-members");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="rounded-[10px] border border-white/[0.14] bg-transparent px-[22px] py-[15px] text-[15px] font-medium text-foreground transition-colors hover:border-white/30 hover:bg-white/[0.04] lg:hidden"
              >
                Voir le top des vendeurs
              </button>
            </div>

            {/* Inline search */}
            <form
              onSubmit={handleSearch}
              className="flex max-w-[540px] items-center gap-2 rounded-xl border border-white/[0.14] bg-bg-darkest p-1.5 transition-colors focus-within:border-primary/60"
            >
              <div className="flex flex-1 items-center gap-2.5 px-3">
                <Search className="h-3.5 w-3.5 text-text-muted" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Chercher un pseudo Discord…"
                  className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-text-muted focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-primary px-[18px] py-2.5 text-[13px] font-semibold text-white transition-colors hover:brightness-110"
              >
                Vérifier →
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT — Top 3 vault */}
        <aside
          id="top-members"
          className="flex items-center border-t border-white/[0.08] bg-bg-darkest p-7 lg:border-l lg:border-t-0"
        >
          <div className="w-full rounded-2xl border border-white/[0.08] bg-bg-card p-6">
            {/* Card head */}
            <div className="mb-5 border-b border-white/[0.08] pb-4">
              <div className="mb-1.5 text-xs text-text-muted">
                {new Date().toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="text-[20px] font-bold tracking-tight">
                Les plus fiables du moment
              </div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-3" data-nf-animate>
              {membersLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-[76px] w-full rounded-xl" />
                  ))
                : topMembers?.map((m, i) => (
                    <TopMemberRow
                      key={m.username}
                      member={m}
                      index={i}
                      mounted={mounted}
                    />
                  ))}
            </div>

            {/* Footer stats */}
            <div className="mt-4 border-t border-white/[0.08] pt-4 text-center text-xs text-text-muted">
              Top {topMembers?.length ?? 3} sur{" "}
              {globalStats?.activeMembers ?? "…"} vendeurs vérifiés
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

function StatInline({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[15px] font-semibold text-foreground">
        {value}
      </span>
      <span className="text-text-secondary">{label}</span>
    </div>
  );
}

type TopMemberRowProps = {
  member: {
    username: string;
    displayName: string;
    avatar: string;
    totalDeals: number;
  };
  index: number;
  mounted: boolean;
};

function TopMemberRow({ member, index, mounted }: TopMemberRowProps) {
  const tier = tierFromCount(member.totalDeals);
  return (
    <Link
      to={`/${encodeURIComponent(member.username)}`}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-xl border border-white/[0.08] bg-bg-darkest px-4 py-3.5 transition-all duration-200 hover:-translate-y-px hover:border-primary/50 hover:shadow-[0_0_0_1px_rgba(240,123,60,0.25),0_10px_30px_rgba(240,123,60,0.15)]"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 480ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, transform 480ms cubic-bezier(0.22,1,0.36,1) ${index * 80}ms, border-color 220ms, box-shadow 220ms`,
      }}
    >
      <img
        src={member.avatar}
        alt={member.displayName}
        className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
        loading="lazy"
      />
      <div className="min-w-0">
        <div className="mb-1.5 flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className="truncate">{member.displayName}</span>
          <BadgeChip tier={tier} size="sm" />
        </div>
        <div className="flex items-center gap-2.5 text-xs text-text-muted">
          <span className="font-mono font-medium text-foreground">
            {member.totalDeals} deals
          </span>
          <span className="text-white/15">·</span>
          <span className="font-mono text-text-muted">@{member.username}</span>
        </div>
      </div>
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.04] text-sm text-text-muted transition-colors group-hover:bg-primary/15 group-hover:text-primary">
        →
      </div>
    </Link>
  );
}
