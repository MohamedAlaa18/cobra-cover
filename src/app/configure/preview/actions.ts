"use server"
import { base_price, product_prices } from "@/app/config/products";
import { db } from "@/db"
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from '@prisma/client'

export const createCheckoutSession = async ({ configId }: { configId: string }) => {
    const configuration = await db.configuration.findUnique({
        where: { id: configId },
    })

    if (!configuration) {
        throw new Error("No such configuration found");
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error('Your need to be logged in');
    }

    const { finish, material } = configuration;

    let price = base_price

    if (material === "polycarbonate")
        price += product_prices.material.polycarbonate;
    if (finish === "textured")
        price += product_prices.finish.textured;

    let order: Order | undefined = undefined;

    const existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id
        },
    })

    console.log(user.id, configuration.id);

    if (existingOrder) {
        order = existingOrder;
    } else {
        order = await db.order.create({
            data: {
                amount: price / 100,
                userId: user.id,
                configurationId: configuration.id,
            }
        })
    }

    const products = await stripe.products.create({
        name: "Custom iphone cover",
        images: [configuration.imageUrl],
        default_price_data: {
            currency: "USD",
            unit_amount: price,
        }
    })

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        payment_method_types: ['card'],
        mode: 'payment',
        shipping_address_collection: { allowed_countries: ["EG", "DE", "US"] },
        metadata: {
            userId: user.id,
            orderId: order.id
        },
        line_items: [{ price: products.default_price as string, quantity: 1 }]
    })

    return { url: stripeSession.url }
}