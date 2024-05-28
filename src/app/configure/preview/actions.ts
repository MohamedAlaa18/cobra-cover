"use server"
import { base_price, product_prices } from "@/app/config/products";
import { db } from "@/db"
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
}