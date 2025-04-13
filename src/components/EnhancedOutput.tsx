
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck, FileText, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedOutputProps {
  enhancedPrompt: string | null;
}

const EnhancedOutput: React.FC<EnhancedOutputProps> = ({ enhancedPrompt }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (!enhancedPrompt) return;
    
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard!",
      description: "The enhanced prompt has been copied to your clipboard.",
      duration: 3000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const formatContent = (content: string) => {
    // Check if content appears to be markdown with headings
    const hasMdHeadings = /^#+ /m.test(content);
    
    if (hasMdHeadings) {
      // Simple markdown formatting
      return content
        .split('\n')
        .map((line, index) => {
          // Format headings
          if (line.startsWith('# ')) {
            return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
          } else if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-semibold mt-3 mb-2">{line.substring(3)}</h2>;
          } else if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-medium mt-3 mb-1">{line.substring(4)}</h3>;
          } else if (line.startsWith('- ')) {
            return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
          } else if (line.startsWith('1. ')) {
            return <li key={index} className="ml-6 list-decimal">{line.substring(3)}</li>;
          } else if (line === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="my-1.5">{line}</p>;
          }
        });
    }
    
    // If not markdown, just return with basic formatting
    return <div className="whitespace-pre-wrap">{content}</div>;
  };

  if (!enhancedPrompt) return null;

  // Determine if this is a PRD format
  const isPRD = enhancedPrompt.includes("Project Requirement Document") || 
                enhancedPrompt.includes("PRD");

  return (
    <Card className={`mt-8 border-2 ${isPRD ? 'border-primary/40' : 'border-accent/30'} shadow-lg transition-all duration-300 hover:shadow-accent/20`}>
      <CardHeader className={`flex flex-row items-center justify-between pb-2 ${isPRD ? 'bg-gradient-to-r from-primary/20 to-secondary/20' : 'bg-gradient-to-r from-primary/10 to-accent/10'} rounded-t-lg`}>
        <div className="flex items-center gap-2">
          {isPRD ? (
            <FileText className="text-primary" size={20} />
          ) : (
            <Sparkles className="text-accent" size={20} />
          )}
          <CardTitle className="text-xl font-semibold gradient-text">
            {isPRD ? "Project Requirement Document" : "Enhanced Prompt"}
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="copy-button"
          aria-label="Copy enhanced prompt"
        >
          {copied ? (
            <ClipboardCheck size={18} />
          ) : (
            <Clipboard size={18} />
          )}
          <span className="ml-2">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-6 pb-6">
        <div className={`${isPRD ? 'bg-card/90' : 'bg-secondary/80'} p-6 rounded-md text-lg leading-relaxed shadow-inner border border-accent/10`}>
          {formatContent(enhancedPrompt)}
        </div>
        <div className="mt-4 text-sm text-muted-foreground px-2">
          <p className="flex items-center gap-1">
            <Sparkles className="text-accent" size={14} />
            {isPRD 
              ? "This PRD template helps structure your project requirements for better implementation"
              : "This enhanced prompt is designed to generate higher quality AI responses"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedOutput;
