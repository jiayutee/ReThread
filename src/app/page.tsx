'use client';

import { useState, useEffect } from "react";
import { ItemCard } from "@/components/item-card";
import { ItemFilters } from "@/components/item-filters";
import { PersonalizedItems } from "@/components/personalized-items";
import { getItems, getUsers } from "@/lib/data";
import type { ItemWithSeller } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [allItems, setAllItems] = useState<ItemWithSeller[]>([]);
  const [sortedItems, setSortedItems] = useState<ItemWithSeller[]>([]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const itemsData = await getItems();
      const usersData = await getUsers();

      const itemsWithSeller = itemsData
        .map((item) => ({
          ...item,
          seller: usersData.find((user) => user.id === item.sellerId),
        }))
        .filter((item): item is ItemWithSeller => Boolean(item.seller));
      
      setAllItems(itemsWithSeller);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let items = [...allItems];
    switch (sortOption) {
      case 'price-asc':
        items.sort((a, b) => {
            const priceA = a.priceType === 'Fixed' ? a.price : (a.priceType === 'Free' ? 0 : Infinity);
            const priceB = b.priceType === 'Fixed' ? b.price : (b.priceType === 'Free' ? 0 : Infinity);
            return priceA - priceB;
        });
        break;
      case 'price-desc':
        items.sort((a, b) => {
            const isFixedA = a.priceType === 'Fixed';
            const isFixedB = b.priceType === 'Fixed';
            if (isFixedA && !isFixedB) return -1;
            if (!isFixedA && isFixedB) return 1;
            if (isFixedA && isFixedB) return b.price - a.price;

            // Both are not 'Fixed', so they are 'Free' or 'Trade'
            const isTradeA = a.priceType === 'Trade';
            const isTradeB = b.priceType === 'Trade';
            if (isTradeA && !isTradeB) return -1; // Trade before Free
            if (!isTradeA && isTradeB) return 1;  // Free after Trade
            
            return 0;
        });
        break;
      case 'newest':
      default:
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    // The 'distance' sort option is not implemented as location data is not available for calculation.
    if (sortOption !== 'distance') {
        setSortedItems(items);
    }
  }, [sortOption, allItems]);
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-foreground mb-2">
          Discover Unique Finds
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of second-hand treasures and give fashion a second life.
        </p>
      </div>

      <ItemFilters onSortChange={handleSortChange} />

      <PersonalizedItems allItems={allItems} />

      <section aria-labelledby="all-items-heading">
        <div className="flex items-center justify-between mb-4">
           <h2 id="all-items-heading" className="text-2xl font-headline text-foreground">All Items</h2>
        </div>
        {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-[400px] w-full rounded-lg" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        )}
      </section>
    </div>
  );
}
