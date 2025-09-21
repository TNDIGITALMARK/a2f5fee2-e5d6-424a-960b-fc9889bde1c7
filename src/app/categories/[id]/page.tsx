'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Filter, Grid, List, SortAsc, SortDesc, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { NavigationBar } from '@/components/NavigationBar';
import { ProductCard } from '@/components/ProductCard';
import { FilterPanel } from '@/components/FilterPanel';
import { products, categories, Category } from '@/data/products';

type SortOption = 'name' | 'price-low' | 'price-high' | 'rating' | 'popularity';
type ViewMode = 'grid' | 'list';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  features: string[];
  inStock: boolean;
}

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [cartItems, setCartItems] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const allPrices = products.map(p => p.price);
  const priceRange: [number, number] = [Math.min(...allPrices), Math.max(...allPrices)];

  const [filters, setFilters] = useState<FilterState>({
    categories: [params.id],
    priceRange: priceRange,
    rating: 0,
    features: [],
    inStock: false
  });

  useEffect(() => {
    const foundCategory = categories.find(c => c.id === params.id);
    if (!foundCategory) {
      notFound();
      return;
    }
    setCategory(foundCategory);
  }, [params.id]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // In stock filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      // Features filter (simplified - in real app would match against product features)
      // For demo purposes, we'll assume all products have the filtered features

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleAddToCart = (productId: string) => {
    setCartItems(prev => prev + 1);
  };

  const availableCategories = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    count: products.filter(p => p.category === cat.id).length
  }));

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar cartItems={cartItems} />

      {/* Category Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium capitalize">
              {category.name}
            </span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 capitalize">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{filteredAndSortedProducts.length} products</span>
                <Badge variant="outline">{category.name}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              categories={availableCategories}
              priceRange={priceRange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel
                        filters={filters}
                        onFiltersChange={setFilters}
                        categories={availableCategories}
                        priceRange={priceRange}
                      />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Results Count */}
                <span className="text-sm text-gray-600">
                  {filteredAndSortedProducts.length} results
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 1 || filters.rating > 0 || filters.features.length > 0 || filters.inStock) && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-blue-900">Active Filters</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters({
                      categories: [params.id],
                      priceRange: priceRange,
                      rating: 0,
                      features: [],
                      inStock: false
                    })}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.categories.filter(catId => catId !== params.id).map(catId => {
                    const cat = availableCategories.find(c => c.id === catId);
                    return cat ? (
                      <Badge key={catId} variant="secondary">
                        {cat.name}
                      </Badge>
                    ) : null;
                  })}
                  {filters.rating > 0 && (
                    <Badge variant="secondary">{filters.rating}+ Stars</Badge>
                  )}
                  {filters.inStock && (
                    <Badge variant="secondary">In Stock</Badge>
                  )}
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({
                    categories: [params.id],
                    priceRange: priceRange,
                    rating: 0,
                    features: [],
                    inStock: false
                  })}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredAndSortedProducts.map((product) => (
                  <div key={product.id} className={viewMode === 'list' ? 'bg-white rounded-lg border p-4' : ''}>
                    {viewMode === 'grid' ? (
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ) : (
                      // List View Layout
                      <div className="flex gap-6">
                        <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-semibold text-lg hover:text-primary line-clamp-1">
                                {product.name}
                              </h3>
                            </Link>
                            <div className="text-right flex-shrink-0 ml-4">
                              <div className="text-2xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-400 line-through">
                                  ${product.originalPrice.toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {product.rating} ({product.reviewCount})
                            </span>
                            <div className="flex gap-1 ml-4">
                              {product.bestseller && (
                                <Badge variant="secondary" className="text-xs">
                                  Bestseller
                                </Badge>
                              )}
                              {product.featured && (
                                <Badge variant="default" className="text-xs bg-primary">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {product.description}
                          </p>
                          <Button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={!product.inStock}
                            size="sm"
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button (for pagination) */}
            {filteredAndSortedProducts.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg">
                  Load More Products
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About {category.name}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              {category.description} Our carefully curated selection of {category.name.toLowerCase()} supplements
              are designed to help you achieve your fitness goals safely and effectively.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Why Choose Our {category.name}?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Third-party tested for purity and potency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Premium ingredients sourced globally</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Manufactured in FDA-approved facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Backed by scientific research</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Expert Tips
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Always follow recommended dosage instructions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Combine with a balanced diet and exercise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Consult with a healthcare professional if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Stay consistent for best results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}