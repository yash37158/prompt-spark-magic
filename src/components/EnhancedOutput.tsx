
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck, FileText, Sparkles, List, CheckSquare } from "lucide-react";
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
      // Advanced markdown formatting
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
          } else if (line.startsWith('#### ')) {
            return <h4 key={index} className="text-md font-medium mt-2 mb-1">{line.substring(5)}</h4>;
          } else if (line.startsWith('- ')) {
            return (
              <div key={index} className="flex items-start gap-2 ml-6 my-1">
                <List className="h-4 w-4 mt-1 text-primary" />
                <span>{line.substring(2)}</span>
              </div>
            );
          } else if (line.startsWith('1. ') || line.match(/^\d+\.\s/)) {
            const numberMatch = line.match(/^(\d+)\.\s(.*)/);
            if (numberMatch) {
              return (
                <div key={index} className="flex items-start gap-2 ml-6 my-1">
                  <span className="font-medium text-primary">{numberMatch[1]}.</span>
                  <span>{numberMatch[2]}</span>
                </div>
              );
            }
            return <li key={index} className="ml-6 list-decimal my-1">{line.substring(3)}</li>;
          } else if (line === '') {
            return <div key={index} className="h-2"></div>;
          } else {
            return <p key={index} className="my-1.5">{line}</p>;
          }
        });
    }
    
    // Format structured content with sections
    if (content.includes("\n\n")) {
      const sections = content.split("\n\n");
      return sections.map((section, index) => {
        if (section.trim() === "") return null;
        
        if (section.startsWith("Please")) {
          return (
            <div key={index} className="bg-accent/10 p-3 rounded-md my-3 border-l-4 border-accent">
              <p className="italic text-accent-foreground">{section}</p>
            </div>
          );
        }
        
        if (section.includes("\n- ")) {
          const [title, ...items] = section.split("\n");
          return (
            <div key={index} className="my-3">
              <p className="font-medium mb-2">{title}</p>
              <ul className="space-y-1">
                {items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 ml-2">
                    <CheckSquare className="h-4 w-4 mt-1 text-primary" />
                    <span>{item.substring(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        return <p key={index} className="my-2">{section}</p>;
      });
    }
    
    // If not markdown, just return with basic formatting
    return <div className="whitespace-pre-wrap">{content}</div>;
  };

  if (!enhancedPrompt) return null;

  // Determine if this is a PRD format
  const isPRD = enhancedPrompt.includes("Project Requirement Document") || 
                enhancedPrompt.includes("PRD");

  // Determine enhancement type for styling
  const isQuestion = enhancedPrompt.includes("?") && enhancedPrompt.includes("Please provide");
  const isTechnical = enhancedPrompt.includes("technical") && enhancedPrompt.includes("code examples");
  const isCreative = enhancedPrompt.includes("sensory details") || enhancedPrompt.includes("narrative");

  // Set card styling based on the type
  let cardBorderClass = "border-accent/30";
  let cardHeaderClass = "bg-gradient-to-r from-primary/10 to-accent/10";
  let cardIcon = <Sparkles className="text-accent" size={20} />;
  let cardTitle = "Enhanced Prompt";
  let cardDescription = "This enhanced prompt is designed to generate higher quality AI responses";
  
  if (isPRD) {
    cardBorderClass = "border-primary/40";
    cardHeaderClass = "bg-gradient-to-r from-primary/20 to-secondary/20";
    cardIcon = <FileText className="text-primary" size={20} />;
    cardTitle = "Project Requirement Document";
    cardDescription = "This PRD template helps structure your project requirements for better implementation";
  } else if (isQuestion) {
    cardBorderClass = "border-blue-400/40";
    cardHeaderClass = "bg-gradient-to-r from-blue-500/15 to-indigo-500/15";
    cardIcon = <Sparkles className="text-blue-500" size={20} />;
    cardTitle = "Enhanced Question";
    cardDescription = "This format helps you get more comprehensive and structured answers";
  } else if (isTechnical) {
    cardBorderClass = "border-green-400/40";
    cardHeaderClass = "bg-gradient-to-r from-green-500/15 to-emerald-500/15";
    cardIcon = <Sparkles className="text-green-500" size={20} />;
    cardTitle = "Technical Prompt";
    cardDescription = "This technical prompt format will help you get more accurate and detailed technical responses";
  } else if (isCreative) {
    cardBorderClass = "border-purple-400/40";
    cardHeaderClass = "bg-gradient-to-r from-purple-500/15 to-fuchsia-500/15";
    cardIcon = <Sparkles className="text-purple-500" size={20} />;
    cardTitle = "Creative Prompt";
    cardDescription = "This creative prompt format helps generate more engaging and imaginative content";
  }

  return (
    <Card className={`mt-8 border-2 ${cardBorderClass} shadow-lg transition-all duration-300 hover:shadow-accent/20`}>
      <CardHeader className={`flex flex-row items-center justify-between pb-2 ${cardHeaderClass} rounded-t-lg`}>
        <div className="flex items-center gap-2">
          {cardIcon}
          <CardTitle className="text-xl font-semibold gradient-text">
            {cardTitle}
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
        <div className={`bg-card/90 p-6 rounded-md text-lg leading-relaxed shadow-inner border border-accent/10`}>
          {formatContent(enhancedPrompt)}
        </div>
        <div className="mt-4 text-sm text-muted-foreground px-2">
          <p className="flex items-center gap-1">
            <Sparkles className="text-accent" size={14} />
            {cardDescription}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedOutput;
