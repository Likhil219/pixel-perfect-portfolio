import { useState } from 'react';
import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample blog posts - in production, this would come from a database
export const blogPosts = [
  {
    id: 'getting-started-with-automation',
    title: 'Getting Started with Business Automation',
    excerpt: 'Learn how to identify the right processes for automation and get started with your first automated workflow.',
    category: 'Automation',
    author: 'Likhil',
    date: '2024-01-10',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
    featured: true
  },
  {
    id: 'whatsapp-automation-guide',
    title: 'Complete Guide to WhatsApp Business Automation',
    excerpt: 'Discover how to automate your WhatsApp business communications for better customer engagement.',
    category: 'WhatsApp',
    author: 'Likhil',
    date: '2024-01-08',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
    featured: false
  },
  {
    id: 'ai-in-healthcare',
    title: 'AI Automation in Healthcare: A 2024 Overview',
    excerpt: 'Explore how AI is transforming healthcare operations with intelligent automation solutions.',
    category: 'Healthcare',
    author: 'Likhil',
    date: '2024-01-05',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800',
    featured: false
  },
  {
    id: 'lead-generation-strategies',
    title: 'Automated Lead Generation Strategies That Work',
    excerpt: 'Master the art of automated lead generation with proven strategies and tools.',
    category: 'Sales',
    author: 'Likhil',
    date: '2024-01-02',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    featured: true
  },
];

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const featuredPost = blogPosts.find(p => p.featured);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">Blog</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
              Insights & <span className="gradient-text">Updates</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest trends in automation, AI, and business optimization.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && activeCategory === 'All' && (
            <Link 
              to={`/blog/${featuredPost.id}`}
              className="block mb-12 group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">
                      Featured • {featuredPost.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link 
                key={post.id}
                to={`/blog/${post.id}`}
                className="group"
              >
                <article className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-primary text-xs font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
