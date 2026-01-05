import { useState } from 'react';
import { Plus, Search, ExternalLink, Youtube, Play } from 'lucide-react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  results: string[];
  technologies: string[];
  images: string[];
  liveUrl?: string;
  youtubeUrl?: string;
  buyUrl?: string;
  status: 'active' | 'archived';
  year: string;
  client: string;
  duration: string;
  createdAt: string;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Appointment Booking Automation',
    category: 'Healthcare',
    description: 'Complete WhatsApp-based appointment booking system for hospitals and clinics with auto slot checking and reminder automation.',
    features: [
      'WhatsApp appointment booking bot',
      'Auto slot checking & availability',
      'Appointment confirmation messages',
      'Automated reminder system'
    ],
    results: [
      '70% reduction in no-shows',
      '50% faster booking process',
      '24/7 availability for patients'
    ],
    technologies: ['WhatsApp API', 'Node.js', 'MongoDB', 'Airtable'],
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800'
    ],
    liveUrl: 'https://example.com',
    youtubeUrl: 'https://youtube.com/watch?v=example',
    buyUrl: 'https://store.example.com',
    status: 'active',
    year: '2024',
    client: 'Multi-Specialty Hospital',
    duration: '6 weeks',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'E-commerce Automation Suite',
    category: 'E-commerce',
    description: 'Complete order management and customer support automation for Shopify stores.',
    features: [
      'Order tracking automation',
      'Customer support chatbot',
      'Inventory management'
    ],
    results: [
      '40% reduction in support tickets',
      '3x faster order processing'
    ],
    technologies: ['Shopify API', 'React', 'Supabase'],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800'
    ],
    liveUrl: 'https://tasks.example.com',
    status: 'active',
    year: '2024',
    client: 'Fashion Retail Brand',
    duration: '8 weeks',
    createdAt: '2024-02-20',
  },
];

interface FormData {
  title: string;
  category: string;
  description: string;
  features: string;
  results: string;
  technologies: string;
  images: string;
  liveUrl: string;
  youtubeUrl: string;
  buyUrl: string;
  status: 'active' | 'archived';
  year: string;
  client: string;
  duration: string;
}

const initialFormData: FormData = {
  title: '',
  category: '',
  description: '',
  features: '',
  results: '',
  technologies: '',
  images: '',
  liveUrl: '',
  youtubeUrl: '',
  buyUrl: '',
  status: 'active',
  year: new Date().getFullYear().toString(),
  client: '',
  duration: '',
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'title', label: 'Project', render: (p: Project) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{p.title}</span>
          <div className="flex items-center gap-1">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {p.youtubeUrl && (
              <a href={p.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-red-500">
                <Youtube className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <Badge variant="outline" className="w-fit text-xs">{p.category}</Badge>
      </div>
    )},
    { key: 'client', label: 'Client', render: (p: Project) => (
      <div className="flex flex-col">
        <span className="text-foreground">{p.client || '-'}</span>
        <span className="text-xs text-muted-foreground">{p.year} • {p.duration}</span>
      </div>
    )},
    { key: 'technologies', label: 'Technologies', render: (p: Project) => (
      <div className="flex flex-wrap gap-1">
        {p.technologies.slice(0, 3).map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs bg-accent/10 text-accent border-0">
            {tech}
          </Badge>
        ))}
        {p.technologies.length > 3 && (
          <Badge variant="outline" className="text-xs">+{p.technologies.length - 3}</Badge>
        )}
      </div>
    )},
    { key: 'features', label: 'Features', render: (p: Project) => (
      <span className="text-muted-foreground">{p.features.length} features</span>
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
      category: project.category,
      description: project.description,
      features: project.features.join('\n'),
      results: project.results.join('\n'),
      technologies: project.technologies.join(', '),
      images: project.images.join('\n'),
      liveUrl: project.liveUrl || '',
      youtubeUrl: project.youtubeUrl || '',
      buyUrl: project.buyUrl || '',
      status: project.status,
      year: project.year,
      client: project.client,
      duration: project.duration,
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
      category: formData.category,
      description: formData.description,
      features: formData.features.split('\n').map((f) => f.trim()).filter(Boolean),
      results: formData.results.split('\n').map((r) => r.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      images: formData.images.split('\n').map((i) => i.trim()).filter(Boolean),
      liveUrl: formData.liveUrl || undefined,
      youtubeUrl: formData.youtubeUrl || undefined,
      buyUrl: formData.buyUrl || undefined,
      status: formData.status,
      year: formData.year,
      client: formData.client,
      duration: formData.duration,
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
    setFormData(initialFormData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio projects with full details
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-surface border-border max-w-2xl max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
              <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Basic Information</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-foreground">Project Title *</Label>
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
                      <Label htmlFor="category" className="text-foreground">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="bg-background/50 border-border h-11 focus:border-accent"
                        placeholder="Healthcare, E-commerce, etc."
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-background/50 border-border min-h-[80px] focus:border-accent resize-none"
                      placeholder="A brief description of your project..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client" className="text-foreground">Client</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        className="bg-background/50 border-border h-11 focus:border-accent"
                        placeholder="Client name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-foreground">Year</Label>
                      <Input
                        id="year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="bg-background/50 border-border h-11 focus:border-accent"
                        placeholder="2024"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-foreground">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="bg-background/50 border-border h-11 focus:border-accent"
                        placeholder="6 weeks"
                      />
                    </div>
                  </div>
                </div>

                {/* Features & Results Section */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Features & Results</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="features" className="text-foreground">Features *</Label>
                    <Textarea
                      id="features"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      className="bg-background/50 border-border min-h-[100px] focus:border-accent resize-none"
                      placeholder="Enter each feature on a new line:&#10;WhatsApp appointment booking&#10;Auto slot checking&#10;Reminder automation"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Enter each feature on a new line</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="results" className="text-foreground">Results</Label>
                    <Textarea
                      id="results"
                      value={formData.results}
                      onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                      className="bg-background/50 border-border min-h-[100px] focus:border-accent resize-none"
                      placeholder="Enter each result on a new line:&#10;70% reduction in no-shows&#10;50% faster booking process&#10;24/7 availability"
                    />
                    <p className="text-xs text-muted-foreground">Enter each result/achievement on a new line</p>
                  </div>
                </div>

                {/* Technologies Section */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Technologies</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="technologies" className="text-foreground">Technologies Used *</Label>
                    <Input
                      id="technologies"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      placeholder="React, Node.js, WhatsApp API, MongoDB"
                      className="bg-background/50 border-border h-11 focus:border-accent"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Separate technologies with commas</p>
                  </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Links & Media</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="images" className="text-foreground flex items-center gap-2">
                      <span className="text-sm">🖼️</span>
                      Project Images (URLs)
                    </Label>
                    <Textarea
                      id="images"
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      className="bg-background/50 border-border min-h-[100px] focus:border-accent resize-none"
                      placeholder="Enter each image URL on a new line:&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                    />
                    <p className="text-xs text-muted-foreground">Enter each image URL on a new line. Images will auto-scroll in carousel.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="liveUrl" className="text-foreground flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo URL
                      </Label>
                      <Input
                        id="liveUrl"
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://demo.example.com"
                        className="bg-background/50 border-border h-11 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtubeUrl" className="text-foreground flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        YouTube Video URL
                      </Label>
                      <Input
                        id="youtubeUrl"
                        type="url"
                        value={formData.youtubeUrl}
                        onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                        placeholder="https://youtube.com/watch?v=..."
                        className="bg-background/50 border-border h-11 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buyUrl" className="text-foreground flex items-center gap-2">
                        <span className="text-sm">🛒</span>
                        Buy/Store URL
                      </Label>
                      <Input
                        id="buyUrl"
                        type="url"
                        value={formData.buyUrl}
                        onChange={(e) => setFormData({ ...formData, buyUrl: e.target.value })}
                        placeholder="https://store.example.com/template"
                        className="bg-background/50 border-border h-11 focus:border-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">Status</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-foreground">Project Status</Label>
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
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-border sticky bottom-0 bg-surface">
                  <Button type="button" variant="outline" onClick={resetForm} className="border-border hover:bg-muted">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </ScrollArea>
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
