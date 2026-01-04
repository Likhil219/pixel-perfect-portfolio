import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
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
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', render: (p: Project) => (
      <span className="line-clamp-1 max-w-xs">{p.description}</span>
    )},
    { key: 'techStack', label: 'Tech Stack', render: (p: Project) => (
      <div className="flex flex-wrap gap-1">
        {p.techStack.slice(0, 3).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ))}
        {p.techStack.length > 3 && (
          <Badge variant="outline" className="text-xs">+{p.techStack.length - 3}</Badge>
        )}
      </div>
    )},
    { key: 'status', label: 'Status', render: (p: Project) => (
      <Badge variant={p.status === 'active' ? 'default' : 'secondary'}>
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
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-surface border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-background border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-background border-border"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                <Input
                  id="techStack"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="React, Node.js, TypeScript"
                  className="bg-background border-border"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {editingProject ? 'Update' : 'Create'}
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
          className="pl-10 bg-surface border-border"
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
