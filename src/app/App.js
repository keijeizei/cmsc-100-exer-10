import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './App.css';

import Feed from '../pages/Feed';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import About from '../pages/About';
import PageNotFound from '../pages/PageNotFound';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			clientusername: "yagoo"
		}

		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(username) {
		this.setState({
			clientusername: username
		}, () => {
			// redirect to /feed after successful login
			this.props.history.push('/feed')
		});
		
	}

	render() {
		return (
			<div className="App">
				<Navbar clientusername={this.state.clientusername}/>
				{this.state.clientusername
				?
					<Switch>
						<Route exact path="/" render={(props) => (
							<Feed {...props} clientusername={this.state.clientusername} />)}
						/>
						<Route path="/feed" render={(props) => (
							<Feed {...props} clientusername={this.state.clientusername} />)}
						/>
						<Route path="/signup" component={Signup} />
						<Route path="/login" render={(props) => (
							<Login {...props} handleLogin={this.handleLogin} />)}
						/>
						<Route path="/search" component={Search} />
						<Route path="/u/:username" component={Profile} />
						<Route path="/about" component={About} />
						<Route component={PageNotFound} />
					</Switch>
				:
					<Switch>
						<Route exact path="/" render={(props) => (
							<Login {...props} handleLogin={this.handleLogin} />)}
						/>
						<Route path="/login" render={(props) => (
							<Login {...props} handleLogin={this.handleLogin} />)}
						/>
						<Route path="/signup" component={Signup} />
						<Route path="/u/:username" component={Profile} />
						<Route component={PageNotFound} />
					</Switch>
				}
			</div>
		)
	}
}

export default withRouter(App);
