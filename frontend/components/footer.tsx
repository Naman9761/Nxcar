"use client"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">NX</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">Nxcar</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for buying and selling quality used vehicles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Browse Inventory
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sell Your Car
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📧 support@nxcar.com</li>
              <li>📞 (555) 123-4567</li>
              <li>📍 123 Auto Avenue, Car City</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2025 Nxcar. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <button className="hover:text-foreground transition-colors">Twitter</button>
            <button className="hover:text-foreground transition-colors">Facebook</button>
            <button className="hover:text-foreground transition-colors">Instagram</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
