import React from 'react';
import './About.css';

class About extends React.Component {
	render() {
		return(
			<div className="about">
				<h1>About Radish</h1>
				<p>Almost all social media nowadays are filled with positive feedbacks.
				Likes and retweets provide positive conditioning that leads to toxic behaviors
				such as virtue signaling and being too much politically correct.</p>
				<p>Imagine a social media website where negative feedback is encouraged.
				You are given the freedom to downvote controversial takes, false information,
				and attention-seeking posts that does not add anything substantial.</p>
				<p>Fuel your superiority complex through imaginary internet points!</p>
				<p>This concept would likely not work in real life, but it is just an opportunity to imagine the possibilities.</p>
				<p>This website was done as a laboratory exercise for CMSC 100</p>
			</div>
		)
	}
}

export default About;