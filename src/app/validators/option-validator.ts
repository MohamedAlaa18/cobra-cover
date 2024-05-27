// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950

import { product_prices } from "../config/products"

export const colors = [
    { label: "Black", value: "black", tw: "zinc-900" },
    { label: "Blue", value: "blue", tw: "blue-950" },
    { label: "Rose", value: "rose", tw: "rose-950" },
] as const


export const models = {
    name: "models",
    options: [
        { label: "iPhone X", value: "iphoneX" },
        { label: "iPhone 11", value: "iphone11" },
        { label: "iPhone 12", value: "iphone12" },
        { label: "iPhone 13", value: "iphone13" },
        { label: "iPhone 14", value: "iphone14" },
        { label: "iPhone 15", value: "iphone15" },
    ]
} as const

export const materials = {
    name: "materials",
    options: [
        { label: "Silicone", value: "silicone", description: undefined, price: product_prices.material.silicone },
        { label: "Soft polycarbonate", value: "polycarbonate", description: "Scratch-resistant coating", price: product_prices.material.polycarbonate },
    ]
} as const

export const finishes = {
    name: "finishes",
    options: [
        { label: "Smooth Finish", value: "smooth", description: undefined, price: product_prices.finish.smooth },
        { label: "Textured Finish", value: "textured", description: "Soft grippy textured", price: product_prices.finish.textured },
    ]
} as const