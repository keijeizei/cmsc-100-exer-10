import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(e) {
		// submit when Enter key is pressed
		if(e.charCode === 13) {
			this.handleSubmit();
		}
	}

	handleSubmit() {
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
				this.props.handleLogin(body.clientusername);
				
			}
			else {
				if(body.clientusername) {
					console.log("Incorrect password.")
				}
				else {
					console.log("Account not found.")
				}
			}
		})
	}

	render() {
		return(
			<div className="login">
				Email or Username
				<input className="loginbar" type="text" id="email" name="email" autoFocus/>
				Password
				<input className="loginbar" type="password" id="password" name="password" onKeyPress={this.handleKeyPress}/>
				<button className="loginbutton" onClick={this.handleSubmit}>Log in</button>
				<p>No account? <Link to="/signup">Sign-up</Link></p>
			</div>
		)
	}
}

export default withRouter(Login);