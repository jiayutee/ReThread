import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

function ComingSoonButton() {
    const handleClick = () => {
        toast({
            title: "Coming soon!",
            description: "This feature is not yet implemented.",
        });
    };

    return (
        <Button onClick={handleClick}>Save Changes</Button>
    );
}

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-headline text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and preferences.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This information will be displayed publicly on your profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="JaneDoe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" defaultValue="Fashion lover with a passion for vintage finds." />
            </div>
             <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="San Francisco, CA" />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                Manage your account settings.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="jane.doe@example.com" disabled />
                </div>
                <Button variant="outline" onClick={() => toast({title: "Coming soon!", description: "This feature is not yet implemented."})}>Change Password</Button>
            </CardContent>
        </Card>

        <ComingSoonButton />
      </div>
    </div>
  );
}
