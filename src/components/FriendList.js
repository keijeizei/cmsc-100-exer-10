import React from 'react';
import Friend from './Friend';
import './FriendList.css';

class FriendList extends React.Component {
	render() {
		const friendGenerator = this.props.clientfriendlist.map((friend, index) => {
			return <Friend key={index} username={friend}/>
		})

		const friendRequestGenerator = this.props.clientincominglist.map((friend, index) => {
			return <Friend key={index} username={friend}/>
		})

		return(
			<div className="friendbar">
				<div className="friend-title">
					<h2>Friends</h2>
				</div>
				{this.props.clientfriendlist.length
				?	friendGenerator
				:	<p className="no-friends-text">No friends to show.</p>
				}
				<div className="friend-title">
					<h2>Friend Requests</h2>
				</div>
				{this.props.clientincominglist.length
				?	friendRequestGenerator
				:	<p className="no-friends-text">No friend requests.</p>
				}
			</div>
		)
	}
}

export default FriendList;