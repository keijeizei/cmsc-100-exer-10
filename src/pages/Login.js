import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const username = document.getElementById('email').value;
		const password = document.getElementById('password').value;

		fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		.then(response => response.json())
		.then(body => {
			if(body.success) {
				this.props.handleLogin(body.clientusername, body.token);
			}
			else {
				if(body.clientusername) {
					alert("Incorrect password.")
				}
				else {
					alert("Account not found.")
				}
			}
		})
	}

	render() {
		return(
			<div>
				<form className="login">
					<h1>Welcome to radish!</h1>
					<label htmlFor="fname">Email or Username</label>
					<input className="loginbar" type="text" id="email" autoFocus/>
					<label htmlFor="fname">Password</label>
					<input className="loginbar" type="password" id="password"/>
					<input type="submit" className="loginbutton" value="Log-in" onClick={this.handleSubmit}></input>
					<p>No account? <Link to="/signup">Sign-up</Link></p>
				</form>
			</div>
		)
	}
}

export default withRouter(Login);