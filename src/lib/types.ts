import type { ImagePlaceholder } from "./placeholder-images";

export type User = {
  id: string;
  username: string;
  profilePicture: string; // Corresponds to an ID in placeholder-images
  city: string;
  bio: string;
  emailVerified: boolean;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  category: 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Accessories' | 'Shoes';
  condition: 'New with tags' | 'Like new' | 'Gently used' | 'Used';
  size: string;
  tags: string[];
  location: string;
  images: string[]; // Corresponds to IDs in placeholder-images
  price: number;
  priceType: 'Fixed' | 'Trade' | 'Free';
  sellerId: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  itemId: string;
  participants: string[]; // user ids
  lastMessage: string;
  lastMessageAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
};

export type ItemWithSeller = Item & { seller: User };
export type ImageMap = { [key: string]: ImagePlaceholder };
