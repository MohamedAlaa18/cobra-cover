"use client"
import { base_price, product_prices } from '@/app/config/products';
import { colors, models } from '@/app/validators/option-validator';
import Phone from '@/components/Phone';
import { Button } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { Configuration } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { createCheckoutSession } from './actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from '@/components/LoginModal';

function DesignPreview({ configuration }: { configuration: Configuration }) {
    const { toast } = useToast();
    const router = useRouter();

    const { id } = configuration;
    const { user } = useKindeBrowserClient();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

    const { mutate: createPaymentSession } = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onSuccess: ({ url }) => {
            if (url) router.push(url)
            else throw new Error("Unable to retrieve payment URL.")
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                description: 'There was an error on our end. Please try again.',
                variant: 'destructive',
            })
        },
    })

    const handCheckout = () => {
        if (user) {
            createPaymentSession({ configId: id });
        } else {
            localStorage.setItem("configurationId", id);
            setIsLoginModalOpen(true)
        }
    }

    return (
        <>
            <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center">
                <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
            </div>

            <LoginModal isOpen={isLoginModalOpen} SetIsOpen={setIsLoginModalOpen} />

            <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
                <div className='sm:col-span-4 md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
                    <Phone
                        className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
                        imgScr={configuration.croppedImageUrl!} />
                </div>

                <div className='mt-6 sm:col-span-9 md:row-end-1'>
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
                            <Button onClick={() => handCheckout()} className='px-4 sm:px-6 lg:px-8'>
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
