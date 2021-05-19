import React from 'react';
import Post from '../components/Post';
import PostCreator from '../components/PostCreator';
import FriendList from '../components/FriendList';
import './Feed.css';

class Feed extends React.Component {
	render() {
		return(
			<div className="feed">
				<div className="maincontent">
					<PostCreator clientusername={this.props.clientusername} fetchFeed={this.props.fetchFeed} />
					{this.props.feed.map(post => {
						return <Post
							key={post._id}
							data={post}
							clientusername={this.props.clientusername}
							fetchFeed={this.props.fetchFeed}
							/>
					})}
				</div>
				<FriendList clientfriendlist={this.props.clientfriendlist} clientincominglist={this.props.clientincominglist}/>
			</div>
		)
	}
}

export default Feed;