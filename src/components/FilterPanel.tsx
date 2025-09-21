'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ReviewStars } from './ReviewStars';

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  features: string[];
  inStock: boolean;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: Array<{ id: string; name: string; count: number }>;
  priceRange: [number, number];
  className?: string;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  categories,
  priceRange,
  className = ''
}: FilterPanelProps) {
  const [openSections, setOpenSections] = useState<string[]>([
    'categories',
    'price',
    'rating',
    'features'
  ]);

  const features = [
    { id: 'fast-absorbing', name: 'Fast Absorbing', count: 12 },
    { id: 'sugar-free', name: 'Sugar Free', count: 8 },
    { id: 'gluten-free', name: 'Gluten Free', count: 15 },
    { id: 'natural', name: 'Natural', count: 6 },
    { id: 'third-party-tested', name: 'Third Party Tested', count: 18 },
    { id: 'vegan', name: 'Vegan', count: 7 }
  ];

  const toggleSection = (section: string) => {
    setOpenSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);

    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const newFeatures = checked
      ? [...filters.features, featureId]
      : filters.features.filter(f => f !== featureId);

    onFiltersChange({ ...filters, features: newFeatures });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating });
  };

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: priceRange,
      rating: 0,
      features: [],
      inStock: false
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.features.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1] ? 1 : 0);

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg">Filters</h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-600 hover:text-primary"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories */}
        <Collapsible open={openSections.includes('categories')}>
          <CollapsibleTrigger
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900">Categories</h4>
            {openSections.includes('categories') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={category.id}
                  className="text-sm text-gray-700 cursor-pointer flex-1"
                >
                  {category.name}
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible open={openSections.includes('price')}>
          <CollapsibleTrigger
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900">Price Range</h4>
            {openSections.includes('price') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              max={priceRange[1]}
              min={priceRange[0]}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Rating */}
        <Collapsible open={openSections.includes('rating')}>
          <CollapsibleTrigger
            onClick={() => toggleSection('rating')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900">Minimum Rating</h4>
            {openSections.includes('rating') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating >= rating}
                  onCheckedChange={(checked) =>
                    handleRatingChange(checked ? rating : 0)
                  }
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <ReviewStars rating={rating} size="sm" />
                  <span className="text-sm text-gray-700">& up</span>
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Features */}
        <Collapsible open={openSections.includes('features')}>
          <CollapsibleTrigger
            onClick={() => toggleSection('features')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-gray-900">Features</h4>
            {openSections.includes('features') ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.id}
                  checked={filters.features.includes(feature.id)}
                  onCheckedChange={(checked) =>
                    handleFeatureChange(feature.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={feature.id}
                  className="text-sm text-gray-700 cursor-pointer flex-1"
                >
                  {feature.name}
                </label>
                <span className="text-xs text-gray-500">({feature.count})</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* In Stock */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) =>
              onFiltersChange({ ...filters, inStock: checked as boolean })
            }
          />
          <label htmlFor="in-stock" className="text-sm text-gray-700 cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h5 className="text-sm font-medium text-gray-900 mb-3">Active Filters</h5>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Badge key={categoryId} variant="secondary" className="gap-1">
                  {category.name}
                  <button
                    onClick={() => handleCategoryChange(categoryId, false)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null;
            })}

            {filters.features.map((featureId) => {
              const feature = features.find(f => f.id === featureId);
              return feature ? (
                <Badge key={featureId} variant="secondary" className="gap-1">
                  {feature.name}
                  <button
                    onClick={() => handleFeatureChange(featureId, false)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ) : null;
            })}

            {filters.rating > 0 && (
              <Badge variant="secondary" className="gap-1">
                {filters.rating}+ Stars
                <button
                  onClick={() => handleRatingChange(0)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filters.inStock && (
              <Badge variant="secondary" className="gap-1">
                In Stock
                <button
                  onClick={() => onFiltersChange({ ...filters, inStock: false })}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}