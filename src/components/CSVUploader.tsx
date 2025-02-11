
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

const CSVUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const parseCSV = (text: string) => {
    const rows = text.split('\n');
    const headers = rows[0].split(',').map(header => header.trim());
    
    return rows.slice(1)
      .filter(row => row.trim())
      .map(row => {
        const values = row.split(',').map(value => value.trim());
        const entry: { [key: string]: string } = {};
        headers.forEach((header, index) => {
          entry[header] = values[index];
        });
        return entry;
      });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const text = await file.text();
      const questions = parseCSV(text);

      // Get categories to match category names with IDs
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name');

      if (!categories) throw new Error('Failed to fetch categories');

      // Process each question
      for (const question of questions) {
        const categoryId = categories.find(c => c.name === question.category)?.id;
        if (!categoryId) {
          toast({
            title: "Warning",
            description: `Category '${question.category}' not found for question '${question.title}'`,
            variant: "destructive"
          });
          continue;
        }

        const { error } = await supabase
          .from('questions')
          .insert({
            title: question.title,
            description: question.description,
            answer: question.answer,
            category_id: categoryId,
            difficulty: question.difficulty,
            tags: [question.category],
            code_example: question.code_example || null
          });

        if (error) {
          console.error('Error inserting question:', error);
          toast({
            title: "Error",
            description: `Failed to insert question: ${question.title}`,
            variant: "destructive"
          });
        }
      }

      // Refresh questions list
      queryClient.invalidateQueries({ queryKey: ['admin-questions'] });

      toast({
        title: "Success",
        description: "Questions uploaded successfully",
      });
    } catch (error) {
      console.error('Error processing CSV:', error);
      toast({
        title: "Error",
        description: "Failed to process CSV file. Please check the format.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label 
        htmlFor="csv-upload"
        className={`inline-flex items-center px-4 py-2 rounded-lg ${
          isUploading 
            ? 'bg-neutral-light cursor-not-allowed' 
            : 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
        } transition-colors`}
      >
        <Upload size={20} className="mr-2" />
        {isUploading ? 'Uploading...' : 'Upload CSV'}
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        disabled={isUploading}
        className="hidden"
      />
      <span className="text-sm text-neutral-dark">
        CSV Format: title, description, answer, category, difficulty, code_example
      </span>
    </div>
  );
};

export default CSVUploader;
