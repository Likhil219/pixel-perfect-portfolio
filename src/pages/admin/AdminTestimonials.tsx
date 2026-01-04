import { useState } from 'react';
import { Plus, Search, Star } from 'lucide-react';
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

interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  feedback: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
}

// Mock data
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'John Doe',
    clientRole: 'CEO at TechStart',
    feedback: 'Exceptional work! Delivered the project on time with outstanding quality.',
    rating: 5,
    isApproved: true,
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    clientName: 'Sarah Smith',
    clientRole: 'Product Manager',
    feedback: 'Great communication and technical skills. Would definitely work with again.',
    rating: 5,
    isApproved: true,
    createdAt: '2024-02-15',
  },
  {
    id: '3',
    clientName: 'Mike Johnson',
    clientRole: 'Founder at StartupXYZ',
    feedback: 'Professional and reliable. The app exceeded our expectations.',
    rating: 4,
    isApproved: false,
    createdAt: '2024-03-01',
  },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    feedback: '',
    rating: 5,
  });

  const filteredTestimonials = testimonials.filter((t) =>
    t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.clientRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'clientName', label: 'Client' },
    { key: 'clientRole', label: 'Role' },
    { key: 'feedback', label: 'Feedback', render: (t: Testimonial) => (
      <span className="line-clamp-1 max-w-xs">{t.feedback}</span>
    )},
    { key: 'rating', label: 'Rating', render: (t: Testimonial) => (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < t.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    )},
    { key: 'isApproved', label: 'Status', render: (t: Testimonial) => (
      <Badge variant={t.isApproved ? 'default' : 'secondary'}>
        {t.isApproved ? 'Approved' : 'Pending'}
      </Badge>
    )},
  ];

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole,
      feedback: testimonial.feedback,
      rating: testimonial.rating,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (testimonial: Testimonial) => {
    setTestimonials(testimonials.filter((t) => t.id !== testimonial.id));
    toast.success('Testimonial deleted successfully');
  };

  const handleToggleVisibility = (testimonial: Testimonial) => {
    setTestimonials(testimonials.map((t) =>
      t.id === testimonial.id ? { ...t, isApproved: !t.isApproved } : t
    ));
    toast.success(testimonial.isApproved ? 'Testimonial hidden' : 'Testimonial approved');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const testimonialData: Testimonial = {
      id: editingTestimonial?.id || String(Date.now()),
      clientName: formData.clientName,
      clientRole: formData.clientRole,
      feedback: formData.feedback,
      rating: formData.rating,
      isApproved: editingTestimonial?.isApproved ?? false,
      createdAt: editingTestimonial?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (editingTestimonial) {
      setTestimonials(testimonials.map((t) => (t.id === editingTestimonial.id ? testimonialData : t)));
      toast.success('Testimonial updated successfully');
    } else {
      setTestimonials([testimonialData, ...testimonials]);
      toast.success('Testimonial created successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setIsDialogOpen(false);
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      clientRole: '',
      feedback: '',
      rating: 5,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            Manage client feedback and reviews
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-accent hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-surface border-border max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="bg-background border-border"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientRole">Client Role</Label>
                  <Input
                    id="clientRole"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="CEO at Company"
                    className="bg-background border-border"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="bg-background border-border"
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: i + 1 })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-6 w-6 ${i < formData.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {editingTestimonial ? 'Update' : 'Create'}
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
          placeholder="Search testimonials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-surface border-border"
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredTestimonials}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleVisibility={handleToggleVisibility}
        isVisible={(t) => t.isApproved}
      />
    </div>
  );
}
