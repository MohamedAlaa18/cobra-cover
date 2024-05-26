import Image from "next/image"
import MaxWithWrapper from "./MaxWithWrapper"
import { Check, Star } from "lucide-react";
import { Icons } from "./Icons";

const reviews = [
    {
        stars: 5,
        text: 'I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratch marks on all of my last phone covers. This one, besides a barely noticeable scratch on the corner, looks brand new after about half a year. I dig it.',
        highlightedText: 'looks brand new after about half a year',
        userImage: '/users/user-1.png',
        userName: 'Liam',
    },
    {
        stars: 5,
        text: 'The cover feels durable and I even got a compliment on the design. Had the cover for two and a half months now and the image is super clear, on the cover I had before, the image started fading into yellow-ish color after a couple weeks. Love it.',
        highlightedText: 'the image is super clear',
        userImage: '/users/user-6.jpg',
        userName: 'Mohamed',
    },
];

function Testimonials() {
    return (
        <MaxWithWrapper className='flex flex-col items-center justify-center gap-16 sm:gap-32'>
            <div className='flex flex-col lg:flex-row items-center gap-4 sm:gap'>

                <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                    What our
                    <span className='relative px-2'>
                        customers
                        <Icons.underline className='hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-500' />
                    </span>
                    say
                </h2>

                <Image width={100} height={100} src='/snake-2.png' alt='snake-2' className='w-24 order-0 lg:order-2' />
            </div>

            <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16 lg:gap-x-8 xl:gap-x-20'>
                {reviews.map((review, index) => (
                    <div key={index} className='flex flex-auto flex-col gap-4'>
                        <div className='flex gap-0.5 mb-2'>
                            {Array.from({ length: review.stars }).map((_, starIndex) => (
                                <Star key={starIndex} className='h-4 w-4 text-green-600 fill-green-600' />
                            ))}
                        </div>

                        <div className='text-lg leading-8'>
                            <p>
                                &quot;{review.text.split(review.highlightedText)[0]}
                                <span className='p-0.5 bg-slate-800 text-white'>
                                    {review.highlightedText}
                                </span>
                                {review.text.split(review.highlightedText)[1]}&quot;
                            </p>
                        </div>

                        <div className='flex gap-4 mt-2'>
                            <Image
                                width={300}
                                height={300}
                                src={review.userImage}
                                alt={review.userName}
                                className='rounded-full h-12 w-12 object-cover'
                            />

                            <div className='flex flex-col'>
                                <p className='font-semibold'>{review.userName}</p>

                                <div className='flex gap-1.5 items-center text-zinc-600'>
                                    <Check className='h-4 w-4 stroke-[3px] text-green-600' />
                                    <p className='text-sm'>Verified Purchase</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MaxWithWrapper>
    )
}

export default Testimonials