export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[];
  description: string;
  benefits: string[];
  ingredients: string[];
  nutritionFacts: {
    servingSize: string;
    servingsPerContainer: number;
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
    [key: string]: string | number | undefined;
  };
  howToUse: string[];
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'pre-workout',
    name: 'Pre-Workout',
    description: 'Boost energy and performance before training',
    image: '/images/categories/pre-workout.jpg',
    productCount: 12
  },
  {
    id: 'protein',
    name: 'Protein',
    description: 'Build and maintain muscle mass',
    image: '/images/categories/protein.jpg',
    productCount: 18
  },
  {
    id: 'amino-acids',
    name: 'Amino Acids',
    description: 'Support recovery and muscle building',
    image: '/images/categories/amino-acids.jpg',
    productCount: 8
  },
  {
    id: 'creatine',
    name: 'Creatine',
    description: 'Increase strength and power output',
    image: '/images/categories/creatine.jpg',
    productCount: 6
  }
];

export const products: Product[] = [
  {
    id: 'power-surge-pre-workout',
    name: 'Power Surge Pre-Workout',
    price: 39.99,
    category: 'pre-workout',
    rating: 4.8,
    reviewCount: 245,
    image: '/images/products/power-surge.jpg',
    images: [
      '/images/products/power-surge.jpg',
      '/images/products/power-surge-2.jpg',
      '/images/products/power-surge-3.jpg'
    ],
    description: 'Unleash explosive energy and focus with our premium pre-workout formula. Power Surge combines scientifically-backed ingredients to maximize your training intensity and endurance.',
    benefits: [
      'Explosive energy and focus',
      'Enhanced endurance',
      'Improved strength output',
      'Better muscle pumps',
      'Zero crash formula'
    ],
    ingredients: [
      'Caffeine Anhydrous (300mg)',
      'Beta-Alanine (3.2g)',
      'Citrulline Malate (6g)',
      'Creatine Monohydrate (3g)',
      'Taurine (2g)',
      'L-Tyrosine (1.5g)'
    ],
    nutritionFacts: {
      servingSize: '1 scoop (15g)',
      servingsPerContainer: 30,
      calories: 10,
      protein: '0g',
      carbs: '2g',
      fat: '0g',
      caffeine: '300mg'
    },
    howToUse: [
      'Mix 1 scoop with 8-10 oz of cold water',
      'Consume 20-30 minutes before workout',
      'Start with half scoop to assess tolerance',
      'Do not exceed 1 scoop per day'
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    tags: ['energy', 'focus', 'endurance']
  },
  {
    id: 'ultra-protein-whey-isolate',
    name: 'Ultra Protein Whey Isolate',
    price: 54.99,
    originalPrice: 64.99,
    category: 'protein',
    rating: 4.7,
    reviewCount: 189,
    image: '/images/products/ultra-protein.jpg',
    images: [
      '/images/products/ultra-protein.jpg',
      '/images/products/ultra-protein-2.jpg',
      '/images/products/ultra-protein-3.jpg'
    ],
    description: 'Premium whey protein isolate with 25g of pure protein per serving. Ultra-filtered for maximum absorption and minimal lactose content.',
    benefits: [
      'Fast-absorbing protein',
      '25g protein per serving',
      'Low in lactose',
      'Supports muscle growth',
      'Great taste and mixability'
    ],
    ingredients: [
      'Whey Protein Isolate',
      'Natural Flavors',
      'Lecithin',
      'Stevia Extract',
      'Digestive Enzymes'
    ],
    nutritionFacts: {
      servingSize: '1 scoop (30g)',
      servingsPerContainer: 30,
      calories: 110,
      protein: '25g',
      carbs: '1g',
      fat: '0.5g'
    },
    howToUse: [
      'Mix 1 scoop with 6-8 oz of water or milk',
      'Best consumed post-workout',
      'Can be used between meals',
      'Blend with fruits for smoothies'
    ],
    inStock: true,
    bestseller: true,
    tags: ['muscle building', 'recovery', 'fast-absorbing']
  },
  {
    id: 'essential-bcaa',
    name: 'Essential BCAA',
    price: 32.99,
    category: 'amino-acids',
    rating: 4.6,
    reviewCount: 156,
    image: '/images/products/essential-bcaa.jpg',
    images: [
      '/images/products/essential-bcaa.jpg',
      '/images/products/essential-bcaa-2.jpg'
    ],
    description: 'Complete amino acid complex with optimal 2:1:1 ratio of Leucine, Isoleucine, and Valine. Perfect for intra-workout or post-training recovery.',
    benefits: [
      'Supports muscle recovery',
      'Reduces muscle breakdown',
      'Improves endurance',
      'Enhances hydration',
      'Great tasting formula'
    ],
    ingredients: [
      'L-Leucine (2.5g)',
      'L-Isoleucine (1.25g)',
      'L-Valine (1.25g)',
      'Electrolyte Blend',
      'Natural Flavors'
    ],
    nutritionFacts: {
      servingSize: '1 scoop (10g)',
      servingsPerContainer: 30,
      calories: 5,
      protein: '5g',
      carbs: '0g',
      fat: '0g'
    },
    howToUse: [
      'Mix 1 scoop with 12-16 oz of water',
      'Consume during or after workout',
      'Can be used on rest days',
      'Best served chilled'
    ],
    inStock: true,
    featured: true,
    tags: ['recovery', 'endurance', 'hydration']
  },
  {
    id: 'pure-creatine',
    name: 'Pure Creatine',
    price: 24.99,
    category: 'creatine',
    rating: 4.9,
    reviewCount: 298,
    image: '/images/products/pure-creatine.jpg',
    images: [
      '/images/products/pure-creatine.jpg',
      '/images/products/pure-creatine-2.jpg'
    ],
    description: '100% pure creatine monohydrate powder. Micronized for better solubility and absorption. Proven to increase strength, power, and muscle mass.',
    benefits: [
      'Increases strength and power',
      'Supports muscle growth',
      'Improves workout performance',
      'Enhances recovery',
      'Unflavored and versatile'
    ],
    ingredients: [
      'Creatine Monohydrate (5g)'
    ],
    nutritionFacts: {
      servingSize: '1 scoop (5g)',
      servingsPerContainer: 60,
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g'
    },
    howToUse: [
      'Mix 1 scoop with 8 oz of water or juice',
      'Take daily with or without food',
      'Loading phase: 4 scoops daily for 5-7 days',
      'Maintenance: 1 scoop daily'
    ],
    inStock: true,
    bestseller: true,
    tags: ['strength', 'power', 'muscle growth']
  }
];

export const reviews = [
  {
    id: '1',
    productId: 'power-surge-pre-workout',
    userName: 'Mike Johnson',
    rating: 5,
    date: '2024-12-15',
    comment: 'Amazing energy boost! No jitters and sustained focus throughout my workout.',
    verified: true
  },
  {
    id: '2',
    productId: 'power-surge-pre-workout',
    rating: 4,
    userName: 'Sarah Chen',
    date: '2024-12-10',
    comment: 'Great pre-workout, but the flavor could be better. Performance is excellent though.',
    verified: true
  },
  {
    id: '3',
    productId: 'ultra-protein-whey-isolate',
    userName: 'David Rodriguez',
    rating: 5,
    date: '2024-12-12',
    comment: 'Best protein I have tried. Mixes well and tastes great. Seeing good results.',
    verified: true
  },
  {
    id: '4',
    productId: 'essential-bcaa',
    userName: 'Lisa Thompson',
    rating: 5,
    date: '2024-12-08',
    comment: 'Perfect for recovery days. Love the tropical flavor and it helps with soreness.',
    verified: true
  },
  {
    id: '5',
    productId: 'pure-creatine',
    userName: 'Alex Kumar',
    rating: 5,
    date: '2024-12-05',
    comment: 'Pure and effective. Noticed strength gains within the first week.',
    verified: true
  }
];