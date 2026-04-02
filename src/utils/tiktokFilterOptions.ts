// TikTok Categories with IDs
export const TIKTOK_CATEGORIES = [
  { id: '605196', name: 'Automotive & Motorbike' },
  { id: '602284', name: 'Baby & Maternity' },
  { id: '601450', name: 'Beauty & Personal Care' },
  { id: '801928', name: 'Books, Magazines & Audio' },
  { id: '951432', name: 'Collectibles' },
  { id: '601755', name: 'Computers & Office Equipment' },
  { id: '605248', name: 'Fashion Accessories' },
  { id: '700437', name: 'Food & Beverages' },
  { id: '604453', name: 'Furniture' },
  { id: '700645', name: 'Health' },
  { id: '604968', name: 'Home Improvement' },
  { id: '600001', name: 'Home Supplies' },
  { id: '600942', name: 'Household Appliances' },
  { id: '953224', name: 'Jewellery, Accessories & Derivatives' },
  { id: '802184', name: 'Kids Fashion' },
  { id: '600024', name: 'Kitchenware' },
  { id: '824584', name: 'Luggage & Bags' },
  { id: '824328', name: "Menswear & Men's Underwear" },
  { id: '601303', name: 'Muslim Fashion' },
  { id: '602118', name: 'Pet Supplies' },
  { id: '601739', name: 'Phones & Electronics' },
  { id: '601352', name: 'Shoes' },
  { id: '603014', name: 'Sports & Outdoor' },
  { id: '600154', name: 'Textiles & Soft Furnishings' },
  { id: '604579', name: 'Tools & Hardware' },
  { id: '604206', name: 'Toys & Hobbies' },
  { id: '834312', name: 'Virtual Products' },
  { id: '601152', name: "Womenswear & Women's Underwear" },
];

// Time range options
export const TIME_RANGES = [
  { value: '1', label: 'Yesterday' },
  { value: '7', label: 'This Week' },
  { value: '30', label: 'This Month' },
];

// Sort options
export const SORT_OPTIONS = [
  { value: 'post', label: 'Popularity' },
  { value: 'post_change', label: 'Popularity change' },
  { value: 'ctr', label: 'CTR' },
  { value: 'cvr', label: 'CVR' },
  { value: 'cpa', label: 'CPA' },
  { value: 'cost', label: 'Total Ad Spend' },
  { value: 'like', label: 'Likes' },
  { value: 'share', label: 'Shares' },
  { value: 'comment', label: 'Comments' },
  { value: 'impression', label: 'Impressions' },
  { value: 'play_six_rate', label: '6s view rate' },
];

// Country options - 60 TikTok supported countries
export const COUNTRY_OPTIONS = [
  // Americas
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'BR', label: 'Brazil' },
  { value: 'MX', label: 'Mexico' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'CO', label: 'Colombia' },
  { value: 'PE', label: 'Peru' },

  // Europe
  { value: 'GB', label: 'United Kingdom' },
  { value: 'DE', label: 'Germany' },
  { value: 'FR', label: 'France' },
  { value: 'IT', label: 'Italy' },
  { value: 'ES', label: 'Spain' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'PL', label: 'Poland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'NO', label: 'Norway' },
  { value: 'DK', label: 'Denmark' },
  { value: 'FI', label: 'Finland' },
  { value: 'BE', label: 'Belgium' },
  { value: 'AT', label: 'Austria' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'IE', label: 'Ireland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'GR', label: 'Greece' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'RO', label: 'Romania' },
  { value: 'HU', label: 'Hungary' },

  // Asia Pacific
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'South Korea' },
  { value: 'SG', label: 'Singapore' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'TH', label: 'Thailand' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'PH', label: 'Philippines' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'AU', label: 'Australia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'BD', label: 'Bangladesh' },

  // Middle East & Africa
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'EG', label: 'Egypt' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'IL', label: 'Israel' },
  { value: 'TR', label: 'Turkey' },
  { value: 'QA', label: 'Qatar' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'OM', label: 'Oman' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'JO', label: 'Jordan' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'MA', label: 'Morocco' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'KE', label: 'Kenya' },
  { value: 'GH', label: 'Ghana' },
];

// Derived SelectField-compatible options
export const categorySelectOptions = [
  { label: 'All Categories', value: '' },
  ...TIKTOK_CATEGORIES.map(c => ({ label: c.name, value: c.id })),
];

export const periodSelectOptions = TIME_RANGES.map(t => ({
  label: t.label,
  value: t.value,
}));

export const countrySelectOptions = COUNTRY_OPTIONS.map(c => ({
  label: c.label,
  value: c.value,
}));

export const sortSelectOptions = SORT_OPTIONS.map(s => ({
  label: s.label,
  value: s.value,
}));

export const SORT_ORDER_OPTIONS = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

export const sortOrderSelectOptions = SORT_ORDER_OPTIONS.map(s => ({
  label: s.label,
  value: s.value,
}));
