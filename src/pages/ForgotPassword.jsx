import React from "react"
import { Link } from "react-router"
import { resetPassword } from "../api"

export default function ForgotPassword() {
    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState("idle")
    const [message, setMessage] = React.useState(null)
    const [error, setError] = React.useState(null)

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setMessage(null)
        setStatus("submitting")

        resetPassword(email)
            .then(() => {
                setStatus("success")
                setMessage("Password reset email sent! Check your inbox.")
                setEmail("")
            })
            .catch(err => {
                setError(err.message)
                setStatus("idle")
            })
    }

    function handleChange(e) {
        setEmail(e.target.value)
    }

    return (
        <div className="forgot-password-container">
            <h1>Reset your password</h1>
            <p className="instructions">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            {status !== "success" && (
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        required
                    />
                    <button disabled={status === "submitting"}>
                        {status === "submitting" ? "Sending..." : "Send reset link"}
                    </button>
                </form>
            )}

            <p className="back-to-login">
                Remember your password? <Link to="/login">Back to login</Link>
            </p>
        </div>
    )
}
