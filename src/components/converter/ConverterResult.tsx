
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConverterResultProps {
  result: string;
}

export function ConverterResult({ result }: ConverterResultProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-md border bg-muted/50 p-3 mt-2">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-sm text-muted-foreground">Result:</div>
          <div className="font-medium text-base break-all">
            {result || "—"}
          </div>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleCopy}
          disabled={!result}
          className={`h-8 w-8 transition-all duration-300 ${copied ? 'bg-green-500 text-white border-green-500' : ''}`}
          aria-label="Copy result"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy value</span>
        </Button>
      </div>
    </div>
  );
}
