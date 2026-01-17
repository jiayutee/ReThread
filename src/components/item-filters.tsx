'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Item } from "@/lib/types";

const CATEGORIES: Item['category'][] = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes'];
const CONDITIONS: Item['condition'][] = ['New with tags', 'Like new', 'Gently used', 'Used'];

interface ItemFiltersProps {
  onSortChange: (value: string) => void;
  filters: {
    category: string[];
    condition: string[];
  };
  onFilterChange: (type: 'category' | 'condition', value: string) => void;
}

export function ItemFilters({ onSortChange, filters, onFilterChange }: ItemFiltersProps) {
  const { toast } = useToast();

  const handleSortChange = (value: string) => {
    if (value === 'distance') {
      toast({
        title: "Coming soon!",
        description: "Sorting by distance is not yet implemented.",
      });
    } else {
      onSortChange(value);
    }
  };

  const comingSoon = () => {
    toast({
        title: "Coming soon!",
        description: "This feature is not yet implemented.",
    });
  }

  return (
    <div className="bg-card p-4 rounded-lg border mb-8 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] sm:min-w-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CATEGORIES.map(category => (
                <DropdownMenuCheckboxItem
                    key={category}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => onFilterChange('category', category)}
                >
                    {category}
                </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Condition</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {CONDITIONS.map(condition => (
                <DropdownMenuCheckboxItem
                    key={condition}
                    checked={filters.condition.includes(condition)}
                    onCheckedChange={() => onFilterChange('condition', condition)}
                >
                    {condition}
                </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
         <Button variant="outline" onClick={comingSoon}>
            <MapPin className="mr-2 h-4 w-4" />
            Distance
        </Button>
      </div>

      <div className="flex-grow"></div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
        <Select defaultValue="newest" onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="distance">Distance: Nearest First</SelectItem>
            </SelectContent>
        </Select>
      </div>
    </div>
  );
}
