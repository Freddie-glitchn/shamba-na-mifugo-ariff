
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-farm-green-50 border-t border-farm-green-100 pt-8 pb-16 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-farm-green-800">Mifugo Shamba Arifa</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering Kenyan farmers with technology, knowledge, and community.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="rounded-full bg-farm-green-100 p-2 hover:bg-farm-green-200 transition-colors">
                <MessageCircle className="h-4 w-4 text-farm-green-800" />
              </a>
              <a href="#" className="rounded-full bg-farm-green-100 p-2 hover:bg-farm-green-200 transition-colors">
                <Mail className="h-4 w-4 text-farm-green-800" />
              </a>
              <a href="#" className="rounded-full bg-farm-green-100 p-2 hover:bg-farm-green-200 transition-colors">
                <Phone className="h-4 w-4 text-farm-green-800" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-farm-green-800">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/plants" className="hover:text-farm-green-700">Plant Knowledge</Link></li>
              <li><Link to="/market" className="hover:text-farm-green-700">Market Data</Link></li>
              <li><Link to="/weather" className="hover:text-farm-green-700">Weather Information</Link></li>
              <li><Link to="/dashboard" className="hover:text-farm-green-700">Farm Management</Link></li>
              <li><Link to="/social" className="hover:text-farm-green-700">Farmer Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-farm-green-800">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-farm-green-700">Help Center</a></li>
              <li><a href="#" className="hover:text-farm-green-700">Farming Guides</a></li>
              <li><a href="#" className="hover:text-farm-green-700">Agricultural Tips</a></li>
              <li><a href="#" className="hover:text-farm-green-700">Tutorials</a></li>
              <li><a href="#" className="hover:text-farm-green-700">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-3 text-farm-green-800">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-farm-green-600" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 text-farm-green-600" />
                <span>+254 700 123 456</span>
              </div>
              <div className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 text-farm-green-600" />
                <span>info@mifugoshamba.ke</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-farm-green-100 mt-8 pt-4 text-center text-xs text-muted-foreground">
          <p>© 2025 Mifugo Shamba Arifa. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-farm-green-700">Privacy Policy</a>
            <a href="#" className="hover:text-farm-green-700">Terms of Service</a>
            <a href="#" className="hover:text-farm-green-700">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
