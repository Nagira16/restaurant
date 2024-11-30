import { CartProvider } from "@/components/providers/CartContext";
// import "@/globals.css";

function MyApp({ Component, pageProps }: any) {
    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    );
}

export default MyApp;
