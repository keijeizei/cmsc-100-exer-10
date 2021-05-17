import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Signup extends React.Component {
	render() {
		return(
			<div className="signup">
				Sign-up
				<p>Already have an account? <Link to="/login">Log-in</Link></p>
			</div>
		)
	}
}

export default withRouter(Signup);