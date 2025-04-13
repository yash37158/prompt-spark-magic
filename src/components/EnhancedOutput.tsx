
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";
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
    <Card className="mt-8 border-2 border-accent/30 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Enhanced Prompt</CardTitle>
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
      <CardContent className="pt-4">
        <div className="bg-secondary p-4 rounded-md whitespace-pre-wrap">
          {enhancedPrompt}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedOutput;
