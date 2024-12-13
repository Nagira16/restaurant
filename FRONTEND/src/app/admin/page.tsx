import Link from "next/link";

const AdminLandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-4xl font-semibold text-center mb-4">
                Welcome to the Admin Dashboard
            </h1>
            <p className="text-lg text-center mb-8">
                Manage your application settings, users, content, and more from
                here.
            </p>
            <div className="flex flex-col items-stretch space-y-6 lg:space-y-0 lg:space-x-4 lg:block">
                <Link
                    href="/admin/users"
                    className="px-6 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    Manage Users
                </Link>
                <Link
                    href="/admin/menus"
                    className="px-6 py-2 text-white bg-green-600 rounded-xl hover:bg-green-700 transition-colors"
                >
                    Manage Menus
                </Link>
                <Link
                    href="/admin/reviews"
                    className="px-6 py-2 text-white bg-yellow-600 rounded-xl hover:bg-yellow-700 transition-colors"
                >
                    Manage Reviews
                </Link>
            </div>
        </div>
    );
};

export default AdminLandingPage;
