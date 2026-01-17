'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { Image as ImageIcon } from 'lucide-react';

const itemSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description must be at least 10 characters long.'),
  category: z.enum(['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Accessories', 'Shoes'], {
    required_error: "You need to select a category."
  }),
  condition: z.enum(['New with tags', 'Like new', 'Gently used', 'Used'], {
      required_error: "You need to select a condition."
  }),
  size: z.string().min(1, 'Size is required.'),
  tags: z.string().optional(),
  location: z.string().min(2, 'Location is required.'),
  priceType: z.enum(['Fixed', 'Trade', 'Free']),
  price: z.preprocess(
    // Transform empty string to undefined so optional validation works.
    (val) => val === "" ? undefined : val,
    z.coerce.number({invalid_type_error: 'Price must be a number.'})
        .positive('Price must be a positive number.')
        .optional()
  ),
}).refine(data => {
    if (data.priceType === 'Fixed') {
        return data.price !== undefined && data.price > 0;
    }
    return true;
}, {
    message: 'Price is required and must be positive for a fixed price listing.',
    path: ['price'],
});

type ItemFormValues = z.infer<typeof itemSchema>;

export default function SellPage() {
    const router = useRouter();
    const form = useForm<ItemFormValues>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            title: '',
            description: '',
            size: '',
            location: '',
            priceType: 'Fixed',
            tags: '',
        },
    });

    const priceType = form.watch('priceType');

    function onSubmit(values: ItemFormValues) {
        // In a real app, you would handle file uploads and then send the data to your backend.
        // The data layer is mocked, so we can't actually add a new item.
        console.log('Form Submitted:', values);
        
        toast({
            title: "Item Listed! (Simulated)",
            description: "Your item has been successfully listed for sale.",
        });
        
        // Redirect to homepage after submission
        router.push('/');
    }
  
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-headline text-foreground">Sell Your Item</h1>
                <p className="text-muted-foreground mt-2">Give your pre-loved fashion a second life.</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item Title</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., Vintage Leather Biker Jacket" {...field} />
                                </FormControl>
                                <FormDescription>
                                A catchy and descriptive title helps your item get noticed.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="Describe your item in detail. Include its history, any flaws, and what makes it special."
                                    rows={5}
                                    {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="border border-dashed rounded-lg p-6 text-center flex flex-col items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2"/>
                        <h3 className="font-semibold">Upload Photos</h3>
                        <p className="text-sm text-muted-foreground mt-1">Image upload is coming soon. A placeholder will be used for now.</p>
                        <Button type="button" variant="outline" size="sm" className="mt-4" disabled>Choose Files</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Tops">Tops</SelectItem>
                                        <SelectItem value="Bottoms">Bottoms</SelectItem>
                                        <SelectItem value="Dresses">Dresses</SelectItem>
                                        <SelectItem value="Outerwear">Outerwear</SelectItem>
                                        <SelectItem value="Accessories">Accessories</SelectItem>
                                        <SelectItem value="Shoes">Shoes</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="condition"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Condition</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the condition" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="New with tags">New with tags</SelectItem>
                                        <SelectItem value="Like new">Like new</SelectItem>
                                        <SelectItem value="Gently used">Gently used</SelectItem>
                                        <SelectItem value="Used">Used</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., M, 10, 28W" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., San Francisco, CA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., vintage, denim, 80s" {...field} />
                            </FormControl>
                            <FormDescription>
                            Separate tags with commas. This helps buyers find your item.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                        <FormField
                            control={form.control}
                            name="priceType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Price Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex items-center space-x-4"
                                    >
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Fixed" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Fixed Price
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Trade" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Trade
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="Free" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                        Free
                                        </FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        {priceType === 'Fixed' && (
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price (USD)</FormLabel>
                                    <FormControl>
                                    <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                                    <Input type="number" step="0.01" placeholder="25.00" className="pl-7" {...field} />
                                    </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        )}
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? 'Listing...' : 'List Your Item'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
