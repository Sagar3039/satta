
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const BulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      // In a real app, you would process the file and upload to Firebase
      toast({
        title: "File received",
        description: `${file.name} will be processed`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please select a file first",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Bulk Upload</h3>
      </div>
      <div className="flex gap-4 items-center">
        <Input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="bg-black/60 border-white/20"
        />
        <Button 
          className="bg-secondary hover:bg-secondary/80"
          onClick={handleUpload}
        >
          Upload
        </Button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Upload CSV or Excel file with game results
      </p>
    </div>
  );
};

export default BulkUpload;
