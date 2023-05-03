import React, { useState } from 'react'
import '../App.css'
import Login from './Login';
import SignUp from './SignUp';

function Registration() {
	const [signUp, isSignUp] = useState(false);
	const onChange = () => {
		isSignUp(!signUp);
		if (state === 'Login') {
			setState("SignUp")
		} else {
			setState("Login")
		}
		document.getElementById("forms").reset();
	}
	const [state, setState] = useState("Login")
	const handleSubmit = async function (e) {
		e.preventDefault();
		const ele = new FormData(e.target);
		const details = Object.fromEntries(ele);
		const response = await fetch('/auth/login', {
			method: 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: details.username,
				password: details.password,
				name: "name"
			})

		})
		const result = await response.json();
		console.log("result", result);
		if (result.success) {
			localStorage.setItem("auth-token", result.auth_token);
			window.location.reload();
		} else {
			alert(result.error.msg)
		}
	}

	const handleCreate = async (e) => {
		e.preventDefault();
		const details = new FormData(e.target);
		const user = Object.fromEntries(details);
		const response = await fetch('/auth/createUser', {
			method: 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: user.email,
				password: user.password,
				name: user.firstname
			})
		})
		const result = await response.json();
		if (result.error) {
			result.error.forEach(err => {
				alert(err.msg)
			})
		}
	}
	return (
	!signUp ?
		<section className="sec1">
			<div className="title-page">
				<p>Activity Room</p>
			</div>
			<div className="main-inputs login">
				<div className="choices">
					<input type="radio" id="radio1" name="tabs" value="login" onChange={onChange} defaultChecked={state === "Login"}></input>
					<label id="lab1" htmlFor="radio1">Login</label>
					<input type="radio" id="radio2" name="tabs" value="signup" onChange={onChange} defaultChecked={state === "SignUp"}></input>
					<label id="lab2" htmlFor="radio2">Sign Up</label>
				</div>
				<Login prop={handleSubmit} />
			</div>
		</section>
		:
		<section className="sec1">
			<div className="title-page">
				<p>Activity Room</p>
			</div>
			<div className="main-inputs signup">
				<div className="choices">
					<input type="radio" id="radio1" name="tabs" value="login" onChange={onChange}></input>
					<label id="lab1" htmlFor="radio1">Login</label>
					<input type="radio" id="radio2" name="tabs" value="signup" onChange={onChange} ></input>
					<label id="lab2" htmlFor="radio2">Sign Up</label>
				</div>
				<SignUp prop={handleCreate} />
			</div>
		</section>
	)
}

export default Registration;

