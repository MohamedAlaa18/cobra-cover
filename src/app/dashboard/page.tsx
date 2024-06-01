import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound } from "next/navigation";
import StatusDropdown from "./StatusDropdown";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

async function page() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (!user || user.email !== ADMIN_EMAIL) {
        return notFound();
    }

    const orders = await db.order.findMany({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: true,
            ShippingAddress: true,
        }
    })

    const lastWeekSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7))
            }
        },
        _sum: {
            amount: true
        }
    })

    const lastMonthSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        },
        _sum: {
            amount: true
        }
    })

    const weekly_goaL = 500
    const monthly_goal = 2500

    return (
        <MaxWidthWrapper className='flex min-h-screen w-full bg-muted/40'>
            <div className='max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4'>
                <div className='flex flex-col gap-16'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card >
                            <CardHeader className="pb-2">
                                <CardDescription>Last Week</CardDescription>
                                <CardTitle className="text-4xl">{formatPrice(lastWeekSum._sum.amount ?? 0, "USD")}</CardTitle>
                            </CardHeader>

                            <CardContent className="text-sm text-mute-foreground">of {formatPrice(weekly_goaL, "USD")} goal</CardContent>

                            <CardFooter>
                                <Progress value={((lastWeekSum._sum.amount ?? 0) * 100) / weekly_goaL} />
                            </CardFooter>
                        </Card>

                        <Card >
                            <CardHeader className="pb-2">
                                <CardDescription>Last Month</CardDescription>
                                <CardTitle className="text-4xl">{formatPrice(lastMonthSum._sum.amount ?? 0, "USD")}</CardTitle>
                            </CardHeader>

                            <CardContent className="text-sm text-mute-foreground">of {formatPrice(monthly_goal, "USD")} goal</CardContent>

                            <CardFooter>
                                <Progress value={((lastWeekSum._sum.amount ?? 0) * 100) / monthly_goal} />
                            </CardFooter>
                        </Card>
                    </div>

                    <h1 className='text-4xl font-bold tracking-tight'>Incoming orders</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className='hidden sm:table-cell'>Status</TableHead>
                                <TableHead className='hidden sm:table-cell'>
                                    Purchase date
                                </TableHead>
                                <TableHead className='text-right'>Amount</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className='bg-accent'>
                                    <TableCell>
                                        <div className='font-medium'>
                                            {order.ShippingAddress?.name}
                                        </div>
                                        <div className='hidden text-sm text-muted-foreground md:inline'>
                                            {order.user.email}
                                        </div>
                                    </TableCell>

                                    <TableCell className='hidden sm:table-cell'>
                                        <StatusDropdown id={order.id} orderStatus={order.status} />
                                    </TableCell>

                                    <TableCell className='hidden md:table-cell'>
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className='text-right'>
                                        {formatPrice(order.amount, "USD")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default page