import { useState } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    Link
} from "react-router"
import { signInUser } from "../../lib/api"
import { sanitizeRedirectUrl } from "../../lib/utils"
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineExclamationCircle, HiOutlineInformationCircle, HiOutlineShieldCheck, HiOutlineLockOpen } from "react-icons/hi"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const rawRedirect = new URL(request.url).searchParams.get("redirectTo")
    const pathname = sanitizeRedirectUrl(rawRedirect, "/host")

    try {
        await signInUser({ email, password })
        return redirect(pathname)
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const isSubmitting = navigation.state === "submitting"

    return (
        <div className="auth-page">
            {/* Hero Section */}
            <div className="auth-hero">
                <div className="auth-hero-content">
                    <span className="auth-hero-badge">
                        <HiOutlineLockOpen size={14} />
                        Welcome Back
                    </span>
                    <h2 className="auth-hero-title">
                        Your next adventure awaits
                    </h2>
                    <p className="auth-hero-subtitle">
                        Sign in to access your bookings and discover new vans
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="auth-form-section">
                <div className="auth-form-wrapper">
                    <div className="auth-form-header">
                        <h1>Sign In</h1>
                        <p>Enter your credentials to continue</p>
                    </div>

                    {/* Info Message */}
                    {message && (
                        <div className="auth-message auth-message--info">
                            <HiOutlineInformationCircle className="auth-message-icon" />
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="auth-message auth-message--error">
                            <HiOutlineExclamationCircle className="auth-message-icon" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <Form method="post" className="auth-form" replace>
                        {/* Email Input */}
                        <div className="auth-input-group">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email address"
                                className="auth-input"
                                required
                                autoComplete="email"
                            />
                            <HiOutlineMail className="auth-input-icon" />
                        </div>

                        {/* Password Input */}
                        <div className="auth-input-group">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="auth-input"
                                required
                                autoComplete="current-password"
                            />
                            <HiOutlineLockClosed className="auth-input-icon" />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <HiOutlineEyeOff size={18} />
                                ) : (
                                    <HiOutlineEye size={18} />
                                )}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`auth-submit-btn ${isSubmitting ? 'auth-submit-btn--loading' : ''}`}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </button>
                    </Form>

                    {/* Form Footer */}
                    <div className="auth-form-footer">
                        <Link to="/forgot-password" className="auth-forgot-link">
                            Forgot your password?
                        </Link>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <p className="auth-switch-link">
                            Don't have an account? <Link to="/signup">Create one</Link>
                        </p>
                    </div>

                    {/* Trust Indicators */}
                    <div className="auth-trust">
                        <div className="auth-trust-item">
                            <HiOutlineShieldCheck className="auth-trust-icon" />
                            <span>Secure login</span>
                        </div>
                        <div className="auth-trust-item">
                            <HiOutlineLockClosed className="auth-trust-icon" />
                            <span>Encrypted data</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
