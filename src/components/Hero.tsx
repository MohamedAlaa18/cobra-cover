import Image from "next/image"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Check, Star } from "lucide-react"
import Phone from "./Phone";

const users = [
    { src: '/users/user-1.png', alt: 'user' },
    { src: '/users/user-2.png', alt: 'user' },
    { src: '/users/user-3.png', alt: 'user' },
    { src: '/users/user-4.jpg', alt: 'user' },
    { src: '/users/user-5.jpg', alt: 'user' },
    { src: '/users/user-6.jpg', alt: 'user' },
];

const stars = [1, 2, 3, 4, 5];

function Hero() {
    return (
        <MaxWidthWrapper className='pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb:32 lg:gap-x-0 xl:gap-x-8 lg:pt-24'>
            <div className='col-span-2 px-6 lg-px-0 lg:pt-4'>
                <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
                    <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                        <Image src='/snake-1.png' width={200} height={200} className='w-full' alt='snake' />
                    </div>

                    <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                        Your Image on a
                        <span className='bg-green-600 px-2 text-white'>Custom</span>
                        Phone cover
                    </h1>

                    <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                        Capture your favorite memories with your own,
                        <span className='font-semibold'>one-of-one</span> phone cover.
                        cobraCover allows you to protect your memories, not just your
                        phone cover.
                    </p>

                    <ul className='mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start'>
                        <div className='space-y-2'>
                            <li className='flex gap-1.5 items-center text-left'>
                                <Check className='h-5 w-5 shrink-0 text-green-600' />
                                High-quality, durable material
                            </li>
                            <li className='flex gap-1.5 items-center text-left'>
                                <Check className='h-5 w-5 shrink-0 text-green-600' />5 year
                                print guarantee
                            </li>
                            <li className='flex gap-1.5 items-center text-left'>
                                <Check className='h-5 w-5 shrink-0 text-green-600' />
                                Modern iPhone models supported
                            </li>
                        </div>
                    </ul>

                    <div className='mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5'>
                        <div className='flex -space-x-4'>
                            {users.map((user, index) => (
                                <Image
                                    key={index}
                                    width={200}
                                    height={200}
                                    className='inline-block h-10 w-10 rounded-full ring-2 ring-slate-100'
                                    src={user.src}
                                    alt={user.alt}
                                />
                            ))}
                        </div>

                        <div className='flex flex-col justify-between items-center sm:items-start'>
                            <div className='flex gap-0.5'>
                                {stars.map((_, index) => (
                                    <Star
                                        key={index}
                                        className='h-4 w-4 text-green-600 fill-green-600'
                                    />
                                ))}
                            </div>

                            <p>
                                <span className='font-semibold'>1.250</span> happy customers
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            <div className='col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit'>
                <div className='relative md:max-w-xl'>
                    <Image
                        width={200}
                        height={200}
                        src='/your-image.png'
                        alt='your-image'
                        className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
                    />
                    <Image
                        width={200}
                        height={200}
                        src='/line.png'
                        alt='line'
                        className='absolute w-20 -left-6 -bottom-6 select-none'
                    />
                    <Phone className='w-64' imgScr='/testimonials/1.jpg' />
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Hero