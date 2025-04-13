
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
      
      // Enhanced prompt generation logic
      const enhanced = enhancePromptLogic(prompt);
      setEnhancedPrompt(enhanced);
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  // More dynamic prompt enhancement logic
  const enhancePromptLogic = (prompt: string): string => {
    // Original prompt as base
    let enhanced = prompt;
    
    // Analyze the prompt content
    const hasQuestion = prompt.includes("?");
    const wordCount = prompt.split(/\s+/).length;
    const containsTechnicalTerms = /\b(api|code|programming|algorithm|database|function|variable)\b/i.test(prompt);
    const containsCreativeTerms = /\b(story|write|creative|imagine|design|art|character)\b/i.test(prompt);
    const containsAnalyticalTerms = /\b(analyze|compare|contrast|evaluate|assess|explain|why|how)\b/i.test(prompt);
    
    // Add specificity based on prompt type
    if (containsTechnicalTerms) {
      enhanced += " Include specific code examples, step-by-step explanations, and best practices. Consider edge cases and performance implications.";
    } else if (containsCreativeTerms) {
      enhanced += " Use vivid descriptions, sensory details, and emotional elements. Create memorable characters and settings with distinct characteristics.";
    } else if (containsAnalyticalTerms) {
      enhanced += " Provide multiple perspectives, relevant data points, and logical frameworks. Consider counterarguments and limitations of the analysis.";
    } else if (wordCount < 8) {
      enhanced += " Please expand on this topic with comprehensive details and specific examples.";
    }
    
    // Add tone guidance if not specified
    if (!enhanced.toLowerCase().includes("tone") && !enhanced.toLowerCase().includes("style")) {
      if (containsTechnicalTerms) {
        enhanced += " Use a clear, precise, and technically accurate tone.";
      } else if (containsCreativeTerms) {
        enhanced += " Use an engaging, descriptive, and imaginative tone.";
      } else if (hasQuestion) {
        enhanced += " Provide a thorough, educational response that builds understanding step by step.";
      } else {
        enhanced += " Use a professional yet conversational tone that balances expertise with accessibility.";
      }
    }
    
    // Add structure guidance based on content type
    if (!enhanced.toLowerCase().includes("structure") && !enhanced.toLowerCase().includes("format")) {
      if (wordCount > 15 || containsAnalyticalTerms) {
        enhanced += " Structure the response with clear headings, subheadings, and bullet points where appropriate.";
      } else if (containsTechnicalTerms) {
        enhanced += " Format with clear sections including context, explanation, code examples, and practical applications.";
      } else if (containsCreativeTerms) {
        enhanced += " Organize the content with a clear narrative flow including introduction, development, and resolution.";
      }
    }
    
    // Add examples request if complex topic
    if (wordCount > 10 && !enhanced.toLowerCase().includes("example")) {
      enhanced += " Include relevant examples to illustrate key points and aid understanding.";
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
