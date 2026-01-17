import { ItemCard } from "@/components/item-card";
import { ItemFilters } from "@/components/item-filters";
import { PersonalizedItems } from "@/components/personalized-items";
import { getItems, getUsers } from "@/lib/data";
import type { ItemWithSeller } from "@/lib/types";

export default async function Home() {
  const allItems = await getItems();
  const users = await getUsers();

  const itemsWithSeller = allItems
    .map((item) => ({
      ...item,
      seller: users.find((user) => user.id === item.sellerId),
    }))
    .filter((item): item is ItemWithSeller => Boolean(item.seller));

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

      <ItemFilters />

      <PersonalizedItems allItems={itemsWithSeller} />

      <section aria-labelledby="all-items-heading">
        <div className="flex items-center justify-between mb-4">
           <h2 id="all-items-heading" className="text-2xl font-headline text-foreground">All Items</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsWithSeller.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
