import React from 'react';
import Friend from './Friend';
import './FriendList.css';

class FriendList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			clientfriendlist: [],
			clientincominglist: []
		}
	}

	componentDidMount() {
		if(this.props.clientfriendlist) {
			this.setState({
				clientfriendlist: this.props.clientfriendlist,
				clientincominglist: this.props.clientincominglist
			});
		}
	}

	render() {
		const friendGenerator = this.state.clientfriendlist.map((friend, index) => {
			return <Friend key={index} username={friend}/>
		})

		const friendRequestGenerator = this.state.clientincominglist.map((friend, index) => {
			return <Friend key={index} username={friend}/>
		})

		return(
			<div className="friendbar">
				<div className="friend-title">
					<h2>Friends</h2>
				</div>
				{this.state.clientfriendlist.length
				?	friendGenerator
				:	<p className="no-friends-text">No friends to show.</p>
				}
				<div className="friend-title">
					<h2>Friend Requests</h2>
				</div>
				{this.state.clientincominglist.length
				?	friendRequestGenerator
				:	<p className="no-friends-text">No friend requests.</p>
				}
			</div>
		)
	}
}

export default FriendList;