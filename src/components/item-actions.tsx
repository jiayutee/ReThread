'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Heart, Share2 } from "lucide-react";

export function ItemActions() {
    const { toast } = useToast();

    const comingSoon = () => {
        toast({
            title: "Coming soon!",
            description: "This feature is not yet implemented.",
        });
    }

    return (
        <div className="flex items-center space-x-4 mb-6">
            <Button size="lg" className="flex-1" onClick={comingSoon}>
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Seller
            </Button>
            <Button variant="outline" size="icon" onClick={comingSoon}>
              <Heart className="h-5 w-5" />
              <span className="sr-only">Favorite</span>
            </Button>
            <Button variant="outline" size="icon" onClick={comingSoon}>
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
        </div>
    );
}
