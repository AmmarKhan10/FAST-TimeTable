import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import type { Class } from "@shared/schema";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: allClasses = [] } = useQuery({
    queryKey: ["/api/classes"],
  });

  useEffect(() => {
    if (value.length > 0 && allClasses.length > 0) {
      const classCodes = Array.from(new Set(allClasses.map((cls: Class) => cls.classCode)));
      const filteredSuggestions = classCodes
        .filter(code => code.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [value, allClasses]);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleInputBlur = () => {
    // Hide suggestions after a short delay to allow clicking
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for class (e.g., BCS-1A, BCS-5B)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleInputBlur}
          className="pl-10 py-3 bg-card border-border focus:ring-2 focus:ring-ring"
          data-testid="search-input"
        />
      </div>
      
      {/* Search suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions absolute top-full left-0 right-0 z-50 bg-card border border-border border-t-0 rounded-b-lg max-h-48 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-3 py-2 hover:bg-muted rounded cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(suggestion)}
                data-testid={`suggestion-${index}`}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
