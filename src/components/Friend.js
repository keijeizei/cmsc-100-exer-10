import React from 'react';
import { Link } from 'react-router-dom';
import './Friend.css';

class Friend extends React.Component {
	render() {
		return(
			<Link to={`/u/${this.props.username}`} className="friend">
				<div className="friendpic"></div>
				<p className="friendname">{this.props.username}</p>
			</Link>
		)
	}
}

export default Friend;