import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
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
			clientusername: null,
			clientfriendlist: null,
			clientincominglist: null,
			clientoutgoinglist: null
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.refreshFriendList = this.refreshFriendList.bind(this);
	}

	handleLogin(username) {
		this.setState({
			clientusername: username
		}, () => {
			// this is like refreshFriendList, but with a redirect to feed as callback
			fetch(`http://localhost:3001/user-details?username=${this.state.clientusername}`)
			.then(response => response.json())
			.then(body => {
				this.setState({
					...this.state,
					clientfriendlist: body.friendlist,
					clientincominglist: body.incomingFriendList,
					clientoutgoinglist: body.outgoingFriendList
				}, () => {
					// redirect to /feed after successful login
					this.props.history.push('/feed');
				})
			});
		});
	}

	refreshFriendList() {
		fetch(`http://localhost:3001/user-details?username=${this.state.clientusername}`)
		.then(response => response.json())
		.then(body => {
			this.setState({
				...this.state,
				clientfriendlist: body.friendlist,
				clientincominglist: body.incomingFriendList,
				clientoutgoinglist: body.outgoingFriendList
			})
		});
	}

	render() {
		return (
			<div className="App">
				<Navbar clientusername={this.state.clientusername}/>
				<div className="main">
				{this.state.clientusername
				?
					<Switch>
						<Route exact path="/(feed|)/" render={(props) => (
							<Feed {...props}
								clientusername={this.state.clientusername}
								clientfriendlist={this.state.clientfriendlist}
								clientincominglist={this.state.clientincominglist}
							/>)}
						/>
						<Route path="/(signup|login)/" render={() => (
							<Redirect to="/"/>)}
						/>
						<Route path="/search" render={(props) => (
							<Search {...props}
								clientusername={this.state.clientusername}
								clientfriendlist={this.state.clientfriendlist}
								clientincominglist={this.state.clientincominglist}
								clientoutgoinglist={this.state.clientoutgoinglist}
								refreshFriendList={this.refreshFriendList}
							/>)}
						/>
						<Route path="/u/:username" component={Profile} />
						<Route path="/about" component={About} />
						<Route component={PageNotFound} />
					</Switch>
				:
					<Switch>
						<Route exact path="/(feed|search|)/" render={() => (
							<Redirect to="/loginrequired"/>)}
						/>
						<Route path="/login" render={(props) => (
							<Login {...props} handleLogin={this.handleLogin} />)}
						/>
						<Route path="/loginrequired" render={(props) => (
							<div>
								<p className="loginrequiredtext">You must log-in first.</p>
								<Login {...props} handleLogin={this.handleLogin} />
							</div>
							)}
						/>
						<Route path="/signup" render={(props) => (
							<Signup {...props} handleLogin={this.handleLogin} />)}
						/>
						<Route path="/u/:username" component={Profile} />
						<Route path="/about" component={About} />
						<Route component={PageNotFound} />
					</Switch>
				}
				</div>
			</div>
		)
	}
}

export default withRouter(App);
