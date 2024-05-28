"use server"
import { db } from "@/db"
import { CoverColor, CoverFinish, CoverMaterial, PhoneModel } from "@prisma/client"

export interface saveConfigArgs {
    color: CoverColor, finish: CoverFinish, material: CoverMaterial, model: PhoneModel, configId: string
}

export async function saveConfig({ color, finish, material, model, configId }: saveConfigArgs) {
    await db.configuration.update({
        where: { id: configId },
        data: { color, finish, material, model }
    })
}