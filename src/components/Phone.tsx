import { cn } from "@/lib/utils"
import Image from "next/image"
import { HtmlHTMLAttributes } from "react"

interface phoneProps extends HtmlHTMLAttributes<HTMLDivElement> {
    imgScr: string
    dark?: boolean
}

function Phone({ imgScr, className, dark = false, ...props }: phoneProps) {
    return (
        <div
            className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
            {...props}>
            <Image
                width={1000}
                height={1000}
                src={
                    dark
                        ? '/phone-template-dark-edges.png'
                        : '/phone-template-white-edges.png'
                }
                alt='phone'
                className="pointer-events-none z-50 select-none"
            />

            <div className="absolute -z-10 inset-0">
                <Image width={1000} height={1000} src={imgScr} alt='phone-overlay' className="object-cover min-w-full min-h-full" />
            </div>
        </div>
    )
}

export default Phone