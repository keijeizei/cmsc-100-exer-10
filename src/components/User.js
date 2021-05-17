import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';

class User extends React.Component {
	constructor(props) {
		super(props);

		this.handleFriend = this.handleFriend.bind(this);
	}

	handleFriend(e) {
		if(e.target.className === "useraddfriendbutton") {
			console.log(this.props.clientusername, this.props.data.username)
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.data.username,
					command: 0
				})
			})
			.then(() => {
				console.log(2)
				// refresh friend list
				this.props.refreshFriendList();
			})
		}
		else if(e.target.className === "usercancelfriendbutton") {
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.data.username,
					command: 0
				})
			})
			.then(() => {
				// refresh friend list
				this.props.refreshFriendList();
			})
		}
		else if(e.target.className === "useracceptfriendbutton") {
			fetch('http://localhost:3001/handle-friend-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: this.props.clientusername,
					target: this.props.data.username,
					command: 1
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
			<div className="user">
				<Link className="userbody"to={`/u/${this.props.data.username}`}>
					<p className="userfullname">{this.props.data.fname} {this.props.data.lname}</p>
					<p className="username">u/{this.props.data.username}</p>
				</Link>
				{this.props.clientfriendlist.includes(this.props.data.username) &&
					<button className="userunfriendbutton">
						Friends
					</button>
				}
				{(!this.props.clientfriendlist.includes(this.props.data.username) && !this.props.clientoutgoinglist.includes(this.props.data.username) && !this.props.clientincominglist.includes(this.props.data.username)) &&
					<button className="useraddfriendbutton" onClick={this.handleFriend}>
						Add Friend
					</button>
				}
				{this.props.clientoutgoinglist.includes(this.props.data.username) &&
					<button className="usercancelfriendbutton" onClick={this.handleFriend}>
						Cancel Friend Request
					</button>
				}
				{this.props.clientincominglist.includes(this.props.data.username) &&
					<button className="useracceptfriendbutton" onClick={this.handleFriend}>
						Accept Friend Request
					</button>
				}
			</div>
		)
	}
}

export default User;