"use client"
import { CoverColor } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import { AspectRatio } from './ui/aspect-ratio';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function PhonePreview({ croppedImageUrl, color }: { croppedImageUrl: string, color: CoverColor }) {
    const [renderedDimensions, setRenderedDimensions] = useState({
        height: 0,
        width: 0
    });
    const ref = useRef<HTMLDivElement>(null)

    const handleResize = () => {
        if (!ref.current) return;

        const { width, height } = ref.current.getBoundingClientRect();

        setRenderedDimensions({ width, height })
    }

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current])

    let coverBackgroundColor = 'bg-zinc-950'
    if (color === "blue")
        coverBackgroundColor = 'bg-blue-950';
    if (color === "rose")
        coverBackgroundColor = 'bg-rose-950';

    return (
        <AspectRatio ref={ref} ratio={3000 / 2001} className='relative'>
            <div className='absolute z-20 scale-[1.0352]'
                style={{
                    left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
                    top: renderedDimensions.height / 6.22,
                }}>

                <Image src={croppedImageUrl}
                    // fill
                    width={renderedDimensions.width / (3000 / 637)}
                    height={200}
                    alt='user-phone'
                    className={cn('phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]',
                        coverBackgroundColor
                    )} />
            </div>

            <div className='relative w-full h-full z-40'>
                <Image src='/clearphone.png' alt='phone' fill className='w-full h-full antialiased rounded-md' />
            </div>
        </AspectRatio>
    )
}

export default PhonePreview