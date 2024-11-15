import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const preSeeds = async () => {
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

    // // TABLE
    // await prisma.table.createMany({
    //     data: [
    //         {
    //             number: 2,
    //             capacity: 4,
    //             available: true
    //         },
    //         {
    //             number: 2,
    //             capacity: 4,
    //             available: true
    //         },
    //         {
    //             number: 2,
    //             capacity: 4,
    //             available: false
    //         }
    //     ]
    // });

    // // USER
    // await prisma.user.createMany({
    //     data: [
    //         {
    //             name: "alex",
    //             email: "alex@example.com",
    //             phone: "1234567890",
    //             role_id: "customer",
    //             address: "1234 Ast Bcity",
    //             clerk_id: "example11"
    //         },
    //         {
    //             name: "nagira",
    //             email: "nagira@example.com",
    //             phone: "7894403211",
    //             role_id: "admin",
    //             address: "3333 Bst Fcity",
    //             clerk_id: "example22"
    //         },
    //         {
    //             name: "emma",
    //             email: "emma@example.com",
    //             phone: "0901234526",
    //             role_id: "customer",
    //             address: "2314 Dst ALcity",
    //             clerk_id: "example33"
    //         }
    //     ]
    // });

    // CATEGORY;
    await prisma.category.createMany({
        data: [
            { category_name: "Appetizers" },
            { category_name: "Main Course" },
            { category_name: "Desserts" },
            { category_name: "Beverages" },
            { category_name: "Extra" }
        ]
    });
};

// preSeeds()
//     .then(() => {
//         console.log("Successfully");
//     })
//     .catch((e) => {
//         console.error(e);
//     });

const mainSeeds = async () => {
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
            },
            {
                name: "Consommé extra",
                description: "",
                price: 2,
                category_id: "81757571-3ebc-4e64-9105-d3c60880c46c",
                image: "https://scontent-nrt1-2.xx.fbcdn.net/v/t39.30808-6/383224936_122133831086011350_7798067382690773365_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=sGCos9HegvEQ7kNvgHZcXjl&_nc_zt=23&_nc_ht=scontent-nrt1-2.xx&_nc_gid=AQuys5JOJnulQfUyIud6WBZ&oh=00_AYCw0sCNJ907jPQ7YW77BJzEhIJHjN19oBpS9GJ1ZGnyfw&oe=673D8692"
            },
            {
                name: "Salsa verde extra",
                description: "",
                price: 1,
                category_id: "81757571-3ebc-4e64-9105-d3c60880c46c",
                image: "https://thewoodenskillet.com/wp-content/uploads/2023/08/salsa-verde-recipe-9.jpg"
            },
            {
                name: "Salsa roja extra",
                description: "",
                price: 1,
                category_id: "81757571-3ebc-4e64-9105-d3c60880c46c",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBigRBc8klsh07dZRfKKhFaVlI2Yq8EQNZhg&s"
            },
            {
                name: "Jamaican Water",
                description: "",
                price: 4,
                category_id: "1b06f26b-8ca3-49e7-8772-e84c7359ac0e",
                image: "https://www.simplyrecipes.com/thmb/VOhKfkn4jFojglUUSCr5Uj6dcKU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Agua-De-Jamaica-LEAD-04-a177ada5cc504e2bab26fedabb46cb0b.jpg"
            },
            {
                name: "Coca-Cola Can",
                description: "",
                price: 2.4,
                category_id: "1b06f26b-8ca3-49e7-8772-e84c7359ac0e",
                image: "https://valleydirectfoods.com/cdn/shop/products/coca-cola-24-pack-561822.jpg?v=1699684011"
            },
            {
                name: "Sprite Can",
                description: "",
                price: 2.4,
                category_id: "1b06f26b-8ca3-49e7-8772-e84c7359ac0e",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSJRACRVBjGEKl9NC6y8Ico7rxcrrQC_oImJBRQtJrQ1x05SOOrHYyu7Q36GYtMqPNJeo&usqp=CAU"
            }
        ]
    });

    // NUTRIENTS
    await prisma.nutrients.createMany({
        data: [
            {
                menu_id: "c3fb1a77-1f58-4e7c-8296-1cfdcf0e2887",
                calories: 1200,
                protein: 60,
                carbohydrates: 70,
                fats: 75,
                fiber: 5,
                sugar: 3,
                sodium: 1.5
            },
            {
                menu_id: "94dc97e4-9c28-4a56-bb7f-003c94736ab0",
                calories: 800,
                protein: 30,
                carbohydrates: 70,
                fats: 40,
                fiber: 5,
                sugar: 2,
                sodium: 1.2
            },
            {
                menu_id: "bf796fab-63ef-420a-883d-83baa1d7cb1b",
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

    // //Review
    // await prisma.review.createMany({
    //     data: [
    //         { user_id: "aaa", menu_id: "abc", stars: 2, comments: "nice" },
    //         { user_id: "bbb", menu_id: "def", stars: 4, comments: "good" },
    //         { user_id: "ccc", menu_id: "ghi", stars: 4, comments: "awesome" },
    //         { user_id: "ddd", menu_id: "jkl", stars: 1, comments: "" },
    //         { user_id: "eee", menu_id: "opq", stars: 4, comments: "great" }
    //     ]
    // });

    // //Reservation
    // await prisma.reservation.createMany({
    //     data: [
    //         {
    //             user_id: "sss",
    //             num_of_people: 5,
    //             table_id: "nhh",
    //             location: "china town",
    //             reservationDateTime: "2024-11-12 11:30:00"
    //         },
    //         {
    //             user_id: "sss",
    //             num_of_people: 1,
    //             table_id: "acd",
    //             location: "china town",
    //             reservationDateTime: "2024-11-15 10:30:00"
    //         },
    //         {
    //             user_id: "sss",
    //             num_of_people: 2,
    //             table_id: "jbh",
    //             location: "down town",
    //             reservationDateTime: "2024-11-24 03:00:00"
    //         },
    //         {
    //             user_id: "sss",
    //             num_of_people: 5,
    //             table_id: "ihv",
    //             location: "east town",
    //             reservationDateTime: "2024-11-11 12:30:00"
    //         },
    //         {
    //             user_id: "sss",
    //             num_of_people: 3,
    //             table_id: "egf",
    //             location: "west town",
    //             reservationDateTime: "2024-11-14 08:30:00"
    //         }
    //     ]
    // });
};

mainSeeds()
    .then(() => {
        console.log("Successfully");
    })
    .catch((e) => {
        console.error(e);
    });
