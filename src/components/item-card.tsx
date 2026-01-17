import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Item, User } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImageMap } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item & { seller: User };
  className?: string;
}

export function ItemCard({ item, className }: ItemCardProps) {
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as ImageMap);

  const itemImage = imageMap[item.images[0]];
  const sellerImage = imageMap[item.seller.profilePicture];

  const getPriceLabel = () => {
    switch (item.priceType) {
      case "Free":
        return "Free";
      case "Trade":
        return "For Trade";
      case "Fixed":
        return `$${item.price.toFixed(2)}`;
    }
  };

  return (
    <Card className={cn("overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1", className)}>
      <CardHeader className="p-0 relative">
        <Link href={`/items/${item.id}`} className="block">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={itemImage.imageUrl}
              alt={item.title}
              width={600}
              height={800}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={itemImage.imageHint}
            />
          </div>
        </Link>
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
        >
          {item.condition}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-lg mb-2">
          <Link href={`/items/${item.id}`} className="hover:text-primary transition-colors">
            {item.title}
          </Link>
        </CardTitle>
        <p className="font-bold text-primary text-lg">{getPriceLabel()}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/${item.seller.username}`} className="flex items-center gap-3 group/footer">
          <Avatar className="h-9 w-9">
             <AvatarImage 
              src={sellerImage.imageUrl} 
              alt={item.seller.username} 
              data-ai-hint={sellerImage.imageHint}
            />
            <AvatarFallback>{item.seller.username.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium group-hover/footer:text-primary transition-colors">{item.seller.username}</p>
            <p className="text-xs text-muted-foreground">{item.location}</p>
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
}
