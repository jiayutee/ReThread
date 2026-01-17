import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Tag,
  MapPin,
  ShieldCheck,
  Flag,
} from "lucide-react";

import { getItem, getUser } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { ImageMap } from "@/lib/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ItemActions } from "@/components/item-actions";

export default async function ItemPage({ params }: { params: { id: string } }) {
  const item = await getItem(params.id);
  if (!item) {
    notFound();
  }

  const seller = await getUser(item.sellerId); // Assuming getUser can fetch by ID too
  if (!seller) {
    // Or handle this case gracefully
    notFound();
  }
  
  const imageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
  }, {} as ImageMap);
  
  const itemImage = imageMap[item.images[0]];
  const sellerImage = imageMap[seller.profilePicture];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={itemImage.imageUrl}
            alt={item.title}
            width={800}
            height={1067}
            className="object-cover w-full h-full"
            data-ai-hint={itemImage.imageHint}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-headline text-foreground mb-2">
            {item.title}
          </h1>
          <div className="text-3xl font-bold text-primary mb-4">
            {item.priceType === "Fixed" ? `$${item.price.toFixed(2)}` : item.priceType}
          </div>

          <ItemActions />

          <Separator className="my-6"/>

          <div>
            <h2 className="font-headline text-xl mb-3">Description</h2>
            <p className="text-foreground/80 leading-relaxed">{item.description}</p>
          </div>
          
          <Separator className="my-6"/>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong className="font-medium">Condition:</strong> {item.condition}</div>
            <div><strong className="font-medium">Size:</strong> {item.size}</div>
            <div><strong className="font-medium">Category:</strong> {item.category}</div>
            <div className="flex items-center"><MapPin className="h-4 w-4 mr-1 text-muted-foreground"/> {item.location}</div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-normal"><Tag className="h-3 w-3 mr-1"/>{tag}</Badge>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <div className="bg-card p-4 rounded-lg border flex justify-between items-center">
              <Link href={`/${seller.username}`} className="flex items-center gap-4 group">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={sellerImage.imageUrl} alt={seller.username} data-ai-hint={sellerImage.imageHint} />
                  <AvatarFallback>{seller.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold group-hover:text-primary transition-colors flex items-center gap-1">
                    {seller.username}
                    {seller.emailVerified && <ShieldCheck className="h-4 w-4 text-green-600" title="Email Verified" />}
                  </p>
                  <p className="text-sm text-muted-foreground">View profile</p>
                </div>
              </Link>
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Flag className="h-4 w-4 mr-2"/>
                      Report
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Report this item</AlertDialogTitle>
                      <AlertDialogDescription>
                        Please provide a reason for reporting this item. Your report will be reviewed by our team.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid w-full gap-2">
                        <Label htmlFor="report-reason">Reason</Label>
                        <Textarea placeholder="e.g. Prohibited item, inaccurate description..." id="report-reason" />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Submit Report</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
