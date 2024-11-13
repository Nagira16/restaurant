// import {
//     ClerkProvider,
//     SignInButton,
//     SignedIn,
//     SignedOut,
//     UserButton
// } from "@clerk/nextjs";
// import "./globals.css";
// export default function RootLayout({
//     children
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <ClerkProvider>
//             <html lang="en">
//                 <body>
//                     <SignedOut>
//                         <SignInButton />
//                     </SignedOut>
//                     <SignedIn>
//                         <UserButton />
//                     </SignedIn>
//                     {children}
//                 </body>
//             </html>
//         </ClerkProvider>
//     );
// }

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en">
                <body>{children}</body>
            </html>
        </ClerkProvider>
    );
}
