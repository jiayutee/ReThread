'use client';
import { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

import { personalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { ItemCard } from './item-card';
import type { ItemWithSeller } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface PersonalizedItemsProps {
  allItems: ItemWithSeller[];
}

export function PersonalizedItems({ allItems }: PersonalizedItemsProps) {
  const [recommendations, setRecommendations] = useState<ItemWithSeller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecommendations() {
      try {
        const input = {
          browsingHistory: ['item-5', 'item-4'], // Mock browsing history
          savedSearches: ['denim', 'vintage jacket'], // Mock saved searches
          userProfile: {
            userId: 'user-1',
            location: 'San Francisco, CA',
            stylePreferences: ['vintage', 'casual'],
            sizePreferences: ['M', '28'],
          },
          availableItems: allItems.map(item => item.id),
        };

        const result = await personalizedRecommendations(input);
        const recommendedItems = allItems.filter(item => result.recommendedItems.includes(item.id));
        setRecommendations(recommendedItems);
      } catch (error) {
        console.error("Failed to get personalized recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    getRecommendations();
  }, [allItems]);

  if (loading) {
    return (
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-headline text-foreground">Just For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[400px] w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="recommendations-heading" className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <h2 id="recommendations-heading" className="text-2xl font-headline text-foreground">Just For You</h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {recommendations.map(item => (
              <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <div className="p-1">
                  <ItemCard item={item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
    </section>
  );
}
