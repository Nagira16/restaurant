import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-background text-foreground antialiased min-h-screen flex flex-col gap-0">
                <ClerkProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </ClerkProvider>
            </body>
        </html>
    );
}
