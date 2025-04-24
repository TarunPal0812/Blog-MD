import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // console.log(input);

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post("http://localhost:5000/api/v1/auth/register", input)
            navigate("/login")
            
        } catch (error) {
            setError(error.response.data)
            
        }
    }

    return (
        <div className="auth">
            <h1>Register</h1>
            <form method='post'>
                <input
                    onChange={handleChange}
                    //value={input.username}
                    required
                    type="text"
                    placeholder="username"
                    name="username"

                />
                <input
                    onChange={handleChange}
                    //value={input.email}
                    required
                    type="email"
                    placeholder="email"
                    name="email"

                />
                <input
                    onChange={handleChange}
                    //value={input.password}
                    required
                    type="password"
                    placeholder="password"
                    name="password"

                />
                <button onClick={handelSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>
                    Do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Register