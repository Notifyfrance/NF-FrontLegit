import logoNF from "@/assets/logo-nf.png";

type Props = { size?: number; className?: string };

export function NFLogo({ size = 26, className }: Props) {
  return (
    <img
      src={logoNF}
      alt="Notify Legit"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
