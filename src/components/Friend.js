import React from 'react';
import './Friend.css';

class Friend extends React.Component {
	render() {
		return(
			<div className="friend">
				<div className="friendpic"></div>
				<p className="friendname">{this.props.username}</p>
			</div>
		)
	}
}

export default Friend;