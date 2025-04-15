
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  category: string;
  tabId: string;
  type: "unit" | "logic";
  description?: string;
}

interface SearchBarProps {
  allItems: SearchResult[];
  onSelect: (item: SearchResult) => void;
  className?: string;
}

export function SearchBar({ allItems, onSelect, className }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults([]);
      setIsResultsVisible(false);
      return;
    }

    const filtered = allItems.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchTermLower) ||
        (item.description && item.description.toLowerCase().includes(searchTermLower))
      );
    });

    setResults(filtered);
    setIsResultsVisible(true);
  }, [searchTerm, allItems]);

  const handleSelect = (item: SearchResult) => {
    onSelect(item);
    setSearchTerm("");
    setIsResultsVisible(false);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search converters..."
          className="pl-9 pr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsResultsVisible(true);
          }}
          onBlur={() => {
            // Delay hiding results to allow clicking on them
            setTimeout(() => setIsResultsVisible(false), 150);
          }}
        />
      </div>

      {isResultsVisible && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border border-border bg-popover shadow-md animate-fade-in">
          <div className="py-1">
            {results.map((result, index) => (
              <button
                key={index}
                className="flex w-full flex-col items-start px-3 py-2 text-left hover:bg-accent"
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent blur from firing before click
                  handleSelect(result);
                }}
              >
                <div className="font-medium">{result.title}</div>
                <div className="text-sm text-muted-foreground">
                  {result.type === "unit" ? "Unit" : "Logic"} converter
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
