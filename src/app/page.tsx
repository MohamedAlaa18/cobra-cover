import { Icons } from '@/components/Icons';
import MaxWithWrapper from '@/components/MaxWithWrapper';
import Phone from '@/components/Phone';
import Reviews from '@/components/Reviews';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Check, Star } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';


const users = [
  { src: '/users/user-1.png', alt: 'user' },
  { src: '/users/user-2.png', alt: 'user' },
  { src: '/users/user-3.png', alt: 'user' },
  { src: '/users/user-4.jpg', alt: 'user' },
  { src: '/users/user-5.jpg', alt: 'user' },
  { src: '/users/user-6.jpg', alt: 'user' },
];

const stars = [1, 2, 3, 4, 5];

const reviews = [
  {
    stars: 5,
    text: 'The cover feels durable and I even got a compliment on the design. Had the cover for two and a half months now and the image is super clear, on the cover I had before, the image started fading into yellow-ish color after a couple weeks. Love it.',
    highlightedText: 'the image is super clear',
    userImage: '/users/user-6.jpg',
    userName: 'Mohamed',
  },
  {
    stars: 5,
    text: 'I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratch marks on all of my last phone covers. This one, besides a barely noticeable scratch on the corner, looks brand new after about half a year. I dig it.',
    highlightedText: 'looks brand new after about half a year',
    userImage: '/users/user-1.png',
    userName: 'Liam',
  },
];

export default function Home() {
  return (
    <div className='bg-slate-50'>
      <section>
        <MaxWithWrapper className='pb-24  pt-10 lg:grid lg:grid-cols-3 sm:pb:32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52'>
          <div className='col-span-2 px-6 lg-px-0 lg:pt-4'>
            <div className='relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start'>
              <div className='absolute w-28 left-0 -top-20 hidden lg:block'>
                <Image src='/snake-1.png' width={100} height={100} className='w-full' alt='snake' />
              </div>

              <h1 className='relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl'>
                Your Image on a
                <span className='bg-green-600 px-2 text-white'>Custom</span>
                Phone cover
              </h1>

              <p className='mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Capture your favorite memories with your own,
                <span className='font-semibold'>one-of-one</span> phone cover.
                coverCobra allows you to protect your memories, not just your
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
                      width={100}
                      height={100}
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
                width={100}
                height={100}
                src='/your-image.png'
                alt='your-image'
                className='absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block'
              />
              <Image
                width={100}
                height={100}
                src='/line.png'
                alt='line'
                className='absolute w-20 -left-6 -bottom-6 select-none'
              />
              <Phone className='w-64' imgScr='/testimonials/8.jpg' />
            </div>
          </div>
        </MaxWithWrapper>
      </section>

      <section className='bg-slate-100 py-24'>
        <MaxWithWrapper className='flex flex-col items-center gap-16 sm:gap-32'>
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

          <div className='mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16'>
            {reviews.map((review, index) => (
              <div key={index} className='flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20'>
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
                    width={100}
                    height={100}
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

        <div className='pt-16'>
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWithWrapper className='py-24'>
          <div className='mb-12 px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl sm:text-center'>
              <h2 className='order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900'>
                Upload your photo and get
                <span className='relative px-2 bg-green-600 text-white'>
                  your own cover

                </span>
                now
              </h2>
            </div>
          </div>

          <div className='mx-auto max-w-6xl px-6 lg:px-8'>
            <div className='relative flex flex-col items-center md:grid grid-cols-2 gap-40'>
              <Image
                width={100}
                height={100}
                src='/arrow.png'
                alt='arrow'
                className='absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0'
              />

              <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/5 lg:rounded-2xl'>
                <Image
                  width={400}
                  height={600}
                  src='/horse.jpg'
                  alt='horse'
                  className='rounded-md objet-cover bg-white shadow-2xl ring-1 bg-gray-900/5 w-full h-full'
                />
              </div>

              <Phone className='w-60' imgScr='/horse_phone.jpg' />
            </div>
          </div>

          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              High-quality silicon material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Scratch and fingerprint resistent coating
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              wireless charging compatible
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              5 years print warranty
            </li>

            <div className='flex justify-center'>
              <Link className={buttonVariants({ size: 'lg', className: 'mx-auto mt-8' })}
                href='/configure/upload'>
                Create your own cover now
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </ul>
        </MaxWithWrapper>
      </section>
    </div >
  );
}
