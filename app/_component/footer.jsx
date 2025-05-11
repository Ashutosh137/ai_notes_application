import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

function FooterSection() {
  return (
    <footer className="bg-gray-900 text-gray-300" id="footer">
      <div className="container mx-auto px-10 md:px-20 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-white text-3xl font-semibold mb-4">Logoipsum</h3>
            <p className="mb-4 text-gray-400">
              Revolutionizing how you interact with PDF documents through AI-powered insights, summaries, and
              annotations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-400 hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/tutorials" className="text-gray-400 hover:text-white transition-colors">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-400 hover:text-white transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="/community" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="/changelog" className="text-gray-400 hover:text-white transition-colors">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <span>support@pdfnoteai.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary" />
                <span>123 Innovation Drive, Tech City, CA 94043</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} PDF Note AI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
