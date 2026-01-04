import { useState } from 'react';
import { Plus, Search, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'active' | 'archived';
  createdAt: string;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured online store with payment integration',
    techStack: ['React', 'Node.js', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    techStack: ['Next.js', 'Supabase', 'Tailwind'],
    liveUrl: 'https://tasks.example.com',
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    title: 'Portfolio v1',
    description: 'Previous version of personal portfolio',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    status: 'archived',
    createdAt: '2023-06-10',
  },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    techStack: string;
    liveUrl: string;
    githubUrl: string;
    status: 'active' | 'archived';
  }>({
    title: '',
    description: '',
    techStack: '',
    liveUrl: '',
    githubUrl: '',
    status: 'active',
  });

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'title', label: 'Title', render: (p: Project) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">{p.title}</span>
        <div className="flex items-center gap-1">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {p.githubUrl && (
            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    )},
    { key: 'description', label: 'Description', render: (p: Project) => (
      <span className="line-clamp-1 max-w-xs text-muted-foreground">{p.description}</span>
    )},
    { key: 'techStack', label: 'Tech Stack', render: (p: Project) => (
      <div className="flex flex-wrap gap-1">
        {p.techStack.slice(0, 3).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs bg-accent/10 text-accent border-0">
            {tech}
          </Badge>
        ))}
        {p.techStack.length > 3 && (
          <Badge variant="outline" className="text-xs">+{p.techStack.length - 3}</Badge>
        )}
      </div>
    )},
    { key: 'status', label: 'Status', render: (p: Project) => (
      <Badge 
        variant={p.status === 'active' ? 'default' : 'secondary'}
        className={p.status === 'active' ? 'bg-success/20 text-success border-0' : 'bg-muted text-muted-foreground border-0'}
      >
        {p.status}
      </Badge>
    )},
  ];

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      status: project.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (project: Project) => {
    setProjects(projects.filter((p) => p.id !== project.id));
    toast.success('Project deleted successfully');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData: Project = {
      id: editingProject?.id || String(Date.now()),
      title: formData.title,
      description: formData.description,
      techStack: formData.techStack.split(',').map((t) => t.trim()),
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      status: formData.status,
      createdAt: editingProject?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (editingProject) {
      setProjects(projects.map((p) => (p.id === editingProject.id ? projectData : p)));
      toast.success('Project updated successfully');
    } else {
      setProjects([projectData, ...projects]);
      toast.success('Project created successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      techStack: '',
      liveUrl: '',
      githubUrl: '',
      status: 'active',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-surface border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background/50 border-border h-11 focus:border-accent"
                  placeholder="My Awesome Project"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-background/50 border-border min-h-[100px] focus:border-accent resize-none"
                  placeholder="A brief description of your project..."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack" className="text-foreground">Tech Stack</Label>
                <Input
                  id="techStack"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React, Node.js, TypeScript"
                  className="bg-background/50 border-border h-11 focus:border-accent"
                  required
                />
                <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl" className="text-foreground">Live URL</Label>
                  <Input
                    id="liveUrl"
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="bg-background/50 border-border h-11 focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl" className="text-foreground">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="bg-background/50 border-border h-11 focus:border-accent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-foreground">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'active' | 'archived') => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="bg-background/50 border-border h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-border">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={resetForm} className="border-border hover:bg-muted">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
                  {editingProject ? 'Update Project' : 'Create Project'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-surface border-border h-11 focus:border-accent"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredProjects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}