
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck, Sparkles } from "lucide-react";
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

  if (!enhancedPrompt) return null;

  return (
    <Card className="mt-8 border-2 border-accent/30 shadow-lg transition-all duration-300 hover:shadow-accent/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="text-accent" size={20} />
          <CardTitle className="text-xl font-semibold gradient-text">Enhanced Prompt</CardTitle>
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
        <div className="bg-secondary/80 p-6 rounded-md whitespace-pre-wrap text-lg leading-relaxed shadow-inner border border-accent/10">
          {enhancedPrompt}
        </div>
        <div className="mt-4 text-sm text-muted-foreground px-2">
          <p className="flex items-center gap-1">
            <Sparkles className="text-accent" size={14} />
            This enhanced prompt is designed to generate higher quality AI responses
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedOutput;
