import { Suspense } from "react"
import ThankYou from "./ThankYou"

function page() {
    return (
        <Suspense>
            <ThankYou />
        </Suspense>
    )
}

export default page