import Link from "next/link";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "./user-nav";
import { ReThreadLogo } from "../icons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ReThreadLogo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg sm:inline-block">
              ReThread
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="flex-1 sm:flex-none sm:w-64">
            <form>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="w-full pl-9"
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Browse</Button>
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Sell
          </Button>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
