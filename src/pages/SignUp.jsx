import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { signUpUser } from "../api"

export default function SignUp() {
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [status, setStatus] = React.useState("idle")
    const [error, setError] = React.useState(null)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        setError(null)

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters")
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
        <div className="signup-container">
            <h1>Create your account</h1>
            {error && <h3 className="red">{error}</h3>}

            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    required
                />
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    required
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password (min 6 characters)"
                    value={formData.password}
                    required
                />
                <input
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    required
                />
                <button disabled={status === "submitting"}>
                    {status === "submitting" ? "Creating account..." : "Sign up"}
                </button>
            </form>

            <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
        </div>
    )
}
