import Hero from '@/components/Hero';
import MaxWithWrapper from '@/components/MaxWithWrapper';
import Phone from '@/components/Phone';
import Reviews from '@/components/Reviews';
import Testimonials from '@/components/Testimonials';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';

const features = [
  "High-quality silicon material",
  "Scratch and fingerprint resistant coating",
  "Wireless charging compatible",
  "5 years print warranty"
];

export default function Home() {
  return (
    <div className='bg-slate-50'>
      <section>
        <Hero />
      </section>

      <section className='bg-slate-100 py-24'>
        <Testimonials />

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
            <div className='relative flex flex-col items-center justify-center md:flex-row'>
              <div className='relative h-auto md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5  lg:rounded-2xl'>
                <Image
                  width={400}
                  height={600}
                  src='/horse.jpg'
                  alt='horse'
                  className='rounded-xl lg:rounded-2xl objet-cover bg-white shadow-2xl bg-gray-900/5 ring-[2px] ring-gray-900 w-full h-full'
                />
              </div>

              <div className='h-36'>
                <Image
                  width={200}
                  height={200}
                  src='/arrow.png'
                  alt='arrow'
                  className='rotate-90 md:rotate-0 w-36 mt-14'
                />
              </div>

              <Phone className='w-60' imgScr='/horse_phone.jpg' />
            </div>
          </div>

          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            {features.map((feature, index) => (
              <li key={index} className='w-fit'>
                <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
                {feature}
              </li>
            ))}
          </ul>

          <div className='flex justify-center'>
            <Link className={buttonVariants({ size: 'lg', className: 'mx-auto mt-8' })}
              href='/configure/upload'>
              Create your own cover now
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </MaxWithWrapper>
      </section>
    </div >
  );
}
