import { Download, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import jsPDF from "jspdf";

export default function DownloadBar({ imageData }) {
  const handleDownloadPng = () => {
    try {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${imageData}`;
      link.download = `coloring-page-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("PNG downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PNG");
    }
  };

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF({
        unit: 'pt',
        format: 'a4'
      });

      const margin = 36;
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();

      const imgDataUrl = `data:image/png;base64,${imageData}`;
      doc.addImage(imgDataUrl, 'PNG', margin, margin, pageW - margin * 2, pageH - margin * 2);
      doc.save(`coloring-page-${Date.now()}.pdf`);
      
      toast.success("PDF downloaded!");
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Failed to download PDF");
    }
  };

  return (
    <div 
      className="flex items-center gap-3 p-4 rounded-full bg-white/90 backdrop-blur border shadow-md"
      data-testid="download-bar"
    >
      <Button
        onClick={handleDownloadPng}
        className="flex-1 h-11 rounded-full bg-[hsl(var(--primary))] text-white hover:bg-[hsl(8_85%_58%)] transition-all hover:scale-105 active:scale-98"
        data-testid="download-png-button"
      >
        <Download className="w-4 h-4 mr-2" />
        Download PNG
      </Button>
      <Button
        onClick={handleDownloadPdf}
        variant="outline"
        className="flex-1 h-11 rounded-full bg-black text-white hover:bg-gray-800 border-0 transition-all hover:scale-105 active:scale-98"
        data-testid="download-pdf-button"
      >
        <FileText className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
    </div>
  );
}