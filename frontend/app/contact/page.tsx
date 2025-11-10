"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:py-28">
          <div className="bg-card/90 border border-border rounded-2xl p-8 shadow-lg animate-fadeIn">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Get in touch
            </h1>
            <p className="text-muted-foreground mb-6">
              Have questions or need support? Reach out and we'll respond
              quickly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold">Support</p>
                <p className="text-muted-foreground text-sm">
                  support@nxcar.example
                </p>

                <p className="text-sm font-semibold mt-4">Business</p>
                <p className="text-muted-foreground text-sm">
                  partners@nxcar.example
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // placeholder — integrate backend when ready
                  alert("Thanks — we'll get back to you soon.");
                }}
                className="space-y-3"
              >
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Your name"
                />
                <input
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Email"
                />
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="How can we help?"
                  rows={4}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
