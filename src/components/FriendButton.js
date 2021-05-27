import React from 'react';
import './FriendButton.css';

class FriendButton extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		// add friend
		if(e.target.className === "useraddfriendbutton") {
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.target,
					command: 0
				})
			})
			.then(() => {
				// refresh friend list
				this.props.refreshFriendList();
			})
		}
		// cancel friend request
		else if(e.target.className === "usercancelfriendbutton") {
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.target,
					command: 0
				})
			})
			.then(() => {
				// refresh friend list
				this.props.refreshFriendList();
			})
		}
		// accept friend request
		else if(e.target.className === "useracceptfriendbutton") {
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.target,
					command: 1
				})
			})
			.then(() => {
				// refresh friend list
				this.props.refreshFriendList();
			})
		}
		// unfriend
		else if(e.target.className === "userunfriendbutton") {
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.target,
					command: 2
				})
			})
			.then(() => {
				// refresh friend list
				this.props.refreshFriendList();
			})
		}
	}

	render() {
		return(
			<div>
				{this.props.clientfriendlist.includes(this.props.target) &&
					<button className="userunfriendbutton" onClick={this.handleClick}>
						Friends
					</button>
				}
				{(!this.props.clientfriendlist.includes(this.props.target) && !this.props.clientoutgoinglist.includes(this.props.target) && !this.props.clientincominglist.includes(this.props.target)) &&
					<button className="useraddfriendbutton" onClick={this.handleClick}>
						Add Friend
					</button>
				}
				{this.props.clientoutgoinglist.includes(this.props.target) &&
					<button className="usercancelfriendbutton" onClick={this.handleClick}>
						Cancel Friend Request
					</button>
				}
				{this.props.clientincominglist.includes(this.props.target) &&
					<button className="useracceptfriendbutton" onClick={this.handleClick}>
						Accept Friend Request
					</button>
				}
			</div>
		)
	}
}

export default FriendButton;