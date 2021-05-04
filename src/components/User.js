import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';

class User extends React.Component {
	render() {
		return(
			<Link className="user" to={`/u/${this.props.data.username}`}>
				<div className="userbody">
					<p className="userfullname">{this.props.data.fname} {this.props.data.lname}</p>
					<p className="username">u/{this.props.data.username}</p>
				</div>
			</Link>
		)
	}
}

export default User;