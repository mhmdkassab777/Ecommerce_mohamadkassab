import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "https://localhost:7014/api/user/login";
        const data = {
            Email: email,
            Password: password
        }

        axios.post(url, data)
          .then(function (response) {
            navigate('/products', { replace: true });
            console.log(response);
          })
          .catch(function (error) {
            navigate('/home', { replace: true });
            console.log(error);
          });
    };

    

    return(
        <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
     
            <div className="form-header">
            <h1>Login</h1>
            </div>
            <div className="form-group">
                <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button className="primary-button" type="submit">Login</button>
         
         </form>
         </div>
    )
}
export default Login;