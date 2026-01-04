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
    { key: 'clientName', label: 'Client', render: (t: Testimonial) => (
      <div>
        <span className="font-medium text-foreground">{t.clientName}</span>
        <p className="text-xs text-muted-foreground">{t.clientRole}</p>
      </div>
    )},
    { key: 'feedback', label: 'Feedback', render: (t: Testimonial) => (
      <span className="line-clamp-2 max-w-xs text-muted-foreground">{t.feedback}</span>
    )},
    { key: 'rating', label: 'Rating', render: (t: Testimonial) => (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
          />
        ))}
      </div>
    )},
    { key: 'isApproved', label: 'Status', render: (t: Testimonial) => (
      <Badge 
        className={t.isApproved 
          ? 'bg-success/20 text-success border-0' 
          : 'bg-amber-500/20 text-amber-500 border-0'
        }
      >
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
          <h1 className="text-3xl font-bold text-foreground font-display">Testimonials</h1>
          <p className="text-muted-foreground mt-1">
            Manage client feedback and reviews
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-surface border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-foreground">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="bg-background/50 border-border h-11 focus:border-accent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientRole" className="text-foreground">Client Role</Label>
                  <Input
                    id="clientRole"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    placeholder="CEO at Company"
                    className="bg-background/50 border-border h-11 focus:border-accent"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-foreground">Feedback</Label>
                <Textarea
                  id="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="bg-background/50 border-border min-h-[120px] focus:border-accent resize-none"
                  placeholder="What did the client say about your work?"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Rating</Label>
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: i + 1 })}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`h-7 w-7 ${i < formData.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30 hover:text-amber-400/50'}`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {formData.rating} of 5
                  </span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={resetForm} className="border-border hover:bg-muted">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white">
                  {editingTestimonial ? 'Update Testimonial' : 'Create Testimonial'}
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
          className="pl-10 bg-surface border-border h-11 focus:border-accent"
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