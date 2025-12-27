import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();

  const quickLinks = [
    { nameBengali: "হোম", nameEnglish: "Home", href: "/hero-gateway" },
    { nameBengali: "ঐতিহ্য", nameEnglish: "Heritage", href: "/heritage-story" },
    { nameBengali: "মেনু", nameEnglish: "Menu", href: "/interactive-menu-hub" },
    {
      nameBengali: "উৎকর্ষতা",
      nameEnglish: "Excellence",
      href: "/excellence-showcase",
    },
    {
      nameBengali: "সম্প্রদায়",
      nameEnglish: "Community",
      href: "/community-gallery",
    },
    {
      nameBengali: "অর্ডার",
      nameEnglish: "Order",
      href: "/order-fulfillment-center",
    },
  ];

  const socialLinks = [
    { icon: "facebook", name: "Facebook", url: "https://facebook.com" },
    { icon: "instagram", name: "Instagram", url: "https://instagram.com" },
    { icon: "twitter", name: "Twitter", url: "https://twitter.com" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M8 15C8 15 8 12 10 10C12 8 15 8 15 8H25C25 8 28 8 30 10C32 12 32 15 32 15V28C32 30 30 32 28 32H12C10 32 8 30 8 28V15Z"
                    fill="white"
                  />
                  <path
                    d="M14 6C14 6 14 4 15 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 5C20 5 20 3 21 2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M26 6C26 6 26 4 27 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold font-bengali">চাই টোকেন</p>
                <p className="text-sm font-heading">Chai Token</p>
              </div>
            </div>
            <p className="text-sm font-bengali mb-2 leading-relaxed">
              এক কাপ চা, হাজারো গল্প
            </p>
            <p className="text-xs font-body opacity-80 leading-relaxed">
              One Cup of Tea, Thousands of Stories
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bengali font-semibold mb-4">
              দ্রুত লিংক
            </h3>
            <p className="text-sm font-heading mb-4 opacity-80">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link?.href}
                    className="text-sm font-bengali hover:text-secondary cultural-transition flex items-center space-x-2"
                  >
                    <Icon name="ChevronRightIcon" size={16} />
                    <span>{link?.nameBengali}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bengali font-semibold mb-4">যোগাযোগ</h3>
            <p className="text-sm font-heading mb-4 opacity-80">Contact Us</p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Icon
                  name="MapPinIcon"
                  size={20}
                  className="flex-shrink-0 mt-1"
                />
                <div>
                  <p className="text-sm font-bengali">১২৩ চা রোড, ঢাকা</p>
                  <p className="text-xs font-body opacity-80">
                    123 Chai Road, Dhaka
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Icon
                  name="PhoneIcon"
                  size={20}
                  className="flex-shrink-0 mt-1"
                />
                <div>
                  <p className="text-sm font-body">+880 1234-567890</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Icon
                  name="EnvelopeIcon"
                  size={20}
                  className="flex-shrink-0 mt-1"
                />
                <div>
                  <p className="text-sm font-body">info@chaitoken.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h3 className="text-lg font-bengali font-semibold mb-4">
              সময়সূচী
            </h3>
            <p className="text-sm font-heading mb-4 opacity-80">
              Opening Hours
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="font-bengali">সোমবার - শুক্রবার</span>
                <span className="font-body">7AM - 10PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bengali">শনিবার - রবিবার</span>
                <span className="font-body">8AM - 11PM</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bengali mb-3">সামাজিক মাধ্যম</p>
              <div className="flex space-x-4">
                {socialLinks?.map((social, index) => (
                  <a
                    key={index}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary cultural-transition"
                    aria-label={social?.name}
                  >
                    <Icon name="ShareIcon" size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm font-body text-center md:text-left">
              © {currentYear} Chai Token. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="text-sm font-body hover:text-secondary cultural-transition"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm font-body hover:text-secondary cultural-transition"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
