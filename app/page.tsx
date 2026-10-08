"use client";



import React, { useMemo, useState } from "react";



type Category = "All" | "Cyberwear" | "Footwear" | "Hardware" | "Accessories";

type SortBy = "featured" | "price-asc" | "price-desc" | "rating";



interface Product {

  id: string;

  name: string;

  category: Exclude<Category, "All">;

  price: number;

  rating: number;

  reviews: number;

  description: string;

  badge?: string;

  icon: string;

}



const PRODUCTS: Product[] = [

  {

    id: "p1",

    name: "Kroma Tactical Jacket",

    category: "Cyberwear",

    price: 189,

    rating: 4.9,

    reviews: 128,

    description: "Weather-ready technical jacket with a clean utility silhouette.",

    badge: "Bestseller",

    icon: "J",

  },

  {

    id: "p2",

    name: "Vector Runner",

    category: "Footwear",

    price: 149,

    rating: 4.8,

    reviews: 96,

    description: "Lightweight everyday runner designed for long city walks.",

    badge: "New",

    icon: "V",

  },

  {

    id: "p3",

    name: "Signal Headset",

    category: "Hardware",

    price: 129,

    rating: 4.7,

    reviews: 84,

    description: "Comfortable over-ear headset with focused sound and clear calls.",

    icon: "H",

  },

  {

    id: "p4",

    name: "Core Utility Bag",

    category: "Accessories",

    price: 99,

    rating: 4.8,

    reviews: 71,

    description: "Compact daily carry with dedicated device and cable storage.",

    icon: "B",

  },

  {

    id: "p5",

    name: "Chrono Watch",

    category: "Accessories",

    price: 219,

    rating: 4.9,

    reviews: 52,

    description: "Minimal watch design with a durable stainless-steel case.",

    badge: "Limited",

    icon: "W",

  },

  {

    id: "p6",

    name: "Grid Mechanical",

    category: "Hardware",

    price: 119,

    rating: 4.6,

    reviews: 63,

    description: "Compact mechanical keyboard built for focused work.",

    icon: "K",

  },

  {

    id: "p7",

    name: "Frame Glasses",

    category: "Accessories",

    price: 79,

    rating: 4.7,

    reviews: 44,

    description: "Lightweight frames with a simple, modern profile.",

    icon: "G",

  },

  {

    id: "p8",

    name: "Core Hoodie",

    category: "Cyberwear",

    price: 89,

    rating: 4.8,

    reviews: 105,

    description: "Soft heavyweight hoodie with a structured everyday fit.",

    badge: "Popular",

    icon: "C",

  },

];



const CATEGORIES: Category[] = [

  "All",

  "Cyberwear",

  "Footwear",

  "Hardware",

  "Accessories",

];



function money(value: number) {

  return new Intl.NumberFormat("en-US", {

    style: "currency",

    currency: "USD",

    maximumFractionDigits: 0,

  }).format(value);

}



export default function PresentationShopPage() {

  const [category, setCategory] = useState<Category>("All");

  const [sortBy, setSortBy] = useState<SortBy>("featured");

  const [query, setQuery] = useState("");

  const [cart, setCart] = useState<string[]>([]);

  const [wishlist, setWishlist] = useState<string[]>([]);

  const [newsletter, setNewsletter] = useState("");

  const [message, setMessage] = useState("");



  const filteredProducts = useMemo(() => {

    const search = query.trim().toLowerCase();



    const result = PRODUCTS.filter((product) => {

      const matchesCategory =

        category === "All" || product.category === category;

      const matchesSearch =

        !search ||

        product.name.toLowerCase().includes(search) ||

        product.category.toLowerCase().includes(search) ||

        product.description.toLowerCase().includes(search);



      return matchesCategory && matchesSearch;

    });



    if (sortBy === "price-asc") {

      return [...result].sort((a, b) => a.price - b.price);

    }



    if (sortBy === "price-desc") {

      return [...result].sort((a, b) => b.price - a.price);

    }



    if (sortBy === "rating") {

      return [...result].sort((a, b) => b.rating - a.rating);

    }



    return result;

  }, [category, query, sortBy]);



  function addToCart(product: Product) {

    setCart((current) => [...current, product.id]);

    setMessage(`${product.name} added to your bag.`);

  }



  function toggleWishlist(product: Product) {

    setWishlist((current) =>

      current.includes(product.id)

        ? current.filter((id) => id !== product.id)

        : [...current, product.id],

    );

  }



  function subscribe(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();



    if (!newsletter.trim()) {

      setMessage("Please enter your email address.");

      return;

    }



    setMessage("You are subscribed to Drop Alerts.");

    setNewsletter("");

  }



  return (

    <div className="min-h-screen bg-white text-slate-900">

      <a

        href="#main-content"

        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-3 focus:text-white"

      >

        Skip to main content

      </a>



      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">

          <a

            href="#top"

            className="text-lg font-extrabold tracking-tight text-slate-950"

            aria-label="Kroma Industries home"

          >

            KROMA INDUSTRIES

          </a>



          <nav aria-label="Primary navigation" className="hidden gap-6 text-sm font-medium sm:flex">

            <a className="text-slate-700 hover:text-blue-700" href="#collection">

              Collection

            </a>

            <a className="text-slate-700 hover:text-blue-700" href="#benefits">

              Benefits

            </a>

            <a className="text-slate-700 hover:text-blue-700" href="#newsletter">

              Updates

            </a>

          </nav>



          <div className="flex items-center gap-3 text-sm">

            <span aria-live="polite" className="font-semibold text-slate-700">

            Bag {cart.length > 0 ? `(${cart.length})` : ""}

              Saved {wishlist.length}

            </span>

          </div>

        </div>

      </header>



      <main id="main-content">

        <section id="top" aria-labelledby="hero-title" className="bg-slate-950">

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

            <div className="max-w-3xl">

              <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-300">

                Technical essentials

              </p>

              <h1

                id="hero-title"

                className="text-4xl font-black tracking-tight text-white sm:text-6xl"

              >

                Built for people who move fast.

              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">

                A focused collection of durable apparel, hardware and accessories

                for modern everyday work.

              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <a

                  href="#collection"

                  className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"

                >

                  Shop collection

                </a>

                <a

                  href="#benefits"

                  className="rounded-lg border border-slate-500 bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-400"

                >

                  Why Kroma

                </a>

              </div>

            </div>

          </div>

        </section>



        <section

          id="benefits"

          aria-labelledby="benefits-title"

          className="border-b border-slate-200 bg-slate-50"

        >

          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

            <h2 id="benefits-title" className="text-2xl font-extrabold text-slate-950">

              Designed for everyday performance

            </h2>



            <div className="mt-8 grid gap-6 md:grid-cols-3">

              <article className="rounded-xl border border-slate-200 bg-white p-6">

                <div

                  aria-hidden="true"

                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800"

                >

                  01

                </div>

                <h3 className="text-lg font-bold text-slate-950">

                  Fast delivery

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">

                  Clear delivery information and a straightforward checkout flow.

                </p>

              </article>



              <article className="rounded-xl border border-slate-200 bg-white p-6">

                <div

                  aria-hidden="true"

                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800"

                >

                  02

                </div>

                <h3 className="text-lg font-bold text-slate-950">

                  Durable design

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">

                  Products selected for practical daily use and long-term value.

                </p>

              </article>



              <article className="rounded-xl border border-slate-200 bg-white p-6">

                <div

                  aria-hidden="true"

                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800"

                >

                  03

                </div>

                <h3 className="text-lg font-bold text-slate-950">

                  Easy returns

                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">

                  A simple product experience with clear support information.

                </p>

              </article>

            </div>

          </div>

        </section>



        <section

          id="collection"

          aria-labelledby="collection-title"

          className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"

        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-blue-700">

                Collection

              </p>

              <h2

                id="collection-title"

                className="mt-2 text-3xl font-black tracking-tight text-slate-950"

              >

                Shop the essentials

              </h2>

              <p className="mt-2 max-w-xl text-slate-700">

                Browse the collection, search by name or filter by category.

              </p>

            </div>



            <div className="grid gap-4 sm:grid-cols-2">

              <div>

                <label

                  htmlFor="product-search"

                  className="mb-2 block text-sm font-bold text-slate-900"

                >

                  Search products

                </label>

                <input

                  id="product-search"

                  type="search"

                  value={query}

                  onChange={(event) => setQuery(event.target.value)}

                  placeholder="Search..."

                  className="w-full rounded-lg border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-950 placeholder:text-slate-600 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"

                />

              </div>



              <div>

                <label

                  htmlFor="sort-products"

                  className="mb-2 block text-sm font-bold text-slate-900"

                >

                  Sort products

                </label>

                <select

                  id="sort-products"

                  value={sortBy}

                  onChange={(event) => setSortBy(event.target.value as SortBy)}

                  className="w-full rounded-lg border border-slate-400 bg-white px-3 py-2.5 text-sm text-slate-950 focus:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"

                >

                  <option value="featured">Featured</option>

                  <option value="price-asc">Price: low to high</option>

                  <option value="price-desc">Price: high to low</option>

                  <option value="rating">Highest rated</option>

                </select>

              </div>

            </div>

          </div>



          <div className="mt-8 flex flex-wrap gap-2" aria-label="Product categories">

            {CATEGORIES.map((item) => {

              const active = category === item;



              return (

                <button

                  key={item}

                  type="button"

                  aria-pressed={active}

                  onClick={() => setCategory(item)}

                  className={

                    active

                      ? "rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-slate-300"

                      : "rounded-full border border-slate-400 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-200"

                  }

                >

                  {item}

                </button>

              );

            })}

          </div>



          <p className="mt-6 text-sm font-medium text-slate-700" aria-live="polite">

            Showing {filteredProducts.length} of {PRODUCTS.length} products

          </p>



          {filteredProducts.length === 0 ? (

            <div className="mt-8 rounded-xl border border-slate-300 bg-slate-50 p-8 text-center">

              <h3 className="text-xl font-bold text-slate-950">

                No products found

              </h3>

              <p className="mt-2 text-slate-700">

                Try another search term or category.

              </p>

            </div>

          ) : (

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {filteredProducts.map((product) => {

                const saved = wishlist.includes(product.id);



                return (

                  <article

                    key={product.id}

                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm"

                  >

                    <div

                      aria-hidden="true"

                      className="flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-5xl font-black text-slate-300"

                    >

                      {product.icon}

                    </div>



                    <div className="mt-5 flex items-start justify-between gap-3">

                      <div>

                        {product.badge && (

                          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">

                            {product.badge}

                          </p>

                        )}

                        <h3 className="mt-1 text-lg font-extrabold text-slate-950">

                          {product.name}

                        </h3>

                      </div>



                      <button

                        type="button"

                        aria-label={
                  saved
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }

                aria-pressed={saved}
                      >

                        {saved ? "♥" : "♡"}

                      </button>

                    </div>



                    <p className="mt-2 text-sm leading-6 text-slate-700">

                      {product.description}

                    </p>



                    <div className="mt-4 flex items-center justify-between text-sm">

                      <span className="font-extrabold text-slate-950">

                        {money(product.price)}

                      </span>

                      <span className="font-semibold text-slate-700">

                        ★ {product.rating} ({product.reviews})

                      </span>

                    </div>



                    <button

                      type="button"

                      onClick={() => addToCart(product)}

                      className="mt-5 w-full rounded-lg bg-blue-700 px-4 py-3 text-sm font-bold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"

                    >

                      Add to bag

                    </button>

                  </article>

                );

              })}

            </div>

          )}

        </section>



        <section

          id="newsletter"

          aria-labelledby="newsletter-title"

          className="border-t border-slate-200 bg-slate-950"

        >

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-widest text-blue-300">

                Drop alerts

              </p>

              <h2

                id="newsletter-title"

                className="mt-2 text-3xl font-black text-white"

              >

                Get product updates

              </h2>

              <p className="mt-3 text-slate-200">

                Receive occasional information about new products and releases.

              </p>



              <form

                onSubmit={subscribe}

                className="mt-6 flex flex-col gap-3 sm:flex-row"

              >

                <div className="flex-1">

                  <label

                    htmlFor="newsletter-email"

                    className="mb-2 block text-sm font-bold text-white"

                  >

                    Email address

                  </label>

                  <input

                    id="newsletter-email"

                    name="email"

                    type="email"

                    autoComplete="email"

                    required

                    value={newsletter}

                    onChange={(event) => setNewsletter(event.target.value)}

                    placeholder="you\@example.com"

                    className="w-full rounded-lg border border-slate-400 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-600 focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-900"

                  />

                </div>

                <button

                  type="submit"

                  className="self-end rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300"

                >

                  Subscribe

                </button>

              </form>



              <p className="mt-4 min-h-6 text-sm font-semibold text-blue-200" aria-live="polite">

                {message}

              </p>

            </div>

          </div>

        </section>

      </main>



      <footer className="border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <p className="font-medium text-slate-700">

            © 2026 Kroma Industries. All rights reserved.

          </p>

          <div className="flex gap-5">

            <a href="#collection" className="font-semibold text-slate-700 hover:text-blue-700">

              Collection

            </a>

            <a href="#newsletter" className="font-semibold text-slate-700 hover:text-blue-700">

              Updates

            </a>

          </div>

        </div>

      </footer>

    </div>

  );

}
