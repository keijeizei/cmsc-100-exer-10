import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

class PageNotFound extends React.Component {
	render() {
		return(
			<div className="pagenotfound">
				<h1 className="fourofour">404</h1>
				<p>Page Not Found</p>
				<Link to="/">Back to Home</Link>
			</div>
		)
	}
}

export default PageNotFound;