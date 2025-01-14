import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

const Footer = () => {
  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    // TODO: Implement email signup functionality
    toast({
      title: "Thanks for signing up!",
      description: "You'll receive updates about TDL soon.",
    });
    form.reset();
  };

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-khand text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/leagues/create" className="hover:text-secondary transition-colors">
                  Create League
                </Link>
              </li>
              <li>
                <Link to="/leagues" className="hover:text-secondary transition-colors">
                  Find Leagues
                </Link>
              </li>
              <li>
                <Link to="/instructions" className="hover:text-secondary transition-colors">
                  How to Play
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-khand text-xl mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-secondary transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-khand text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-khand text-xl mb-4">Stay Updated</h3>
            <form onSubmit={handleEmailSignup} className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button type="submit" variant="secondary" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} Tournament Draft League. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;