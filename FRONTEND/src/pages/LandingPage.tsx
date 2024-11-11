import { SignUpButton } from "@clerk/nextjs";

const LandingPage = () => {
    return (
        <main>
            <div>
                <div>
                    <h1>Experience the True Taste of Mexico</h1>
                    <p>
                        Welcome to our authentic Mexican restaurant, where every
                        dish bursts with flavor and every visit feels like a
                        fiesta. Join us for a vibrant dining experience that
                        celebrates the rich culinary traditions of Mexico.
                    </p>
                    <div>
                        <a href="#">Learn More</a>
                        <SignUpButton>
                            <button>Sign Up</button>
                        </SignUpButton>
                    </div>
                </div>
                <div>
                    <span>Image Placeholder</span>
                </div>
            </div>
        </main>
    );
};

export default LandingPage;
