'use client';
import { BrainCircuit } from 'lucide-react';

import { ItemCard } from './item-card';
import type { ItemWithSeller } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface PersonalizedItemsProps {
  recommendations: ItemWithSeller[];
  loading: boolean;
}

export function PersonalizedItems({ recommendations, loading }: PersonalizedItemsProps) {

  if (loading) {
    return (
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-headline text-foreground">Just For You</h2>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {[...Array(4)].map((_, i) => (
                <CarouselItem key={i} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1 space-y-2">
                    <Skeleton className="h-[400px] w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
            loop: recommendations.length > 3,
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
