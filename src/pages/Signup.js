import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Signup.css';

class Signup extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fname: '',
			lname: '',
			email: '',
			username: '',
			pw1: '',
			pw2: ''
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleKeyPress(e) {
		// update the state
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});

		// enable repeat password
		if(e.target.name === "pw1") {
			if(e.target.value) {
				document.getElementById('pw2').disabled = false;
			}
			else {
				document.getElementById('pw2').disabled = true;
			}
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		// get the warnings for display toggling
		const requiredfname = document.getElementById('requiredfname').style;
		const requiredlname = document.getElementById('requiredlname').style;
		const requiredemail = document.getElementById('requiredemail').style;
		const requiredusername = document.getElementById('requiredusername').style;
		const invalidpw1 = document.getElementById('invalidpw1').style;
		const requiredpw2 = document.getElementById('requiredpw2').style;
		const pwnotmatch = document.getElementById('pwnotmatch').style;

		// regex expression that requires atleast 8 characters in length, atleast 1 number, 1 lowercase character, and 1 uppercase character
		const pwreq = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]){8,}.*$/
		// regex expression for emails that follows the format text@text.text
		const emailreq = /^\S+@\S+[.][0-9a-z]+$/

		// check every field and display warning accordingly
		requiredfname.display = this.state.fname ? "none" : "block";
		requiredlname.display = this.state.lname ? "none" : "block";
		requiredemail.display = this.state.email.match(emailreq) ? "none" : "block";
		requiredusername.display = this.state.username ? "none" : "block";
		invalidpw1.display = this.state.pw1.match(pwreq) ? "none" : "block";
		requiredpw2.display = this.state.pw2 ? "none" : "block";
		pwnotmatch.display = this.state.pw1 === this.state.pw2 ? "none" : "block";

		// check everything at once and accept only if every field is valid
		if(this.state.fname && this.state.lname && this.state.email.match(emailreq) && this.state.pw1.match(pwreq) && this.state.pw2 && this.state.pw1 === this.state.pw2) {
			fetch('http://localhost:3001/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fname: this.state.fname,
					lname: this.state.lname,
					email: this.state.email,
					username: this.state.username,
					password: this.state.pw1
				})
			})
			.then(response => response.json())
			.then(body => {
				console.log(body)
				if(body.sucess) {
					this.props.handleLogin(body.clientusername, body.token);
				}
				else {
					if(body.usernametaken) {
						console.log("Username already taken.")
					}
					else {
						console.log("Sign-up failed. Please try again.")
					}
				}
			})	
		}
	}

	render() {
		return(
			<div>
				<form className="signup">
					<label htmlFor="fname">First Name</label>
					<input
						type="text"
						className="signupbar"
						name="fname"
						onChange={this.handleKeyPress}
						autoFocus/>
					<p className="signupwarning" id="requiredfname">First name is required.</p>
					<label htmlFor="fname">Last Name</label>
					<input
						type="text"
						className="signupbar"
						name="lname"
						onChange={this.handleKeyPress}/>
					<p className="signupwarning" id="requiredlname">Last name is required.</p>
					<label htmlFor="fname">Email</label>
					<input
						type="text"
						className="signupbar"
						name="email"
						onChange={this.handleKeyPress}/>
					<p className="signupwarning" id="requiredemail">Email is required. Should be a valid email address format.</p>
					<label htmlFor="fname">Username</label>
					<input 
						className="signupbar"
						type="text"
						name="username"
						onChange={this.handleKeyPress}/>
					<p className="signupwarning" id="requiredusername">Username is required.</p>
					<label htmlFor="fname">Password</label>
					<input 
						className="signupbar"
						type="password"
						id="pw1"
						name="pw1"
						onChange={this.handleKeyPress}/>
					<p className="signupwarning" id="invalidpw1">Passwords should be at least 8 characters, have at least 1 number, 1 lowercase letter, and 1 uppercase letter.</p>
					<label htmlFor="fname">Repeat password</label>
					<input 
						className="signupbar"
						type="password"
						id="pw2"
						name="pw2"
						onChange={this.handleKeyPress}
						disabled/>
					<p className="signupwarning" id="requiredpw2">Repeat password is required.</p>
					<p className="signupwarning" id="pwnotmatch">Passwords should match.</p>
					<input type="submit" className="signupbutton" value="Sign-up" onClick={this.handleSubmit}></input>
					<p>Already have an account? <Link to="/login">Log-in</Link></p>
				</form>
			</div>
		)
	}
}

export default withRouter(Signup);