export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] px-12 py-5">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
        <a
          href="https://notify-france.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-primary"
        >
          Communauté Notify France · Discord
        </a>
        <span className="text-white/10">·</span>
        <span>Gratuit · Sans compte</span>
        <span className="text-white/10">·</span>
        <span>Depuis 2023</span>
      </div>
    </footer>
  );
}
