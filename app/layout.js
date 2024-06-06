// app/layout.js
import { ChakraProvider } from '@chakra-ui/react';
import './globals.css'; // Make sure to include your global CSS if you have any

export const metadata = {
    title: 'UniHome',
    description: 'Find the perfect off-campus house for you!',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script src="/carousel.js"></script>
            </head>
            <body>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </body>
        </html>
    );
}
