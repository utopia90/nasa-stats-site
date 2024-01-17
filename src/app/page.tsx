import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Home from "./server/page"

import { redirect } from "next/navigation"

export default async function Page() {
    const session = await getServerSession(options)

    return (
        <Home/>
    )

}