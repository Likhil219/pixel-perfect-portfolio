import { FolderKanban, Briefcase, MessageSquareQuote, Activity } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';

// Mock data - will be replaced with real data from Supabase
const recentActivity = [
  { id: '1', action: 'Added new project', item: 'E-commerce Platform', time: '2 hours ago' },
  { id: '2', action: 'Updated experience', item: 'Senior Developer at Tech Corp', time: '5 hours ago' },
  { id: '3', action: 'Approved testimonial', item: 'John Doe - CEO', time: '1 day ago' },
  { id: '4', action: 'Archived project', item: 'Old Portfolio Site', time: '2 days ago' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value={12}
          icon={FolderKanban}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Experience Entries"
          value={5}
          icon={Briefcase}
        />
        <StatsCard
          title="Testimonials"
          value={8}
          icon={MessageSquareQuote}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Projects"
          value={10}
          icon={Activity}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div>
                <p className="text-foreground font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.item}</p>
              </div>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Add Project"
          description="Create a new project to showcase"
          href="/admin/projects"
          icon={FolderKanban}
        />
        <QuickActionCard
          title="Add Experience"
          description="Update your work history"
          href="/admin/experience"
          icon={Briefcase}
        />
        <QuickActionCard
          title="Manage Testimonials"
          description="Review and approve feedback"
          href="/admin/testimonials"
          icon={MessageSquareQuote}
        />
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={href}
      className="bg-surface border border-border rounded-xl p-6 hover:border-accent/50 transition-all group"
    >
      <div className="p-3 bg-accent/10 rounded-lg w-fit mb-4 group-hover:bg-accent/20 transition-colors">
        <Icon className="h-6 w-6 text-accent" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </a>
  );
}
