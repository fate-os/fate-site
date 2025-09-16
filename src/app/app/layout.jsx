import ConditionalLayout from '@/layouts/conditional-layout';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <ConditionalLayout>{children}</ConditionalLayout>;
}
