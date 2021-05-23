import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Cookies from "universal-cookie";
import './App.css';

import Navbar from '../components/Navbar';
import Feed from '../pages/Feed';
import PostEditor from '../pages/PostEditor';
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
			checkedIfLoggedIn: false,
			clientusername: null,
			clientfriendlist: [],
			clientincominglist: [],
			clientoutgoinglist: [],
			feed: []
		}

		this.handleLogin = this.handleLogin.bind(this);
		this.fetchFeed = this.fetchFeed.bind(this);
		this.refreshFriendList = this.refreshFriendList.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		fetch("http://localhost:3001/check-if-logged-in", {
			method: "POST",
			credentials: "include"
		})
		.then(response => response.json())
		.then(body => {
			if(body.isLoggedIn) {
				this.setState({ clientusername: localStorage.getItem("username") }, () => {
					this.refreshFriendList(() => {
						this.fetchFeed(() => this.setState({ checkedIfLoggedIn: true }))
					});
				});
			}
			else {
				this.setState({
					checkedIfLoggedIn: true,
					clientusername: null
				});
			}
		});
	}

	handleLogin(username, token) {
		const cookies = new Cookies();
		cookies.set(
			"authToken",
			token,
			{
				path: "localhost:3001/",
				age: 60*60,
				sameSite: "lax"
			}
		);

		localStorage.setItem("username", username);

		this.setState({
			clientusername: username
		}, () => {
			this.refreshFriendList(() => {
				this.fetchFeed(() => this.props.history.push('/feed'))
			});
		});
	}

	logout() {
		// delete cookie with authToken
		const cookies = new Cookies();
		cookies.remove("authToken");
	
		// Delete username in local storage
		localStorage.removeItem("username");
	
		this.setState({ clientusername: null }, () => {
			this.props.history.push('/login');
		});
	}

	fetchFeed(callback) {
		fetch(`http://localhost:3001/get-feed?username=${this.state.clientusername}`)
		.then(response => response.json())
		.then(body => {
			body.sort((a, b) => b.timestamp - a.timestamp)
			this.setState({ feed: body }, () => {
				// accept a callback function after set state
				if(typeof(callback) === "function") {
					callback();
				}
			})
		})
	}

	refreshFriendList(callback) {
		fetch(`http://localhost:3001/user-details?username=${this.state.clientusername}`)
		.then(response => response.json())
		.then(body => {
			this.setState({
				...this.state,
				clientfriendlist: body.friendlist,
				clientincominglist: body.incomingFriendList,
				clientoutgoinglist: body.outgoingFriendList
			}, () => {
				// accept a callback function after set state
				if(typeof(callback) === "function") {
					callback();
				}
			})
		});
	}

	render() {
		if(!this.state.checkedIfLoggedIn) {
			return(<div></div>)
		}
		return(
			<div className="App">
				<Navbar 
					clientusername={this.state.clientusername}
					logout={this.logout}
				/>
				<div className="main">
				{this.state.clientusername
				?
				<Switch>
					<Route exact path="/(feed|)/" render={(props) => (
						<Feed {...props}
							clientusername={this.state.clientusername}
							clientfriendlist={this.state.clientfriendlist}
							clientincominglist={this.state.clientincominglist}
							feed={this.state.feed}
							fetchFeed={this.fetchFeed}
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
					<Route path="/editpost" render={(props) => (
						<PostEditor {...props}
							feed={this.state.feed}
							fetchFeed={this.fetchFeed}
							clientusername={this.state.clientusername}
						/>)}
					/>
					<Route path="/u/:username" render={(props) => (
						<Profile {...props}
							clientusername={this.state.clientusername}
							clientfriendlist={this.state.clientfriendlist}
							clientoutgoinglist={this.state.clientoutgoinglist}
							clientincominglist={this.state.clientincominglist}
							refreshFriendList={this.refreshFriendList}
						/>)}
					/>
					<Route path="/about" component={About} />
					<Route component={PageNotFound} />
				</Switch>
				:
				<Switch>
					<Route exact path="/(feed|search|editpost)/" render={() => (
						<Redirect to="/loginrequired"/>)}
					/>
					<Route path="/(login|)" render={(props) => (
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
