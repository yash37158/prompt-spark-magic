
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
    // Detect content type and user intent
    const contentAnalysis = analyzeContent(prompt);
    
    // Choose enhancement strategy based on content analysis
    if (contentAnalysis.isBuildRequest) {
      return generatePRD(prompt, contentAnalysis);
    } else if (contentAnalysis.isQuestion) {
      return enhanceQuestion(prompt, contentAnalysis);
    } else if (contentAnalysis.isCreative) {
      return enhanceCreative(prompt, contentAnalysis);
    } else if (contentAnalysis.isTechnical) {
      return enhanceTechnical(prompt, contentAnalysis);
    } else {
      return enhanceGeneral(prompt, contentAnalysis);
    }
  };
  
  // Analyze content to determine intent and characteristics
  const analyzeContent = (prompt: string) => {
    const lowerPrompt = prompt.toLowerCase();
    const wordCount = prompt.split(/\s+/).length;
    
    // Intent detection
    const isBuildRequest = /\b(build|create|develop|make|construct|implement|set up)\b/i.test(prompt);
    const isProductRequest = /\b(product|app|application|website|platform|system|tool|service)\b/i.test(prompt);
    const isQuestion = prompt.includes("?") || /^(how|what|why|when|where|who|which|can|could|would|will|does|do|is|are)\b/i.test(prompt);
    
    // Content type detection
    const isTechnical = /\b(api|code|programming|algorithm|database|function|variable|develop|software|app|application)\b/i.test(prompt) ||
                        /\b(typescript|javascript|react|vue|angular|node|python|java|c#|azure|aws)\b/i.test(prompt);
    const isCreative = /\b(story|write|creative|imagine|design|art|character|novel|plot|narrative)\b/i.test(prompt);
    const isAnalytical = /\b(analyze|compare|contrast|evaluate|assess|explain|why|how)\b/i.test(prompt);
    
    // Specificity analysis
    const isSpecific = wordCount > 15 || prompt.includes(",") || prompt.includes(";");
    const hasToneSpecified = /\b(tone|style|voice|formal|informal|professional|casual|technical|simple)\b/i.test(prompt);
    const hasAudience = /\b(audience|reader|viewer|user|customer|client|stakeholder)\b/i.test(prompt);
    
    // Product type detection (for build requests)
    let productType = "product";
    if (isProductRequest) {
      const productMatches = /\b(app|application|website|platform|system|tool|service|dashboard|api|game|mobile app)\b/i.exec(prompt);
      if (productMatches && productMatches[0]) {
        productType = productMatches[0].toLowerCase();
      }
    }
    
    // Domain detection
    const domainMatches = /\b(healthcare|finance|education|retail|e-commerce|entertainment|social media|productivity|enterprise|gaming)\b/i.exec(prompt);
    const domain = domainMatches ? domainMatches[0].toLowerCase() : null;
    
    return {
      wordCount,
      isQuestion,
      isBuildRequest,
      isProductRequest,
      isTechnical,
      isCreative,
      isAnalytical,
      isSpecific,
      hasToneSpecified,
      hasAudience,
      productType,
      domain,
      originalPrompt: prompt
    };
  };
  
  // Generate PRD for build requests
  const generatePRD = (prompt: string, analysis: any): string => {
    const productType = analysis.productType;
    const domain = analysis.domain || "your industry";
    
    return `# Project Requirement Document (PRD)

## Overview
${prompt}

## Objectives
Please provide detailed objectives for this ${productType}, including:
- Primary goal
- Target audience in ${domain} 
- Key problems it solves for users
- Unique value proposition

## Functional Requirements
1. Core Features (must-have)
   - 
   - 
   - 

2. Secondary Features (nice-to-have)
   - 
   - 

## Technical Specifications
- Recommended tech stack for this ${productType}
- Integration requirements with existing systems
- Security considerations for ${domain}
- Performance requirements and metrics

## User Experience
- User flow for primary interactions
- Key user stories (As a ___, I want to ___, so that ___)
- Design principles to follow for ${domain} ${productType}s
- Accessibility considerations

## Data Management
- Data storage requirements
- Data processing needs
- Privacy considerations for ${domain}

## Timeline and Milestones
- Suggested development phases
- Key deliverables for each phase
- Critical path items

## Success Metrics
- How to measure the success of this ${productType}
- KPIs to track specific to ${domain}
- User adoption strategies

## Risk Assessment
- Potential challenges specific to ${domain}
- Mitigation strategies
- Alternative approaches

Please provide comprehensive details for each section above, maintaining a professional, strategic tone throughout the document.`;
  };
  
  // Enhance questions
  const enhanceQuestion = (prompt: string, analysis: any): string => {
    let enhanced = prompt;
    
    if (analysis.isTechnical) {
      enhanced += "\n\nPlease provide a detailed technical explanation with code examples where appropriate. Consider:\n- Step-by-step breakdown of the solution\n- Edge cases and how to handle them\n- Performance implications and optimization strategies\n- Industry best practices and standards\n- Alternative approaches with pros and cons";
    } else if (analysis.isCreative) {
      enhanced += "\n\nPlease explore this question from multiple creative perspectives. Consider:\n- Different interpretations of the question\n- Diverse viewpoints and approaches\n- Concrete examples and scenarios\n- Underlying principles and patterns\n- Innovative or unconventional angles";
    } else if (analysis.isAnalytical) {
      enhanced += "\n\nPlease provide an in-depth analysis with:\n- Comprehensive examination of relevant factors\n- Evidence-based arguments from credible sources\n- Evaluation of different perspectives\n- Logical reasoning and frameworks\n- Real-world implications and applications";
    } else {
      enhanced += "\n\nPlease provide a thorough response that includes:\n- Clear, direct answer to the question\n- Supporting context and background information\n- Concrete examples or illustrations\n- Nuances or caveats to consider\n- Further questions to explore if relevant";
    }
    
    if (!analysis.hasToneSpecified) {
      enhanced += "\n\nPlease use a conversational yet informative tone, balancing accessibility with depth of expertise.";
    }
    
    return enhanced;
  };
  
  // Enhance creative prompts
  const enhanceCreative = (prompt: string, analysis: any): string => {
    let enhanced = prompt;
    
    enhanced += "\n\nWhen creating this content, please include:\n- Vivid sensory details and descriptions\n- Well-developed characters with clear motivations and conflicts\n- Coherent narrative structure with satisfying pacing\n- Thematic depth and meaningful subtext\n- Engaging dialogue that reveals character and advances the story";
    
    if (!analysis.hasToneSpecified) {
      enhanced += "\n\nPlease use an engaging, immersive style that draws the reader in and creates an emotional connection.";
    }
    
    return enhanced;
  };
  
  // Enhance technical prompts
  const enhanceTechnical = (prompt: string, analysis: any): string => {
    let enhanced = prompt;
    
    enhanced += "\n\nWhen addressing this technical request, please include:\n- Clear, systematic explanation of concepts and processes\n- Practical code examples with comments explaining key parts\n- Best practices and optimization techniques\n- Common pitfalls and how to avoid them\n- Resources for further learning";
    
    if (!analysis.hasToneSpecified) {
      enhanced += "\n\nPlease use a precise, accessible technical tone that balances detail with clarity.";
    }
    
    return enhanced;
  };
  
  // Enhance general prompts
  const enhanceGeneral = (prompt: string, analysis: any): string => {
    let enhanced = prompt;
    
    if (analysis.wordCount < 10) {
      enhanced += "\n\nPlease provide a comprehensive response that includes:\n- Detailed explanation with clear context\n- Concrete examples or case studies\n- Different perspectives or approaches\n- Practical applications or implications\n- Relevant facts, data, or evidence";
    }
    
    if (!analysis.hasToneSpecified) {
      enhanced += "\n\nPlease use a balanced, informative tone that is engaging and accessible.";
    }
    
    if (!analysis.isSpecific) {
      enhanced += "\n\nPlease structure your response with clear sections and bullet points where appropriate to enhance readability.";
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
