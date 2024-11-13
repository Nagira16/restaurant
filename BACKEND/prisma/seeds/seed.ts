import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seeds = async () => {
    // ROLE
    await prisma.role.createMany({
        data: [
            { role_name: "Customer" },
            { role_name: "Manager" },
            { role_name: "Chef" },
            { role_name: "Waiter" },
            { role_name: "Admin" }
        ]
    });

    // TABLE
    await prisma.table.createMany({
        data: [
            {
                number: 2,
                capacity: 4,
                available: true
            },
            {
                number: 2,
                capacity: 4,
                available: true
            },
            {
                number: 2,
                capacity: 4,
                available: false
            }
        ]
    });

    // USER
    await prisma.user.createMany({
        data: [
            {
                name: "alex",
                email: "alex@example.com",
                phone: "1234567890",
                role_id: "customer",
                address: "1234 Ast Bcity",
                clerk_id: "example11"
            },
            {
                name: "nagira",
                email: "nagira@example.com",
                phone: "7894403211",
                role_id: "admin",
                address: "3333 Bst Fcity",
                clerk_id: "example22"
            },
            {
                name: "emma",
                email: "emma@example.com",
                phone: "0901234526",
                role_id: "customer",
                address: "2314 Dst ALcity",
                clerk_id: "example33"
            }
        ]
    });

    // CATEGORY;
    await prisma.category.createMany({
        data: [
            { category_name: "Appetizers" },
            { category_name: "Main Course" },
            { category_name: "Desserts" },
            { category_name: "Beverages" }
        ]
    });

    // MENU
    await prisma.menu.createMany({
        data: [
            {
                name: "Quesabirrias",
                description:
                    "5 pieces accompanied with their consommé, cilantro, onion, lemon, and sauce. (With 2 tortillas each, beef and mozzarella cheese)",
                price: 25,
                category_id: "531f638b-b8f7-43c8-a2aa-b9f037be1893",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTj8D6rRY_YMHrtldIZ9ruek0juCjWYFonsQ&s"
            },
            {
                name: "Birria Tacos",
                description:
                    "4 large double tortilla tacos with cilantro, onion, lemon, and salsa.",
                price: 25,
                category_id: "531f638b-b8f7-43c8-a2aa-b9f037be1893",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxXWIWD-_ggrZgZ2CpTj6jp-Rv0sHOHUX2Q&s"
            },
            {
                name: "Birria in Consommé",
                description:
                    "Large plate of birria with cilantro, onion, lemon, sauce, and tortillas.",
                price: 25,
                category_id: "531f638b-b8f7-43c8-a2aa-b9f037be1893",
                image: "https://tb-static.uber.com/prod/image-proc/processed_images/7378eb3ba7202b6dfad1ef0c1741b2c3/7f4ae9ca0446cbc23e71d8d395a98428.jpeg"
            }
        ]
    });

    // NUTRIENTS
    await prisma.nutrients.createMany({
        data: [
            {
                menu_id: "Quesabirrias",
                calories: 1200,
                protein: 60,
                carbohydrates: 70,
                fats: 75,
                fiber: 5,
                sugar: 3,
                sodium: 1.5
            },
            {
                menu_id: "Birria Tacos",
                calories: 800,
                protein: 30,
                carbohydrates: 70,
                fats: 40,
                fiber: 5,
                sugar: 2,
                sodium: 1.2
            },
            {
                menu_id: "Birria in Consommé",
                calories: 1100,
                protein: 70,
                carbohydrates: 50,
                fats: 60,
                fiber: 4,
                sugar: 2,
                sodium: 2
            }
        ]
    });

    //Review
    await prisma.review.createMany({
        data: [
            { user_id: "aaa", menu_id: "abc", stars: 2, comments: "nice" },
            { user_id: "bbb", menu_id: "def", stars: 4, comments: "good" },
            { user_id: "ccc", menu_id: "ghi", stars: 4, comments: "awesome" },
            { user_id: "ddd", menu_id: "jkl", stars: 1, comments: "" },
            { user_id: "eee", menu_id: "opq", stars: 4, comments: "great" }
        ]
    });

    //Reservation
    await prisma.reservation.createMany({
        data: [
            {
                user_id: "sss",
                num_of_people: 5,
                table_id: "nhh",
                location: "china town",
                reservationDateTime: "2024-11-12 11:30:00"
            },
            {
                user_id: "sss",
                num_of_people: 1,
                table_id: "acd",
                location: "china town",
                reservationDateTime: "2024-11-15 10:30:00"
            },
            {
                user_id: "sss",
                num_of_people: 2,
                table_id: "jbh",
                location: "down town",
                reservationDateTime: "2024-11-24 03:00:00"
            },
            {
                user_id: "sss",
                num_of_people: 5,
                table_id: "ihv",
                location: "east town",
                reservationDateTime: "2024-11-11 12:30:00"
            },
            {
                user_id: "sss",
                num_of_people: 3,
                table_id: "egf",
                location: "west town",
                reservationDateTime: "2024-11-14 08:30:00"
            }
        ]
    });
};

seeds()
    .then(() => {
        console.log("Successfully");
    })
    .catch((e) => {
        console.error(e);
    });
