import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/admin/DataTable';
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

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
}

// Mock data
const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Tech Corp',
    role: 'Senior Developer',
    duration: 'Jan 2023 - Present',
    description: 'Leading frontend development team and architecting scalable solutions.',
    startDate: '2023-01',
    isCurrent: true,
  },
  {
    id: '2',
    company: 'StartupXYZ',
    role: 'Full Stack Developer',
    duration: 'Mar 2021 - Dec 2022',
    description: 'Built and maintained multiple web applications using React and Node.js.',
    startDate: '2021-03',
    endDate: '2022-12',
    isCurrent: false,
  },
  {
    id: '3',
    company: 'Digital Agency',
    role: 'Junior Developer',
    duration: 'Jun 2019 - Feb 2021',
    description: 'Developed responsive websites and learned modern web technologies.',
    startDate: '2019-06',
    endDate: '2021-02',
    isCurrent: false,
  },
];

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>(mockExperience);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
  });

  const filteredExperiences = experiences
    .filter((e) =>
      e.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.startDate.localeCompare(a.startDate));

  const columns = [
    { key: 'company', label: 'Company' },
    { key: 'role', label: 'Role' },
    { key: 'duration', label: 'Duration' },
    { key: 'description', label: 'Description', render: (e: Experience) => (
      <span className="line-clamp-1 max-w-xs">{e.description}</span>
    )},
  ];

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      role: exp.role,
      description: exp.description,
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      isCurrent: exp.isCurrent,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (exp: Experience) => {
    setExperiences(experiences.filter((e) => e.id !== exp.id));
    toast.success('Experience deleted successfully');
  };

  const formatDuration = (start: string, end?: string, isCurrent?: boolean) => {
    const startDate = new Date(start + '-01');
    const startStr = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    if (isCurrent) return `${startStr} - Present`;
    if (!end) return startStr;
    
    const endDate = new Date(end + '-01');
    const endStr = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    return `${startStr} - ${endStr}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expData: Experience = {
      id: editingExp?.id || String(Date.now()),
      company: formData.company,
      role: formData.role,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.isCurrent ? undefined : formData.endDate,
      isCurrent: formData.isCurrent,
      duration: formatDuration(formData.startDate, formData.endDate, formData.isCurrent),
    };

    if (editingExp) {
      setExperiences(experiences.map((exp) => (exp.id === editingExp.id ? expData : exp)));
      toast.success('Experience updated successfully');
    } else {
      setExperiences([expData, ...experiences]);
      toast.success('Experience created successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setIsDialogOpen(false);
    setEditingExp(null);
    setFormData({
      company: '',
      role: '',
      description: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experience</h1>
          <p className="text-muted-foreground mt-1">
            Manage your work history
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-surface border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingExp ? 'Edit Experience' : 'Add New Experience'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-background border-border"
                    required
                  />
                </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="month"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="bg-background border-border"
                    disabled={formData.isCurrent}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCurrent}
                  onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm text-foreground">I currently work here</span>
              </label>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {editingExp ? 'Update' : 'Create'}
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
          placeholder="Search experience..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-surface border-border"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredExperiences}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
