import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import DownloadBar from "../components/DownloadBar";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [complexity, setComplexity] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await axios.post(`${API_URL}/generate`, {
        prompt: prompt.trim(),
        complexity
      });

      setGeneratedImage(response.data);
      toast.success("Coloring page generated!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error.response?.data?.detail || "Failed to generate coloring page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-[Fredoka] text-center mb-4 text-foreground">
            Generate Your Coloring Page
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-base">
            Describe what you'd like to color and watch AI bring it to life
          </p>

          {/* Generation Form */}
          <Card className="p-6 sm:p-8 rounded-xl mb-8" data-testid="generate-form">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <Label htmlFor="prompt" className="text-base font-semibold mb-2 block">
                  What would you like to create?
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., friendly dinosaur in a jungle, beautiful butterfly, space rocket..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full min-h-28 rounded-lg border bg-white/90 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] text-base"
                  data-testid="prompt-textarea"
                  disabled={loading}
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Complexity Level
                </Label>
                <RadioGroup 
                  value={complexity} 
                  onValueChange={setComplexity}
                  className="flex gap-4"
                  data-testid="complexity-selector"
                  disabled={loading}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="simple" id="simple" />
                    <Label htmlFor="simple" className="cursor-pointer">Simple</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="detailed" id="detailed" />
                    <Label htmlFor="detailed" className="cursor-pointer">Detailed</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={loading || !prompt.trim()}
                className="w-full h-12 rounded-full bg-[hsl(var(--primary))] text-white hover:bg-[hsl(8_85%_58%)] transition-all hover:scale-105 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                data-testid="generate-form-submit-button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Coloring Page
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Preview Area */}
          {(loading || generatedImage) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 rounded-xl" data-testid="preview-pane">
                <h2 className="text-xl font-semibold font-[Fredoka] mb-4 text-foreground">
                  Your Coloring Page
                </h2>
                {loading ? (
                  <Skeleton className="h-[420px] w-full rounded-lg" />
                ) : (
                  <div className="space-y-6">
                    <div className="bg-white rounded-lg p-4 shadow-inner">
                      <img
                        src={`data:image/png;base64,${generatedImage.image_data}`}
                        alt="Generated coloring page"
                        className="w-full h-auto rounded"
                        data-testid="generated-image"
                      />
                    </div>
                    <DownloadBar imageData={generatedImage.image_data} />
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}