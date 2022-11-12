/**
 * User log in form.
 * 
 * @ "/login"
 * 
 * Redirects user to "/companies"
 * 
 */

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ login }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formErr, setFormErr] = useState([]);

    /**
     * Handle form submission
     */

    async function handleSubmit(e) {
        e.preventDefault();
        let res = await login(formData);
        if (res.success) {
            history.push('/companies');
        } else {
            setFormErr(res.err);
        }
        setFormData({
            username: "",
            password: ""
        })
    };

    /** Update form data */
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({ ...data, [name]: value }))
    };

    const { username, password } = formData;

    return (
        <div>
            <h2>Log In</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            name="username"
                            value={username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        {formErr ?
                            <>{
                                formErr.map(error => (
                                    <p key={error}>{error}</p>
                                ))
                            }
                            </>
                            : null}
                    </div>

                    <button type="submit" onSubmit={handleSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}


export default LoginForm;