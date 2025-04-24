
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";


const Login = () => {

    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { login } = useContext(AuthContext)
    


    const handelInput = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
           await login(input) 
            //console.log(response.data); 
            navigate("/")

        } catch (error) {
            // console.log(error);

            setError(error.response.data)

        }
    }

    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input
                    onChange={handelInput}
                    required
                    type="text"
                    placeholder="username"
                    name="username"

                />
                <input
                    onChange={handelInput}
                    required
                    type="password"
                    placeholder="password"
                    name="password"

                />
                <button onClick={handelSubmit}>Login</button>
                {error && <p>{error}</p>}
                <span>
                    Don't you have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login