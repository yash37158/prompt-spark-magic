
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  onEnhance: (prompt: string) => void;
  isEnhancing: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onEnhance, isEnhancing }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onEnhance(prompt);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="prompt-input" className="text-lg font-semibold mb-2">
          Enter Your Prompt
        </label>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-md textarea-gradient">
            <Textarea
              id="prompt-input"
              placeholder="Type your prompt here... (e.g., 'Write a story about a space explorer')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-32 resize-y p-4 focus:outline-none"
            />
          </div>
          <Button 
            type="submit" 
            className="enhance-button px-6 py-2 rounded-md flex items-center gap-2"
            disabled={!prompt.trim() || isEnhancing}
          >
            <Sparkles size={16} />
            {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PromptInput;
