
import React, { useState } from "react";
import PromptInput from "@/components/PromptInput";
import EnhancedOutput from "@/components/EnhancedOutput";
import { Sparkles, Zap } from "lucide-react";

const Index = () => {
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhancePrompt = async (prompt: string) => {
    setIsEnhancing(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is a simple enhancement logic - in a real app, you'd call an AI API
      const enhanced = enhancePromptLogic(prompt);
      setEnhancedPrompt(enhanced);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Simple enhancement logic - this would be replaced with an actual AI API call
  const enhancePromptLogic = (prompt: string): string => {
    // Basic enhancements
    let enhanced = prompt;
    
    // Add more specificity
    if (!enhanced.includes("detailed")) {
      enhanced = enhanced.replace(/\.$/, ", with detailed descriptions.");
    }
    
    // Add tone if not specified
    if (!enhanced.toLowerCase().includes("tone") && !enhanced.toLowerCase().includes("style")) {
      enhanced += " Use a professional and engaging tone.";
    }
    
    // Add length guidance if not present
    if (!enhanced.toLowerCase().includes("word") && !enhanced.toLowerCase().includes("length")) {
      enhanced += " Aim for a comprehensive response with adequate depth.";
    }
    
    // Add structure guidance
    if (!enhanced.toLowerCase().includes("structure") && !enhanced.toLowerCase().includes("format")) {
      enhanced += " Structure the response with clear sections and bullet points where appropriate.";
    }
    
    // Add examples request if not present
    if (!enhanced.toLowerCase().includes("example")) {
      enhanced += " Include relevant examples to illustrate key points.";
    }
    
    return enhanced;
  };

  return (
    <div className="min-h-screen flex flex-col py-12 px-4 sm:px-6">
      <div className="prompt-container">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap size={32} className="text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">
              AI Prompt Enhancer
            </h1>
            <Sparkles size={32} className="text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your basic prompts into powerful instructions that generate better AI responses.
          </p>
        </header>
        
        <main className="space-y-8">
          <PromptInput onEnhance={enhancePrompt} isEnhancing={isEnhancing} />
          <EnhancedOutput enhancedPrompt={enhancedPrompt} />
          
          {!enhancedPrompt && (
            <div className="mt-10 p-6 border border-dashed border-muted-foreground/30 rounded-lg bg-secondary/50">
              <h2 className="text-lg font-medium mb-2">Tips for effective prompts:</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Be specific about what you want the AI to do</li>
                <li>Specify the tone, style, or format you prefer</li>
                <li>Include relevant context or background information</li>
                <li>Break complex requests into clear steps</li>
                <li>Use examples to illustrate what you're looking for</li>
              </ul>
            </div>
          )}
        </main>
        
        <footer className="mt-16 text-center text-muted-foreground">
          <p>© 2025 AI Prompt Enhancer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
