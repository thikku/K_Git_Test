import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Wand2, Grid3X3, Image as ImageIcon, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_20%_10%,hsl(8_100%_96%)_0%,transparent_60%),linear-gradient(135deg,hsl(8_100%_96%)_0%,hsl(45_100%_90%)_60%,hsl(195_100%_92%)_100%)]"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-bold font-[Fredoka] text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground leading-tight">
                Make Printable Coloring Pages in Seconds
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-7">
                Type an idea, pick complexity, preview, and download. Perfect for parents, teachers, and kids. Powered by AI.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/generate">
                  <Button 
                    size="lg" 
                    className="h-12 px-8 rounded-full bg-[hsl(var(--primary))] text-white hover:bg-[hsl(8_85%_58%)] transition-all hover:scale-105 active:scale-98"
                    data-testid="hero-generate-button"
                  >
                    <Wand2 className="w-5 h-5 mr-2" />
                    Start Creating
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-12 px-8 rounded-full border-2 transition-all hover:scale-105 active:scale-98"
                    data-testid="hero-templates-button"
                  >
                    <Grid3X3 className="w-5 h-5 mr-2" />
                    Browse Templates
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Right: Preview Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1567727014928-5f4aa30c4c15?crop=entropy&cs=srgb&fm=jpg&q=85" 
                  alt="Colorful markers" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[Fredoka] text-center mb-12 text-foreground">
            Three Ways to Create
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/generate">
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(17,17,17,0.10)" }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-8 rounded-xl border-2 hover:border-[hsl(var(--primary))] transition-all cursor-pointer" data-testid="action-card-generate">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--brand-coral-100))] flex items-center justify-center mb-4">
                    <Wand2 className="w-7 h-7 text-[hsl(var(--primary))]" />
                  </div>
                  <h3 className="text-xl font-semibold font-[Fredoka] mb-2 text-foreground">Generate from Prompt</h3>
                  <p className="text-sm text-muted-foreground">Describe any idea and let AI create a unique coloring page for you.</p>
                </Card>
              </motion.div>
            </Link>

            <Link to="/templates">
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(17,17,17,0.10)" }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-8 rounded-xl border-2 hover:border-[hsl(var(--primary))] transition-all cursor-pointer" data-testid="action-card-templates">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center mb-4">
                    <Grid3X3 className="w-7 h-7 text-[hsl(var(--secondary-foreground))]" />
                  </div>
                  <h3 className="text-xl font-semibold font-[Fredoka] mb-2 text-foreground">Use Templates</h3>
                  <p className="text-sm text-muted-foreground">Pick from curated categories: animals, vehicles, fantasy, and more.</p>
                </Card>
              </motion.div>
            </Link>

            <Link to="/gallery">
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(17,17,17,0.10)" }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-8 rounded-xl border-2 hover:border-[hsl(var(--primary))] transition-all cursor-pointer" data-testid="action-card-gallery">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center mb-4">
                    <ImageIcon className="w-7 h-7 text-[hsl(var(--accent-foreground))]" />
                  </div>
                  <h3 className="text-xl font-semibold font-[Fredoka] mb-2 text-foreground">Browse Gallery</h3>
                  <p className="text-sm text-muted-foreground">View and download your previously created coloring pages.</p>
                </Card>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold font-[Fredoka] text-center mb-12 text-foreground">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold font-[Fredoka] mb-2 text-foreground">Describe</h3>
              <p className="text-sm text-muted-foreground">Enter your idea or choose a template</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold font-[Fredoka] mb-2 text-foreground">Generate</h3>
              <p className="text-sm text-muted-foreground">AI creates your custom coloring page</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold font-[Fredoka] mb-2 text-foreground">Download</h3>
              <p className="text-sm text-muted-foreground">Save as PNG or PDF and start coloring</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}