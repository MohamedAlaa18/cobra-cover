import type { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import Image from "next/image"
import { DialogDescription } from "@radix-ui/react-dialog"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { buttonVariants } from "./ui/button"

function LoginModal({ isOpen, SetIsOpen }: { isOpen: boolean, SetIsOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Dialog onOpenChange={SetIsOpen} open={isOpen}>
            <DialogContent className="absolute z-[9999]">
                <DialogHeader>
                    <div className="relative mx-auto w-24 h-24 mb-4">
                        <Image width={200} height={200} src='/snake-1.png' alt="snake" className="object-contain w-24 h-24" />
                    </div>

                    <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
                        Log in to continue
                    </DialogTitle>

                    <DialogDescription className="text-base text-center py-2">
                        <span className="font-medium text-zinc-900">Your configuration was saved! </span>
                        Please login or create an account to complete purchase.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
                    <LoginLink className={buttonVariants({ variant: 'outline' })}>Login</LoginLink>
                    <RegisterLink className={buttonVariants({ variant: 'default' })}>Sign up</RegisterLink>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal