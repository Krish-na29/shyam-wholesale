
import { Link } from "react-router-dom";
import { Bell, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-devotional-cream border-t border-devotional-orange/20 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/4ba42bde-6d68-4a1a-b428-2d907b885764.png"
                alt="Shyam Mart Logo"
                width={40}
                height={46}
                className="h-6 w-auto object-contain"
                style={{ maxWidth: 48, maxHeight: 56 }}
              />
              <h3 className="ml-2 text-xl font-bold text-devotional-maroon">Shyam Mart</h3>
            </div>
            <p className="text-devotional-maroon/80 mb-4">Your trusted source for authentic pooja vastras and spiritual accessories since 2023.</p>
            <div className="flex items-center mb-2">
              <Phone className="h-4 w-4 text-devotional-red mr-2" />
              <span className="text-devotional-maroon/80">+91 9301280090</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-devotional-red mr-2" />
              <span className="text-devotional-maroon/80">shyamwholesalemart@gmail.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-devotional-maroon mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-devotional-maroon/80 hover:text-devotional-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-devotional-maroon/80 hover:text-devotional-orange transition-colors">
                  Vastra Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-devotional-maroon/80 hover:text-devotional-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-devotional-maroon/80 hover:text-devotional-orange transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/aarti" className="text-devotional-maroon/80 hover:text-devotional-orange transition-colors">
                  Aarti Sangrah
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-devotional-maroon mb-4">Subscribe for Updates</h3>
            <p className="text-devotional-maroon/80 mb-4">
              Get updates on new arrivals and special festival collections.
            </p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 border border-devotional-orange/30 rounded-l-md focus:outline-none focus:ring-1 focus:ring-devotional-orange flex-1" />
              <button className="bg-devotional-orange hover:bg-devotional-red text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-devotional-orange/10 text-center text-devotional-maroon/60 text-sm">
          <p className="mb-2">
            <span className="hindi">शुभं भवतु | मंगलमय जीवन |</span>
          </p>
          <p>© {new Date().getFullYear()} Shyam Mart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
