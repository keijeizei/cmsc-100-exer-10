import React from 'react';
import './PostCreator.css';

class PostCreator extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit() {
		// to-do: try to use state instead of innerText
		const content = document.getElementById('textarea').innerText;

		fetch('http://localhost:3001/add-post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.props.clientusername,
				content: content
			})
		})
		.then(() => {
			// refresh feed
			this.props.fetchFeed();
		})

		
	}

    render() {
        return(
            <div className="postcreator">
                <p><span id="textarea" className="textarea" role="textbox" contentEditable></span></p>
                <button className="postbutton" onClick={this.handleSubmit}><b>Post</b></button>
            </div>
        )
    }
}

export default PostCreator;