import {Inter} from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import {ThemeProvider} from '@/components/ThemeProvider';

const inter = Inter({subsets: ['latin']});

export const metadata = {
    title: 'Michel Many - Full Stack Developer',
    description: 'Portfolio and professional profile of Michel Many, Full Stack Developer',
};

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
                <Header/>
                <main className="flex-grow">{children}</main>
                <Footer/>
            </div>
        </ThemeProvider>
        </body>
        </html>
    );
}
