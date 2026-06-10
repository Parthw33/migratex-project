import type { Metadata } from 'next';
import './globals.css';
import { getGlobalComponent } from '@/lib/contentstack-api';
import { HeaderData, FooterData } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Parth Wattamwar | React/Next.js Developer',
  description: 'React/Next.js Developer based in Pune, India',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let headerData: HeaderData | null = null;
  let footerData: FooterData | null = null;

  try {
    const [headerRes, footerRes] = await Promise.all([
      getGlobalComponent('header'),
      getGlobalComponent('footer'),
    ]);
    headerData = headerRes as HeaderData;
    footerData = footerRes as FooterData;
  } catch (error) {
    console.error('Error fetching layout data:', error);
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-site-bg text-text-primary font-sans">
        <Header data={headerData} />
        <main className="relative z-10">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}