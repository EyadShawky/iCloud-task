import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from "@/cart/CartContext";
import MainLayout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Company Pillars",
  description: "Shopping app",
};

export default function RootLayout({ children }) {
  return (
   <>
   
    <CartProvider>
        <html lang="en">
          <body className={inter.className}>
          <MainLayout>
            {children}
            </MainLayout>
            </body>
        </html>
    </CartProvider>
   </>
  );
}
