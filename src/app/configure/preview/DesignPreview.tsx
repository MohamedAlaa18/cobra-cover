"use client"
import { base_price, product_prices } from '@/app/config/products';
import { colors, models } from '@/app/validators/option-validator';
import Phone from '@/components/Phone';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { Configuration } from '@prisma/client';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'

function DesignPreview({ configuration }: { configuration: Configuration }) {
    const [showConfetti, setShowConfetti] = useState(false);
    useEffect(() => setShowConfetti(true), [])

    const { color, model, finish, material } = configuration;
    const tw = colors.find((supportedColor) => supportedColor.value === color)?.tw;


    const { label: modelLabel } = models.options.find(({ value }) => value === model)!;


    let totalPrice = base_price;
    if (material === "polycarbonate")
        totalPrice += product_prices.material.polycarbonate;
    if (finish === "textured")
        totalPrice += product_prices.finish.textured;

    return (
        <>
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
                <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
            </div>

            <div className='mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
                <div className='sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2'>
                    <Phone
                        className={cn(`bg-${tw}`)}
                        imgScr={configuration.croppedImageUrl!} />
                </div>

                <div className='mt-6 sm:col-span-9 sm:mt-0 md:row-end-1'>
                    <h3 className='text-3xl font-bold tracking-tight text-gray-900'>Your {modelLabel} Cover</h3>

                    <div className='mt-3 flex items-center gap-1.5 text-base'>
                        <Check className='h-4 w-4 text-green-500' />
                        In stock and ready to ship
                    </div>
                </div>

                <div className='sm:col-span-12 md:col-span-9 text-base'>
                    <div className='grid grid-cols-1 gap-y-8 border-b border-gray-200 sm:grid-cols-2 sm:px-6 ms:py-6 md:py-10'>
                        <div>
                            <p className='font-medium text-zinc-950'>HightLights</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>Wireless Charging compatible</li>
                                <li>TPU shock absorption</li>
                                <li>Packing made from recycle materials</li>
                                <li>5 years print warranty</li>
                            </ol>
                        </div>

                        <div>
                            <p className='font-medium text-zinc-950'>Materials</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-insides'>
                                <li>High-quality, durable material</li>
                                <li>Scratch- and fingerprint resistant coating</li>
                            </ol>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
                            <div className='flow-root text-sm'>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p className='text-gray-600'>Base price</p>
                                    <p className='font-medium text-gray-900'>{formatPrice(base_price / 100, "USD")}</p>
                                </div>

                                {finish === "textured" ? (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p className='text-gray-600'>Textured finish</p>
                                        <p className='font-medium text-gray-900'>{formatPrice(product_prices.finish.textured / 100, "USD")}</p>
                                    </div>
                                ) : null}

                                {material === "polycarbonate" ? (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p className='text-gray-600'>Soft polycarbonate material</p>
                                        <p className='font-medium text-gray-900'>{formatPrice(product_prices.material.polycarbonate / 100, "USD")}</p>
                                    </div>
                                ) : null}

                                <div className='my-2 h-px bg-gray-200' />

                                <div className='flex items-center justify-between py-2'>
                                    <p className='font-semibold text-gray-900'>Order total</p>
                                    <p className='font-semibold text-gray-900'>{formatPrice(totalPrice / 100, "USD")}</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8 flex justify-end pb-12'>
                            <Button className='px-4 sm:px-6 lg:px-8'>
                                Check out <ArrowRight className='h-4 w-4 ml-1.5 inline' />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesignPreview