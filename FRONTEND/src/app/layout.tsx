// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { ThemeProvider } from "@/components/providers/theme-provider";

// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900"
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900"
// });

// export const metadata: Metadata = {
//     title: "DOÑA VICKY",
//     description: "Mexican Food LTD 🇲🇽"
// };

// export default function RootLayout({
//     children
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en">
//             <body
//                 className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//             >
//                 <ThemeProvider
//                     attribute="class"
//                     defaultTheme="system"
//                     enableSystem
//                     disableTransitionOnChange
//                 >
//                     {children}
//                 </ThemeProvider>
//             </body>
//         </html>
//     );
// }

import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from "@clerk/nextjs";
import "./globals.css";
export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
