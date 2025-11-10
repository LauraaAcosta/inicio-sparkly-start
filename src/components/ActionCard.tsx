import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  className?: string;
}

const ActionCard = ({ icon: Icon, title, onClick, className }: ActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-4 p-8 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/30",
        className
      )}
    >
      <div className="w-48 h-48 rounded-full bg-secondary border-4 border-foreground/80 flex items-center justify-center shadow-lg">
        <Icon className="w-24 h-24 text-accent" strokeWidth={2.5} />
      </div>
      <h3 className="text-2xl font-bold text-accent">{title}</h3>
    </button>
  );
};

export default ActionCard;
