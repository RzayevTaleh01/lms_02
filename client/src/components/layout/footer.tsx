import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-devcode-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">/</span>
              </div>
              <span className="text-xl font-bold">code academy</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Code Academy gələcək innovasiyaları bu gündən duyub ona uyğun 
              mütəxəssislər hazırlayan tədrəis müəssisəsidir.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-devcode-orange transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-devcode-orange transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-devcode-orange transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-devcode-orange transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sürətli Keçidlər</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Akademiya haqqında
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/courses">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Tədris proqramları
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Bloq
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/verify">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Sertifikat yoxlama
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Əlaqə
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tədris Sahələri</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Front-end Proqramlaşdırma</span>
              </li>
              <li>
                <span className="text-gray-400">Back-end Proqramlaşdırma</span>
              </li>
              <li>
                <span className="text-gray-400">UX/UI Dizayn</span>
              </li>
              <li>
                <span className="text-gray-400">Digital Marketing</span>
              </li>
              <li>
                <span className="text-gray-400">Kiber Təhlükəsizlik</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Əlaqə Məlumatları</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-devcode-orange" />
                <span className="text-gray-400">+994 XX XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-devcode-orange" />
                <span className="text-gray-400">info@codeacademy.az</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-devcode-orange mt-1" />
                <span className="text-gray-400">
                  Bakı şəhəri, Nizami rayonu<br />
                  Code Academy binası
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 Code Academy. Bütün hüquqlar qorunur.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                  Məxfilik Siyasəti
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                  İstifadə Şərtləri
                </span>
              </Link>
              <Link href="/support">
                <span className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer">
                  Dəstək
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}