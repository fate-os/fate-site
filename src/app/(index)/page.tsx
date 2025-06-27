import { Metadata } from 'next';
import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Fate Os | Discover the Fate of a Human Based on Name and Birthday',
  description:
    'Fate Os helps you uncover the destiny of a person based on their name and birthday date. Explore insights and predictions to understand the journey of life better.',
  icons: {
    icon: '/favicon.ico', // Default favicon
    shortcut: '/favicon.ico', // Shortcut icon (optional)
    apple: '/logo/logo.png', // Apple Touch icon (for iOS devices)
  },
};

export default function Page() {
  return <HomeView />;
}
