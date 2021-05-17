import React from 'react';
import './Profile.css';

class Profile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: this.props.match.params.username,
			fname: "",
			lname: "",
			email: "",
			picture: "",
			karma: 0
		}
	}

	componentDidMount() {
		fetch(`http://localhost:3001/user-details?username=${this.state.username}`)
		.then(response => response.json())
		.then(body => {
			this.setState({
				fname: body.fname,
				lname: body.lname,
				email: body.email,
				picture: body.picture,
				karma: body.karma
			})
		});
	}

	render() {
		return(
			<div>
				{this.state.fname
				?
				<div className="profile">
					<div className="profilebanner"></div>
					<div className="profiledetails">
						<div className="profilepiclarge"></div>
						<h1>{this.state.fname} {this.state.lname}</h1>
						<p>u/{this.state.username}</p>
						<p>{this.state.email}</p>
						<p>{this.state.karma} karma</p>
					</div>
				</div>
				:
				<div>
					<p>This user does not exist.</p>
				</div>
				}
			</div>
		)
	}
}

export default Profile;