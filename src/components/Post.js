import React from 'react';
import { Link } from 'react-router-dom';
import upvote from '../assets/up.png';
import upvoteActivated from '../assets/upActivated.png';
import downvote from '../assets/down.png';
import downvoteActivated from '../assets/downActivated.png';
import './Post.css';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postkarma: 0,
			timestampstring: null,
			vote: null,
			color: "#000000"
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpvote = this.handleUpvote.bind(this);
		this.handleDownvote = this.handleDownvote.bind(this);
		this.refreshVoteButtons = this.refreshVoteButtons.bind(this);
	}

	componentDidMount() {
		this.refreshVoteButtons();

		// convert date to word date
		const timestampdate = new Date(parseInt(this.props.data.timestamp));
		this.setState({ timestampstring: timestampdate.toString() })
	}

	componentDidUpdate(prevProps) {
		// if up or down arrays are changed (through fetchFeed), refresh the vote buttons
		if(prevProps.data.up.length !== this.props.data.up.length || prevProps.data.down.length !== this.props.data.down.length) {
			this.refreshVoteButtons();
		}
	}

	handleDelete() {
		fetch('http://localhost:3001/delete-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: this.props.data._id
			})
		});

		// refresh feed
		this.props.fetchFeed();
	}

	handleUpvote() {
		fetch('http://localhost:3001/handle-vote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: this.props.data._id,
				username: this.props.clientusername,
				command: 1
			})
		})
		.then(() => {
			// refresh feed
			this.props.fetchFeed();
			
		})
	}

	handleDownvote() {
		fetch('http://localhost:3001/handle-vote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: this.props.data._id,
				username: this.props.clientusername,
				command: 0
			})
		})
		.then(() => {
			// refresh feed
			this.props.fetchFeed();
		})
	}

	refreshVoteButtons() {
		const postkarma = this.props.data.up.length - this.props.data.down.length;
		this.setState({ postkarma: postkarma });
		
		// make color orange if user upvotes
		if(this.props.data.up.includes(this.props.clientusername)) {
			this.setState({ color: "#ff4500", vote: 'up' });
		}
		// make color blue if user downvotes
		else if(this.props.data.down.includes(this.props.clientusername)) {
			this.setState({ color: "#7192ff", vote: 'down' });
		}
		// default color black
		else {
			this.setState({ color: "#000000", vote: null });
		}
	}

	render() {
		return(
			<div className="post">
				<div className="leftbar" style={{color: this.state.color}}>
					<button className="postvotebutton" onClick={this.handleUpvote}>
						{this.state.vote === 'up'
						?
						<img src={upvoteActivated} alt="Upvote"/>
						:
						<img src={upvote} alt="Upvote"/>
						}
					</button>
					<p className="postkarmanumber">{this.state.postkarma}</p>
					<button className="postvotebutton" onClick={this.handleDownvote}>
						{this.state.vote === 'down'
						?
						<img src={downvoteActivated} alt="Upvote"/>
						:
						<img src={downvote} alt="Upvote"/>
						}
					</button>
				</div>
				<div className="postbody">
					<p className="postdetails">
						<Link className="postusername" to={`/u/${this.props.data.username}`}>u/{this.props.data.username}</Link>
						&nbsp;| {this.state.timestampstring}
					</p>
					<p className="postcontent">{this.props.data.content}</p>
					{this.props.clientusername === this.props.data.username &&
						<div className="modifypostbar">
						<button className="modifypostbutton" onClick={() => this.props.openEdit(this.props.data._id)}>
							<svg className="icon">
								<path d="M15.75,7.834625 L12,4.084625 L12.808,3.276625 C13.8435,2.241125 15.5225,2.241125 16.558,3.276625 C17.5935,4.312125 17.5935,5.991125 16.558,7.026625 L15.75,7.834625 Z M11.366,5 L15.116,8.75 L7.25,16.616 L3.5,12.866 L11.366,5 Z M2.5035,13.5 L6.1125,17.109 L1,18.6125 L2.5035,13.5 Z"></path>
							</svg>
							<p className="modifypostbuttontext">Edit</p>
						</button>
						<button className="modifypostbutton" onClick={this.handleDelete}>
							<svg className="icon">
								<path d="M16.5,2H12.71l-.85-.85A.5.5,0,0,0,11.5,1h-3a.5.5,0,0,0-.35.15L7.29,2H3.5a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-1A.5.5,0,0,0,16.5,2Z"></path>
								<path d="M16.5,5H3.5a.5.5,0,0,0-.5.5v12A1.5,1.5,0,0,0,4.5,19h11A1.5,1.5,0,0,0,17,17.5V5.5A.5.5,0,0,0,16.5,5ZM6.75,15.5a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Zm4,0a.75.75,0,0,1-1.5,0v-7a.75.75,0,0,1,1.5,0Z"></path>
							</svg>
							<p className="modifypostbuttontext">Delete</p>
						</button>
					</div>
					}
				</div>
			</div>
		)
	}
}

export default Post;