import React from 'react';
import { Link } from 'react-router-dom';
import defaultpic from '../assets/defaultpic.png';
import './Friend.css';

class Friend extends React.Component {
	render() {
		return(
			<Link to={`/u/${this.props.username}`} className="friend">
				<div className="friendpic">
					<img src={defaultpic} width="40px" alt={this.props.username}/>
				</div>
				<p className="friendname">{this.props.username}</p>
			</Link>
		)
	}
}

export default Friend;