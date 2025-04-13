
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
    const containsTechnicalTerms = /\b(api|code|programming|algorithm|database|function|variable|develop|software|app|application)\b/i.test(prompt);
    const containsCreativeTerms = /\b(story|write|creative|imagine|design|art|character)\b/i.test(prompt);
    const containsAnalyticalTerms = /\b(analyze|compare|contrast|evaluate|assess|explain|why|how)\b/i.test(prompt);
    
    // Check if this is a build/create type request
    const isBuildRequest = /\b(build|create|develop|make|construct|implement|set up)\b/i.test(prompt);
    const isProductRequest = /\b(product|app|application|website|platform|system|tool|service)\b/i.test(prompt);
    
    // PRD format for build requests
    if (isBuildRequest && isProductRequest) {
      enhanced = `# Project Requirement Document (PRD)

## Overview
${prompt}

## Objectives
Please provide detailed objectives for this ${/\b(app|application|website|platform|system|tool|service)\b/i.exec(prompt)?.[0] || "product"}, including:
- Primary goal
- Target audience
- Key problems it solves

## Functional Requirements
1. Core Features (must-have)
   - 
   - 
   - 

2. Secondary Features (nice-to-have)
   - 
   - 

## Technical Specifications
- Recommended tech stack
- Integration requirements
- Security considerations
- Performance requirements

## User Experience
- User flow
- Key user stories
- Design principles to follow

## Timeline and Milestones
- Suggested development phases
- Key deliverables for each phase

## Success Metrics
- How to measure the success of this project
- KPIs to track

Please provide comprehensive details for each section above, maintaining a professional, strategic tone throughout the document.`;
      
      return enhanced;
    }
    
    // Technical domain customization
    if (containsTechnicalTerms) {
      if (hasQuestion) {
        enhanced += " Please provide a detailed technical explanation with code examples where appropriate. Consider edge cases, performance implications, and industry best practices. If applicable, include implementation alternatives with pros and cons of each approach.";
      } else if (isBuildRequest) {
        enhanced += " Please provide a detailed technical implementation plan, including architecture considerations, technology stack recommendations, potential challenges, and implementation steps. Include code snippets or pseudocode where appropriate.";
      } else {
        enhanced += " Include specific code examples, step-by-step explanations, and best practices. Consider edge cases and performance implications.";
      }
    } 
    // Creative domain customization
    else if (containsCreativeTerms) {
      enhanced += " Use vivid descriptions, sensory details, and emotional elements. Create memorable characters and settings with distinct characteristics. Consider narrative structure, pacing, and thematic development.";
    } 
    // Analytical domain customization
    else if (containsAnalyticalTerms) {
      enhanced += " Provide multiple perspectives, relevant data points, and logical frameworks. Consider counterarguments, limitations of the analysis, and practical implications of conclusions.";
    } 
    // General enhancement for short prompts
    else if (wordCount < 8) {
      enhanced += " Please expand on this topic with comprehensive details, specific examples, and practical applications. Consider different perspectives and contexts.";
    }
    
    // Add tone guidance if not specified
    if (!enhanced.toLowerCase().includes("tone") && !enhanced.toLowerCase().includes("style")) {
      if (containsTechnicalTerms) {
        enhanced += " Use a clear, precise, and technically accurate tone that balances detail with readability.";
      } else if (containsCreativeTerms) {
        enhanced += " Use an engaging, descriptive, and imaginative tone that evokes emotion and sensory experiences.";
      } else if (hasQuestion) {
        enhanced += " Provide a thorough, educational response that builds understanding step by step, using a conversational yet authoritative tone.";
      } else if (isBuildRequest) {
        enhanced += " Use a professional, strategic tone appropriate for business stakeholders and technical implementers alike.";
      } else {
        enhanced += " Use a professional yet conversational tone that balances expertise with accessibility.";
      }
    }
    
    // Add structure guidance based on content type
    if (!enhanced.toLowerCase().includes("structure") && !enhanced.toLowerCase().includes("format")) {
      if (wordCount > 15 || containsAnalyticalTerms) {
        enhanced += " Structure the response with clear headings, subheadings, and bullet points where appropriate to enhance readability and information hierarchy.";
      } else if (containsTechnicalTerms) {
        enhanced += " Format with clear sections including context, explanation, code examples, practical applications, and further resources.";
      } else if (containsCreativeTerms) {
        enhanced += " Organize the content with a clear narrative flow including introduction, development, and resolution, with attention to pacing and transitions.";
      } else if (isBuildRequest) {
        enhanced += " Structure the response with distinct sections covering requirements, implementation details, timeline considerations, and expected outcomes.";
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
