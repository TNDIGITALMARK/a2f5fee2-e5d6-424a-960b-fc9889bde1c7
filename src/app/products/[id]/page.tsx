'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Plus, Minus, ShoppingCart, Heart, Share2, Star, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { NavigationBar } from '@/components/NavigationBar';
import { ProductCard } from '@/components/ProductCard';
import { ReviewStars, ReviewStarDistribution } from '@/components/ReviewStars';
import { products, reviews, Product } from '@/data/products';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === params.id);
    if (!foundProduct) {
      notFound();
      return;
    }
    setProduct(foundProduct);
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const reviewDistribution = {
    5: productReviews.filter(r => r.rating === 5).length,
    4: productReviews.filter(r => r.rating === 4).length,
    3: productReviews.filter(r => r.rating === 3).length,
    2: productReviews.filter(r => r.rating === 2).length,
    1: productReviews.filter(r => r.rating === 1).length,
  };

  const handleAddToCart = () => {
    setCartItems(prev => prev + quantity);
    // In a real app, you would add the product to cart state/context
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar cartItems={cartItems} />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href={`/categories/${product.category}`} className="hover:text-primary capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative bg-white rounded-lg border overflow-hidden">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-4 left-4">
                  Sale
                </Badge>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative bg-white rounded-lg border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.bestseller && (
                  <Badge variant="secondary">Bestseller</Badge>
                )}
                {product.featured && (
                  <Badge className="bg-primary">Featured</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <ReviewStars
                  rating={product.rating}
                  showRating
                  reviewCount={product.reviewCount}
                  size="lg"
                />
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </div>
                {product.originalPrice && (
                  <div className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 rounded-l-lg"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 rounded-r-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  className="px-4"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>

                <Button variant="outline" size="lg" className="px-4">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-sm font-medium">30-Day Guarantee</div>
              </div>
              <div className="text-center">
                <Award className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-sm font-medium">Third-Party Tested</div>
              </div>
              <div className="text-center">
                <ShoppingCart className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-sm font-medium">Free Shipping $75+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-gray-700">{product.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-semibold mb-3">How to Use</h4>
                      <ul className="space-y-2">
                        {product.howToUse.map((instruction, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                              {index + 1}
                            </span>
                            <span>{instruction}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ingredients" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ingredient Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                          <span className="font-medium">{ingredient}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nutrition" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nutrition Facts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white border border-gray-300 p-4 rounded-lg font-mono">
                      <div className="text-xl font-bold border-b-4 border-black pb-1 mb-2">
                        Nutrition Facts
                      </div>
                      <div className="text-sm mb-4">
                        <div className="flex justify-between">
                          <span>Serving size</span>
                          <span className="font-semibold">{product.nutritionFacts.servingSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Servings per container</span>
                          <span className="font-semibold">{product.nutritionFacts.servingsPerContainer}</span>
                        </div>
                      </div>

                      <div className="border-t-8 border-black pt-2 mb-2">
                        <div className="text-xl font-bold">Amount Per Serving</div>
                      </div>

                      {Object.entries(product.nutritionFacts).map(([key, value]) => {
                        if (key === 'servingSize' || key === 'servingsPerContainer') return null;
                        return (
                          <div key={key} className="flex justify-between border-t border-gray-300 py-1">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-semibold">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {product.rating.toFixed(1)}
                        </div>
                        <ReviewStars rating={product.rating} size="lg" />
                        <div className="text-sm text-gray-600 mt-2">
                          Based on {product.reviewCount} reviews
                        </div>
                      </div>
                      <Separator />
                      <ReviewStarDistribution
                        ratings={reviewDistribution}
                        totalReviews={product.reviewCount}
                      />
                    </CardContent>
                  </Card>

                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Customer Reviews</h3>
                      <Button variant="outline">Write a Review</Button>
                    </div>

                    {productReviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-semibold">{review.userName}</div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <ReviewStars rating={review.rating} size="sm" />
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Related Products</h2>
              <Button variant="outline" asChild>
                <Link href={`/categories/${product.category}`}>
                  View All
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => setCartItems(prev => prev + 1)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}