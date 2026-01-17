'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ListFilter, SlidersHorizontal, MapPin } from "lucide-react";

export function ItemFilters() {
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
            <DropdownMenuCheckboxItem>Tops</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Bottoms</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Dresses</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Outerwear</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Accessories</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Shoes</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Condition</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem>New with tags</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Like new</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Gently used</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Used</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
         <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            Distance
        </Button>
      </div>

      <div className="flex-grow"></div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
        <Select defaultValue="newest">
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
