import { Aperture, Camera, Binoculars, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<
  string,
  { icon: React.ElementType; gradient: string }
> = {
  "Mirrorless Camera": {
    icon: Camera,
    gradient: "from-zinc-900 via-zinc-800 to-amber-900/40",
  },
  Lens: {
    icon: Aperture,
    gradient: "from-slate-900 via-slate-800 to-sky-900/40",
  },
  Speedlight: {
    icon: Zap,
    gradient: "from-zinc-900 via-zinc-800 to-orange-900/40",
  },
  Binoculars: {
    icon: Binoculars,
    gradient: "from-zinc-900 via-zinc-800 to-emerald-900/40",
  },
};

export function ProductImagePlaceholder({
  category,
  title,
  className,
}: {
  category: string;
  title: string;
  className?: string;
}) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES["Mirrorless Camera"];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br p-6 text-center",
        style.gradient,
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]"
      />
      <Icon className="relative size-12 text-amber-400/90" strokeWidth={1.25} />
      <span className="relative text-sm font-medium text-white/90">{title}</span>
      <span className="relative text-xs uppercase tracking-wide text-white/40">
        Photo coming soon
      </span>
    </div>
  );
}
