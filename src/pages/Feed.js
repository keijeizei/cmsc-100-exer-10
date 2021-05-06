import React from 'react';
import Post from '../components/Post';
import PostCreator from '../components/PostCreator';

class Feed extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			clientusername: "yagoo",	// to-do, temporary, change after login is implemented
			feed: []
		}

		this.fetchFeed = this.fetchFeed.bind(this);
	}
	
	componentDidMount() {
		this.fetchFeed();
	}

	fetchFeed() {
		// if statement is needed to fetch only if clientusername is not null
		if(this.props.clientusername) {
			fetch(`http://localhost:3001/get-feed?username=${this.props.clientusername}`)
			.then(response => response.json())
			.then(body => {
				body.sort((a, b) => b.timestamp - a.timestamp)
				this.setState({ feed: body })
			})
		}
	}

	render() {
		return(
			<div className="maincontent">
				<PostCreator clientusername={this.props.clientusername} fetchFeed={this.fetchFeed}/>
				{this.state.feed.map(post => {
					return <Post
						key={post._id}
						data={post}
						clientusername={this.props.clientusername}
						fetchFeed={this.fetchFeed}
						/>
				})}
			</div>
		)
	}
}

export default Feed;