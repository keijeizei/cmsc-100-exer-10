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
				{this.props.clientusername
				?
				<div className="searchbar">
					<input 
						type="text"
						id="searchbox"
						name="searchbox"
						placeholder="Search a name, email, or username..."
						onKeyPress={this.handleKeyPress}/>
					<button className="postbutton" onClick={this.handleSubmit}><b>Search</b></button>
				</div>
				:
				<div></div>
				}
				{/* the SVG icons are from www.reddit.com */}
				{this.props.clientusername
				?
				<div className="buttoncontainer">
					<Link className="iconbutton" to={`/u/${this.props.clientusername}`} title="Profile">
						<svg className="icon">
							<path d="M15,15.5 L5,15.5 C4.724,15.5 4.5,15.276 4.5,15 C4.5,12.755 6.326,10.929 8.571,10.929 L11.429,10.929 C13.674,10.929 15.5,12.755 15.5,15 C15.5,15.276 15.276,15.5 15,15.5 M10,4.5 C11.405,4.5 12.547,5.643 12.547,7.048 C12.547,8.452 11.405,9.595 10,9.595 C8.595,9.595 7.453,8.452 7.453,7.048 C7.453,5.643 8.595,4.5 10,4.5 M16,2 L4,2 C2.897,2 2,2.897 2,4 L2,16 C2,17.103 2.897,18 4,18 L16,18 C17.103,18 18,17.103 18,16 L18,4 C18,2.897 17.103,2 16,2"></path>
						</svg>
						<p className="iconlabel">{this.props.clientusername}</p>
					</Link>
					<button className="iconbutton" onClick={this.props.logout} title="Logout">
						<svg className="icon">
							<path d="M15,2 L5,2 C4.447,2 4,2.447 4,3 L4,9 L9.586,9 L8.293,7.707 C7.902,7.316 7.902,6.684 8.293,6.293 C8.684,5.902 9.316,5.902 9.707,6.293 L12.707,9.293 C13.098,9.684 13.098,10.316 12.707,10.707 L9.707,13.707 C9.512,13.902 9.256,14 9,14 C8.744,14 8.488,13.902 8.293,13.707 C7.902,13.316 7.902,12.684 8.293,12.293 L9.586,11 L4,11 L4,17 C4,17.553 4.447,18 5,18 L15,18 C15.553,18 16,17.553 16,17 L16,3 C16,2.447 15.553,2 15,2"></path>
						</svg>
						<p className="iconlabel">Logout</p>
					</button>
				</div>
				:
				<div></div>
				}
			</div>
		)
	}
}

export default withRouter(Navbar);