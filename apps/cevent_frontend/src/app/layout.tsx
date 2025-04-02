import type { Metadata } from 'next';
import '../styles/globals.css';
import ThemeRegistry from './ThemeProvider';
import Header from '@/components/Header';
import ReduxProvider from '@/redux/redux-provider';
import Footer from '@/components/Footer';
import SessionProviderWrapper from '@/utils/sessionProviderWrapper';
import LoadData from '@/components/LoadData';

export const metadata: Metadata = {
  title: 'CEvent',
  description: 'CEvent is a platform for creating and managing events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className="font-inter">
          <ReduxProvider>
            <ThemeRegistry>
              <LoadData />
              <Header />
              {children}
              <Footer />
            </ThemeRegistry>
          </ReduxProvider>
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
