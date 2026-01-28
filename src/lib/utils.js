import { redirect } from "react-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./api"

export function sanitizeRedirectUrl(url, fallback = "/host") {
    if (!url) return fallback;

    const trimmed = url.trim();

    // Must be relative path starting with single /
    if (!trimmed.startsWith('/') || trimmed.startsWith('//')) {
        return fallback;
    }

    // Reject protocol indicators
    if (trimmed.includes('://') || trimmed.includes('@')) {
        return fallback;
    }

    return trimmed;
}

function waitForAuthInit() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
}

export async function requireAuth(request) {
    const user = await waitForAuthInit();

    if (!user) {
        const pathname = new URL(request.url).pathname;
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        );
    }

    return user;
}

export function validatePassword(password) {
    const requirements = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /[0-9]/.test(password),
    };

    const strength = Object.values(requirements).filter(Boolean).length;

    return {
        requirements,
        strength,
        isValid: requirements.minLength && strength >= 3
    };
}
