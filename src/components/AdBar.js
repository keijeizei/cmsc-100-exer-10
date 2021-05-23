import React from 'react';
import './AdBar.css';

class AdBar extends React.Component {
	render() {
		return(
			<div className="advbar">
				<div className="adv-title">
					<p>ADVERTISEMENTS</p>
				</div>
				{/* Images are owned by their respective owners and are for demonstration purposes only */}
				<a href="https://en.hololive.tv/">
					<img className="ad" src="https://i.ibb.co/WtQp12t/hololive-audition.jpg" alt="Hololive Vtuber Auditions"/>
				</a>
				<p className="adcaption">Enter the Hololive rabbit-hole</p>
				<a href="https://www.youtube.com/watch?v=rXvS26nDUXY">
					<img className="ad" src="https://i.ibb.co/b1sSMfz/hotcakes.jpg" alt="HOTcakes"/>
				</a>
				<p className="adcaption">HOTcakes in YOUR area! You won't last 5 minutes eating!</p>
			</div>
		)
	}
};

export default AdBar;