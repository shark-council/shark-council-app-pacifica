import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export function CouncilChatHero(props: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center bg-secondary bg-cover bg-center bg-no-repeat rounded-2xl px-4 py-8",
        props.className,
      )}
      style={{ backgroundImage: `url("/images/backgrounds/accent.png")` }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-accent-foreground text-center">
        Consult the Council
      </h2>
      <p className="max-w-md text-accent-foreground text-center">
        Debate your trade idea with AI agents for an instant risk verdict and
        seamless order execution on Pacifica
      </p>
    </div>
  );
}
