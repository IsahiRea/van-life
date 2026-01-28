import { useState, useMemo } from "react"
import { useNavigate, Link } from "react-router"
import { signUpUser } from "../../lib/api"
import { validatePassword } from "../../lib/utils"
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
    HiOutlineExclamationCircle,
    HiOutlineUser,
    HiOutlineCheck,
    HiOutlineX,
    HiOutlineSparkles,
    HiOutlineTruck,
    HiOutlineHeart,
    HiOutlineStar
} from "react-icons/hi"

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [status, setStatus] = useState("idle")
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const isSubmitting = status === "submitting"

    // Password validation
    const passwordValidation = useMemo(
        () => validatePassword(formData.password),
        [formData.password]
    )
    const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)

        if (!passwordValidation.isValid) {
            setError("Password must be at least 8 characters and include 3 of: uppercase, lowercase, number")
            return
        }

        if (!passwordsMatch) {
            setError("Passwords do not match")
            return
        }

        setStatus("submitting")

        signUpUser(formData)
            .then(() => {
                setStatus("idle")
                navigate("/host", { replace: true })
            })
            .catch(err => {
                setError(err.message)
                setStatus("idle")
            })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="auth-page auth-page--signup">
            {/* Hero Section */}
            <div className="auth-hero">
                <div className="auth-hero-content">
                    <span className="auth-hero-badge">
                        <HiOutlineSparkles size={14} />
                        Get Started
                    </span>
                    <h2 className="auth-hero-title">
                        Start your van life journey today
                    </h2>
                    <p className="auth-hero-subtitle">
                        Join thousands of adventurers exploring the open road
                    </p>

                    {/* Benefits - Desktop only */}
                    <div className="auth-benefits">
                        <div className="auth-benefit">
                            <HiOutlineTruck className="auth-benefit-icon" />
                            <span>Access to 500+ unique vans</span>
                        </div>
                        <div className="auth-benefit">
                            <HiOutlineHeart className="auth-benefit-icon" />
                            <span>Save your favorite listings</span>
                        </div>
                        <div className="auth-benefit">
                            <HiOutlineStar className="auth-benefit-icon" />
                            <span>Exclusive member discounts</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="auth-form-section">
                <div className="auth-form-wrapper">
                    <div className="auth-form-header">
                        <h1>Create Account</h1>
                        <p>Fill in your details to get started</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="auth-message auth-message--error">
                            <HiOutlineExclamationCircle className="auth-message-icon" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Name Input */}
                        <div className="auth-input-group">
                            <input
                                name="name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Full name"
                                className="auth-input"
                                value={formData.name}
                                required
                                autoComplete="name"
                            />
                            <HiOutlineUser className="auth-input-icon" />
                        </div>

                        {/* Email Input */}
                        <div className="auth-input-group">
                            <input
                                name="email"
                                onChange={handleChange}
                                type="email"
                                placeholder="Email address"
                                className="auth-input"
                                value={formData.email}
                                required
                                autoComplete="email"
                            />
                            <HiOutlineMail className="auth-input-icon" />
                        </div>

                        {/* Password Input */}
                        <div className="auth-input-group">
                            <input
                                name="password"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="auth-input"
                                value={formData.password}
                                required
                                autoComplete="new-password"
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

                        {/* Confirm Password Input */}
                        <div className="auth-input-group">
                            <input
                                name="confirmPassword"
                                onChange={handleChange}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="auth-input"
                                value={formData.confirmPassword}
                                required
                                autoComplete="new-password"
                            />
                            <HiOutlineLockClosed className="auth-input-icon" />
                            <button
                                type="button"
                                className="auth-password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <HiOutlineEyeOff size={18} />
                                ) : (
                                    <HiOutlineEye size={18} />
                                )}
                            </button>
                        </div>

                        {/* Password Requirements */}
                        {(formData.password || formData.confirmPassword) && (
                            <div className="auth-password-requirements">
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="auth-password-strength">
                                        <div className="auth-strength-bars">
                                            {[1, 2, 3, 4].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`auth-strength-bar ${
                                                        passwordValidation.strength >= level
                                                            ? `auth-strength-bar--level-${passwordValidation.strength}`
                                                            : ''
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className={`auth-strength-label auth-strength-label--level-${passwordValidation.strength}`}>
                                            {passwordValidation.strength === 0 && 'Too weak'}
                                            {passwordValidation.strength === 1 && 'Weak'}
                                            {passwordValidation.strength === 2 && 'Fair'}
                                            {passwordValidation.strength === 3 && 'Good'}
                                            {passwordValidation.strength === 4 && 'Strong'}
                                        </span>
                                    </div>
                                )}

                                <div className={`auth-requirement ${passwordValidation.requirements.minLength ? 'auth-requirement--valid' : ''}`}>
                                    {passwordValidation.requirements.minLength ? (
                                        <HiOutlineCheck className="auth-requirement-icon" />
                                    ) : (
                                        <HiOutlineX className="auth-requirement-icon" />
                                    )}
                                    <span>At least 8 characters</span>
                                </div>
                                <div className={`auth-requirement ${passwordValidation.requirements.hasUppercase ? 'auth-requirement--valid' : ''}`}>
                                    {passwordValidation.requirements.hasUppercase ? (
                                        <HiOutlineCheck className="auth-requirement-icon" />
                                    ) : (
                                        <HiOutlineX className="auth-requirement-icon" />
                                    )}
                                    <span>One uppercase letter</span>
                                </div>
                                <div className={`auth-requirement ${passwordValidation.requirements.hasLowercase ? 'auth-requirement--valid' : ''}`}>
                                    {passwordValidation.requirements.hasLowercase ? (
                                        <HiOutlineCheck className="auth-requirement-icon" />
                                    ) : (
                                        <HiOutlineX className="auth-requirement-icon" />
                                    )}
                                    <span>One lowercase letter</span>
                                </div>
                                <div className={`auth-requirement ${passwordValidation.requirements.hasNumber ? 'auth-requirement--valid' : ''}`}>
                                    {passwordValidation.requirements.hasNumber ? (
                                        <HiOutlineCheck className="auth-requirement-icon" />
                                    ) : (
                                        <HiOutlineX className="auth-requirement-icon" />
                                    )}
                                    <span>One number</span>
                                </div>
                                {formData.confirmPassword && (
                                    <div className={`auth-requirement ${passwordsMatch ? 'auth-requirement--valid' : ''}`}>
                                        {passwordsMatch ? (
                                            <HiOutlineCheck className="auth-requirement-icon" />
                                        ) : (
                                            <HiOutlineX className="auth-requirement-icon" />
                                        )}
                                        <span>Passwords match</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`auth-submit-btn ${isSubmitting ? 'auth-submit-btn--loading' : ''}`}
                        >
                            {isSubmitting ? "Creating account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Form Footer */}
                    <div className="auth-form-footer">
                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <p className="auth-switch-link">
                            Already have an account? <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
