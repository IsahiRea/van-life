import { redirect } from "react-router"
import { auth } from "./api"

export async function requireAuth(request) {
    const user = auth.currentUser;

    if (!user) {
        const pathname = new URL(request.url).pathname;
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        );
    }

    return user;
}
