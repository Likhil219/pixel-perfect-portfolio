import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold text-foreground mt-3 font-display">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-sm mt-3 font-medium flex items-center gap-1",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              <span className={cn(
                "inline-block w-0 h-0 border-l-[5px] border-r-[5px] border-transparent",
                trend.isPositive 
                  ? "border-b-[6px] border-b-success" 
                  : "border-t-[6px] border-t-destructive"
              )} />
              {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="p-3 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </div>
  );
}