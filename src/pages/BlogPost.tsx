import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-16 px-6 text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <article className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-10">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto aspect-video object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In today's fast-paced business environment, automation has become not just an advantage, but a necessity. 
              Organizations that embrace automation are seeing significant improvements in efficiency, accuracy, and overall productivity.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Key Benefits</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Increased operational efficiency</li>
              <li>Reduced human error</li>
              <li>Cost savings over time</li>
              <li>Better customer experience</li>
              <li>Scalable processes</li>
            </ul>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Getting Started</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The first step in any automation journey is identifying which processes are ripe for automation. 
              Look for repetitive tasks, high-volume operations, and areas where human error is common.
            </p>

            <h2 className="font-display text-2xl font-bold mt-10 mb-4">Conclusion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Automation is not about replacing humans—it's about empowering them to focus on higher-value work. 
              By starting small and scaling gradually, any organization can realize the benefits of intelligent automation.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-card border border-border text-center">
            <h3 className="font-display text-xl font-bold mb-3">Ready to automate your business?</h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how we can help transform your operations.
            </p>
            <Link 
              to="/#contact"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-accent transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
