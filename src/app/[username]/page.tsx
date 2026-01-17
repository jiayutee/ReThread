import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck } from "lucide-react";
import { getUser, getItemsBySeller } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImageMap, User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ItemCard } from "@/components/item-card";

export default async function UserProfilePage({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  if (!user) {
    notFound();
  }
  const items = await getItemsBySeller(user.id);
  const itemsWithSeller = items.map(item => ({ ...item, seller: user }));

  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as ImageMap);

  const userImage = imageMap[user.profilePicture];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Avatar className="h-32 w-32 border-4 border-background shadow-md">
          <AvatarImage src={userImage.imageUrl} alt={user.username} data-ai-hint={userImage.imageHint} />
          <AvatarFallback className="text-4xl">{user.username.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-headline text-foreground flex items-center justify-center md:justify-start gap-2">
            {user.username}
            {user.emailVerified && <ShieldCheck className="h-6 w-6 text-green-600" title="Email Verified" />}
          </h1>
          <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-1 mt-1">
            <MapPin className="h-4 w-4" />
            {user.city}
          </p>
          <p className="max-w-xl mt-4 text-foreground/80 leading-relaxed">
            {user.bio}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-headline text-foreground mb-6">
        {user.username}'s Listings ({items.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemsWithSeller.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    const users = await getUsers();
    return users.map(user => ({
        username: user.username,
    }));
}
