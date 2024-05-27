import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfiguration from "./DesignConfiguration";

interface DesignProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

async function page({ searchParams }: DesignProps) {
    const { id } = searchParams;
    if (!id || typeof id !== "string") {
        return notFound();
    }

    const configuration = await db.configuration.findUnique({
        where: { id },
    })

    if (!configuration) {
        return notFound();
    }

    const { imageUrl, width, height } = configuration;

    return (
        <DesignConfiguration configId={configuration.id} imageDimensions={{ width, height }} imageUrl={imageUrl} />
    )
}

export default page