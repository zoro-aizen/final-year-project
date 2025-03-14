import { Link } from 'react-router-dom';

const navigation = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Roadmaps', href: '/explore' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Licensing', href: '/licensing' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/milesapp',
      icon: 'twitter',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/milesapp',
      icon: 'github',
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/milesapp',
      icon: 'discord',
    },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {Object.entries(navigation).map(([category, items]) => (
            <div key={category} className="pb-6">
              <h3 className="mb-4 text-sm font-semibold">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Miles, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
