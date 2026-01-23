import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function PrivateLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");


    if (!token) redirect("/client/login");

    return children;
}