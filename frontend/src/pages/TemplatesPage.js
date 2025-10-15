import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";
import DownloadBar from "../components/DownloadBar";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`${API_URL}/templates`);
      setTemplates(response.data.templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFromTemplate = async (template) => {
    setGenerating(template.id);
    setSelectedTemplate(template);
    setGeneratedImage(null);
    setDialogOpen(true);

    try {
      const response = await axios.post(`${API_URL}/templates/${template.id}/generate`);
      setGeneratedImage(response.data);
      toast.success("Coloring page generated!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate coloring page");
      setDialogOpen(false);
    } finally {
      setGenerating(null);
    }
  };

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold font-[Fredoka] mb-4 text-foreground">
              Coloring Page Templates
            </h1>
            <p className="text-muted-foreground text-base">
              Browse our curated collection and generate instantly
            </p>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : (
            <Tabs defaultValue="All" className="w-full">
              <TabsList className="mb-8 flex-wrap h-auto gap-2" data-testid="category-tabs">
                <TabsTrigger value="All">All</TabsTrigger>
                {categories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="All">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {templates.map((template, idx) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onGenerate={handleGenerateFromTemplate}
                      isGenerating={generating === template.id}
                      index={idx}
                    />
                  ))}
                </div>
              </TabsContent>

              {categories.map(category => (
                <TabsContent key={category} value={category}>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {templates
                      .filter(t => t.category === category)
                      .map((template, idx) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          onGenerate={handleGenerateFromTemplate}
                          isGenerating={generating === template.id}
                          index={idx}
                        />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </motion.div>
      </div>

      {/* Generation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl" data-testid="preview-dialog">
          <DialogHeader>
            <DialogTitle className="font-[Fredoka] text-2xl">
              {selectedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {!generatedImage ? (
              <Skeleton className="h-[420px] w-full rounded-lg" />
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-inner">
                  <img
                    src={`data:image/png;base64,${generatedImage.image_data}`}
                    alt="Generated coloring page"
                    className="w-full h-auto rounded"
                  />
                </div>
                <DownloadBar imageData={generatedImage.image_data} />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TemplateCard({ template, onGenerate, isGenerating, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card 
        className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-lg transition-all cursor-pointer"
        data-testid="template-select-card"
      >
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={template.preview_url}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold font-[Fredoka] text-foreground">{template.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {template.complexity}
            </Badge>
          </div>
          <Button
            onClick={() => onGenerate(template)}
            disabled={isGenerating}
            className="w-full mt-2 rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(8_85%_58%)] transition-all"
            size="sm"
            data-testid={`use-template-${template.id}`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Use This Template"
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}