import { countries } from "./countries";
import { SelectOption } from "../components/common/select/SelectField";

export const amazonCountryOptions: SelectOption[] = countries
  .filter(c => c.name !== "Pakistan")
  .map(c => ({
    label: c.name,
    value: c.code
  }));

export const amazonTrendTypeOptions: SelectOption[] = [
  { label: "Trending Products", value: "trending" },
  { label: "Best Sellers", value: "best_sellers" },
  { label: "Movers & Shakers", value: "movers_shakers" },
  { label: "Hot New Releases", value: "new_releases" },
];

export const amazonSortOptions: SelectOption[] = [
  { label: "Default", value: "default" },
  { label: "Sales Volume: Low to High", value: "sales_low" },
  { label: "Sales Volume: High to Low", value: "sales_high" },
  { label: "Price: Low to High", value: "price_low" },
  { label: "Price: High to Low", value: "price_high" },
  { label: "Rating: Low to High", value: "rating_low" },
  { label: "Rating: High to Low", value: "rating_high" },
  { label: "Number of Ratings: Low to High", value: "reviews_low" },
  { label: "Number of Ratings: High to Low", value: "reviews_high" },
];

export const amazonCategoryOptions: SelectOption[] = [
  { label: "All Categories", value: "all" },
];

// Subcategories mapping (Simplified for UI/UX demonstration)
export const amazonSubCategoryOptions: Record<string, SelectOption[]> = {
  electronics: [
    { label: "Accessories & Supplies", value: "electronics-acc" },
    { label: "Camera & Photo", value: "camera" },
    { label: "Car & Vehicle Electronics", value: "car-electronics" },
    { label: "Cell Phones & Accessories", value: "cell-phones" },
    { label: "Computers & Accessories", value: "computers" },
    { label: "Headphones", value: "headphones" },
    { label: "Home Audio", value: "home-audio" },
    { label: "Television & Video", value: "tv-video" },
  ],
  "home-garden": [
    { label: "Kitchen & Dining", value: "kitchen" },
    { label: "Bedding", value: "bedding" },
    { label: "Bath", value: "bath" },
    { label: "Furniture", value: "furniture" },
    { label: "Home Décor", value: "home-decor" },
    { label: "Home Improvement", value: "home-improvement" },
  ],
  fashion: [
    { label: "Women's Clothing", value: "women-clothing" },
    { label: "Men's Clothing", value: "men-clothing" },
    { label: "Girls' Clothing", value: "girls-clothing" },
    { label: "Boys' Clothing", value: "boys-clothing" },
    { label: "Shoes", value: "shoes" },
    { label: "Jewelry", value: "jewelry" },
    { label: "Watches", value: "watches" },
  ],
};

// Default category for best sellers
export const DEFAULT_CATEGORY = 'amazon-devices';

// Country options for Amazon marketplace
export const COUNTRY_OPTIONS = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
];
