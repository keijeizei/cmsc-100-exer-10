import React from 'react';
import logo from '../assets/logo.png';
import { withRouter, Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit() {
		const searchquery = document.getElementById('searchbox').value;
		this.props.history.push(`/search?name=${searchquery}`);
	}

	handleKeyPress(e) {
		// submit when Enter key is pressed
		if(e.charCode === 13) {
			this.handleSubmit();
		}
	}

	render() {
		return(
			<div className="navbar">
				<div className="logocontainer">
					<Link to='/'>
						<img className="logo" src={logo} alt="Radish"/>
					</Link>
					<h2>radish</h2>
				</div>
				<div className="searchbar">
					<input 
						type="text"
						id="searchbox"
						name="searchbox"
						placeholder="Enter a name, email, or username..."
						onKeyPress={this.handleKeyPress}/>
					<button className="postbutton" onClick={this.handleSubmit}><b>Search</b></button>
				</div>
				{/* the SVG icons are from www.reddit.com */}
				<div className="buttoncontainer">
					{this.props.clientusername &&
					<div>
						<a className="iconbutton" href="/" title="Chat">
							<svg className="icon">
								<path d="M10,0A10,10,0,0,0,1.64,15.51L.57,18.73c-.16.52.19.86.7.7l3.22-1.08A10,10,0,1,0,10,0ZM5.54,11.41A1.39,1.39,0,1,1,6.93,10,1.39,1.39,0,0,1,5.54,11.41Zm4.46,0A1.39,1.39,0,1,1,11.39,10,1.39,1.39,0,0,1,10,11.41Zm4.44,0A1.39,1.39,0,1,1,15.83,10,1.39,1.39,0,0,1,14.44,11.41Z"></path>
							</svg>
						</a>
						<a className="iconbutton" href="/" title="Notifications">
							<svg className="icon">
								<path d="M16 12.988c0 .554.449 1.002 1 1.002a1 1 0 110 2H3a1 1 0 110-2c.551 0 1-.448 1-1l.01-5.002A5.996 5.996 0 0110 2a5.997 5.997 0 015.99 5.99l.01 4.998zM8 16.99h4c0 1.103-.897 2-2 2s-2-.897-2-2z"></path>
							</svg>
						</a>
						<Link className="iconbutton" to={`/u/${this.props.clientusername}`} title="Profile">
							<svg className="icon">
								<path d="M15,15.5 L5,15.5 C4.724,15.5 4.5,15.276 4.5,15 C4.5,12.755 6.326,10.929 8.571,10.929 L11.429,10.929 C13.674,10.929 15.5,12.755 15.5,15 C15.5,15.276 15.276,15.5 15,15.5 M10,4.5 C11.405,4.5 12.547,5.643 12.547,7.048 C12.547,8.452 11.405,9.595 10,9.595 C8.595,9.595 7.453,8.452 7.453,7.048 C7.453,5.643 8.595,4.5 10,4.5 M16,2 L4,2 C2.897,2 2,2.897 2,4 L2,16 C2,17.103 2.897,18 4,18 L16,18 C17.103,18 18,17.103 18,16 L18,4 C18,2.897 17.103,2 16,2"></path>
							</svg>
						</Link>
					</div>
					}
				</div>
			</div>
		)
	}
}

export default withRouter(Navbar);