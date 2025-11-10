"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Sparkles, Shield, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="relative bg-gradient-to-br from-primary/6 via-background to-accent/6 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                About Nxcar
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground">
                Built for car enthusiasts and trusted buyers
              </h1>
              <p className="text-lg text-muted-foreground">
                Nxcar is a curated marketplace for premium pre-owned vehicles —
                combining verified listings, clear history, and a seamless
                browsing experience.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 bg-card/80 border border-border rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold">Curated Listings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only verified, high-quality vehicles added by trusted
                    sellers.
                  </p>
                </div>
                <div className="p-6 bg-card/80 border border-border rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-accent" />
                    <h3 className="font-semibold">Transparent</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detailed specs, history, and support for confident
                    purchases.
                  </p>
                </div>
                <div className="p-6 bg-card/80 border border-border rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                    <h3 className="font-semibold">Premium Experience</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Modern, fast interface with responsive support and features.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
