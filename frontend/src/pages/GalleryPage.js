import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import DownloadBar from "../components/DownloadBar";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function GalleryPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`${API_URL}/gallery`);
      setPages(response.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (pageId, e) => {
    e.stopPropagation();
    
    try {
      await axios.delete(`${API_URL}/gallery/${pageId}`);
      setPages(pages.filter(p => p.id !== pageId));
      toast.success("Page deleted");
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("Failed to delete page");
    }
  };

  const handleDownloadPng = (imageData, e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${imageData}`;
    link.download = `coloring-page-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloaded!");
  };

  const handleViewDetails = (page) => {
    setSelectedPage(page);
    setDialogOpen(true);
  };

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
              Your Gallery
            </h1>
            <p className="text-muted-foreground text-base">
              All your created coloring pages in one place
            </p>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-8 rounded-full bg-muted mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1608120621607-2f2eb25b85d3?w=200" 
                  alt="Empty state" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-semibold font-[Fredoka] mb-2 text-foreground">
                No Coloring Pages Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start creating your first coloring page!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pages.map((page, idx) => (
                <GalleryCard
                  key={page.id}
                  page={page}
                  index={idx}
                  onDelete={handleDelete}
                  onDownload={handleDownloadPng}
                  onView={handleViewDetails}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl" data-testid="preview-dialog">
          <DialogHeader>
            <DialogTitle className="font-[Fredoka] text-2xl">
              {selectedPage?.prompt}
            </DialogTitle>
          </DialogHeader>
          {selectedPage && (
            <div className="mt-4 space-y-6">
              <div className="bg-white rounded-lg p-4 shadow-inner">
                <img
                  src={`data:image/png;base64,${selectedPage.image_data}`}
                  alt="Coloring page"
                  className="w-full h-auto rounded"
                />
              </div>
              <DownloadBar imageData={selectedPage.image_data} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GalleryCard({ page, index, onDelete, onDownload, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card 
        className="relative rounded-xl border bg-white hover:shadow-lg transition-all cursor-pointer overflow-hidden"
        data-testid="gallery-item-card"
        onClick={() => onView(page)}
      >
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={`data:image/png;base64,${page.image_data}`}
            alt={page.prompt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold font-[Fredoka] text-foreground truncate">
                {page.prompt}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(page.created_at).toLocaleDateString()}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs ml-2">
              {page.complexity}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={(e) => onDownload(page.image_data, e)}
              className="flex-1 rounded-full bg-[hsl(var(--primary))] hover:bg-[hsl(8_85%_58%)] transition-all"
              data-testid="quick-download-button"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => onDelete(page.id, e)}
              className="rounded-full hover:bg-destructive hover:text-destructive-foreground transition-all"
              data-testid="delete-button"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}