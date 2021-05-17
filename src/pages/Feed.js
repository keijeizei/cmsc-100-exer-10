import React from 'react';
import Post from '../components/Post';
import PostCreator from '../components/PostCreator';
import PostEditor from '../components/PostEditor';

class Feed extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			feed: [],
			isEditing: false,
			editingID: null
		}

		this.fetchFeed = this.fetchFeed.bind(this);
		this.openEdit = this.openEdit.bind(this);
		this.closeEdit = this.closeEdit.bind(this);
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

	openEdit(_id) {
		this.setState({
			isEditing: true,
			editingID: _id
		})
	}

	closeEdit(_id) {
		this.setState({
			isEditing: false
		})
	}

	render() {
		return(
			<div className="maincontent">
				{this.state.isEditing &&
					<PostEditor
						feed={this.state.feed}
						closeEdit={this.closeEdit}
						editingID={this.state.editingID}
						fetchFeed={this.fetchFeed}
					/>
				}
				<PostCreator clientusername={this.props.clientusername} fetchFeed={this.fetchFeed} />
				{this.state.feed.map(post => {
					return <Post
						key={post._id}
						data={post}
						clientusername={this.props.clientusername}
						fetchFeed={this.fetchFeed}
						openEdit={this.openEdit}
						/>
				})}
			</div>
		)
	}
}

export default Feed;