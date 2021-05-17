import React from 'react';
import './PostEditor.css';

class PostEditor extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			content: ""
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const post = this.props.feed.filter(post => post._id === this.props.editingID)
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
				_id: this.props.editingID,
				content: this.state.content
			})
		})
		.then(() => {
			// refresh feed
			this.props.fetchFeed();
			this.props.closeEdit();
		})
	}

    render() {
        return(
            <div className="posteditor">
                <p>
					<textarea
						className="textarea"
						onChange={this.handleChange}
						value={this.state.content}
						rows="6"
						cols="50">
					</textarea>
				</p>
                <button className="postbutton" onClick={this.handleSubmit}><b>Edit Post</b></button>
            </div>
        )
    }
}

export default PostEditor;