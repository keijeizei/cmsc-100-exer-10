import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import './PostEditor.css';

class PostEditor extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: queryString.parse(props.location.search).id,
			content: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
		const post = this.props.feed.filter(post => post._id === this.state.id)
		this.setState({ content: post[0].content });
		console.log(post[0])
	}

	handleChange(e) {
		this.setState({ content: e.target.value });
		console.log(this.state.content)
	}

	handleSubmit() {
		fetch('http://localhost:3001/edit-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: this.state.id,
				content: this.state.content
			})
		})
		.then(() => {
			// refresh feed
			this.props.fetchFeed();
			this.props.history.push(`/feed`);
		})
	}

	handleCancel() {
		this.props.history.push(`/feed`);
	}

    render() {
        return(
            <div className="posteditor">
				<h2>Edit post</h2>
                <p>
					<textarea
						className="textarea"
						onChange={this.handleChange}
						value={this.state.content}
						rows="6"
						cols="50">
					</textarea>
				</p>
				<div>
					<button className="postbutton" onClick={this.handleSubmit}><b>Edit Post</b></button>
					<button className="postcancelbutton" onClick={this.handleCancel}>Cancel</button>
				</div>
            </div>
        )
    }
}

export default withRouter(PostEditor);