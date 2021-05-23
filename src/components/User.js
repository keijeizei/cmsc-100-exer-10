import React from 'react';
import { Link } from 'react-router-dom';
import FriendButton from '../components/FriendButton';
import defaultpic from '../assets/defaultpic.png';
import './User.css';

class User extends React.Component {
	render() {
		return(
			<div className="user">
				<div className="userpic">
					<img src={defaultpic} width="60px" alt={this.props.data.username}/>
				</div>
				<Link className="userbody"to={`/u/${this.props.data.username}`}>
					<p className="userfullname">{this.props.data.fname} {this.props.data.lname}</p>
					<p className="username">u/{this.props.data.username}</p>
				</Link>
				<FriendButton
					clientusername={this.props.clientusername}
					clientfriendlist={this.props.clientfriendlist}
					clientoutgoinglist={this.props.clientoutgoinglist}
					clientincominglist={this.props.clientincominglist}
					refreshFriendList={this.props.refreshFriendList}
					target={this.props.data.username}
				/>
			</div>
		)
	}
}

export default User;