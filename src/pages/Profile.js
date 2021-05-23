import React from 'react';
import FriendButton from '../components/FriendButton';
import defaultpic from '../assets/defaultpic.png';
import './Profile.css';

class Profile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: this.props.match.params.username,
			fname: null,
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

	componentDidUpdate(prevProps) {
		if(this.state.username !== this.props.match.params.username) {
			this.setState({ username: this.props.match.params.username }, () => {
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
			})
		}
	}

	render() {
		if(this.state.fname === null) {
			return(<div></div>)
		}
		return(
			<div>
				{this.state.fname
				?
				<div className="profile">
					<div className="profilebanner"></div>
					<div className="profiledetails">
						<div className="profilepiclarge">
							<img src={defaultpic} width="120px" alt={this.state.username}/>
						</div>
						<h1>{this.state.fname} {this.state.lname}</h1>
						<p>u/{this.state.username}</p>
						{(this.props.clientusername && this.props.clientusername !== this.state.username) &&
							<FriendButton
								clientusername={this.props.clientusername}
								clientfriendlist={this.props.clientfriendlist}
								clientoutgoinglist={this.props.clientoutgoinglist}
								clientincominglist={this.props.clientincominglist}
								refreshFriendList={this.props.refreshFriendList}
								target={this.state.username}
							/>
						}
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