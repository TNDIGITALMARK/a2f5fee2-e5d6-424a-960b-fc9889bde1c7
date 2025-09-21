'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Star, ShoppingCart, Award, Shield, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NavigationBar } from '@/components/NavigationBar';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/products';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured || p.bestseller);
  const bestsellerProducts = products.filter(p => p.bestseller);

  const features = [
    {
      icon: <Award className="h-6 w-6 text-secondary" />,
      title: "Quality You Trust",
      description: "Third-party tested for purity and potency"
    },
    {
      icon: <Truck className="h-6 w-6 text-secondary" />,
      title: "Fast Shipping",
      description: "Free shipping on orders over $75"
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary" />,
      title: "Money Back Guarantee",
      description: "30-day satisfaction guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4 text-sm font-semibold">
                  #1 Sports Nutrition Store
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                  FUEL YOUR<br />
                  FITNESS<br />
                  <span className="text-secondary">JOURNEY</span>
                </h1>
                <p className="text-xl text-gray-100 mb-8 max-w-lg">
                  Discover premium supplements engineered for peak performance.
                  From pre-workout power to post-workout recovery - we have everything you need.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg">
                  Shop Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg">
                  Learn More
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">50K+</div>
                  <div className="text-sm text-gray-200">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">4.8</div>
                  <div className="text-sm text-gray-200 flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    Average Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">100+</div>
                  <div className="text-sm text-gray-200">Premium Products</div>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className="relative w-full h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent rounded-2xl"></div>
                <div className="grid grid-cols-2 gap-4 h-full p-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="w-16 h-16 bg-secondary rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Pre-Workout</h3>
                      <p className="text-sm text-gray-200">Explosive Energy</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="w-16 h-16 bg-secondary rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Protein</h3>
                      <p className="text-sm text-gray-200">Muscle Building</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="w-16 h-16 bg-secondary rounded-lg mb-3"></div>
                      <h3 className="font-semibold">BCAA</h3>
                      <p className="text-sm text-gray-200">Recovery</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="w-16 h-16 bg-secondary rounded-lg mb-3"></div>
                      <h3 className="font-semibold">Creatine</h3>
                      <p className="text-sm text-gray-200">Strength</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find exactly what you need to reach your fitness goals.
              Our expert-curated categories make it easy to discover the perfect supplements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-gray-200 hover:border-primary/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {category.productCount} products
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestselling Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Bestselling Products
              </h2>
              <p className="text-xl text-gray-600">
                Discover what thousands of athletes trust for peak performance
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">
                View All Products
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Get exclusive access to new products, expert tips, and special offers
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-secondary text-white px-3 py-1 rounded-lg font-bold text-xl">
                  PEAK
                </div>
                <span className="text-xl font-semibold">NUTRITION</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Your trusted partner in achieving peak performance. Quality supplements,
                expert guidance, and unmatched customer service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Peak Nutrition. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}