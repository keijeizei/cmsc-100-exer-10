import React from 'react';
import User from '../components/User';
import queryString from 'query-string';

class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			query: queryString.parse(this.props.location.search).name,
			users: null
		}
	}

	componentDidMount() {
		fetch(`http://localhost:3001/search?name=${this.state.query}`)
		.then(response => response.json())
		.then(body => {
			this.setState({ users: body })
		});
	}

	componentDidUpdate(prevProps) {
		if(this.state.query !== queryString.parse(this.props.location.search).name) {
			this.setState({ query: queryString.parse(this.props.location.search).name }, () => {
				fetch(`http://localhost:3001/search?name=${this.state.query}`)
				.then(response => response.json())
				.then(body => {
					this.setState({ users: body })
				});
			});
		}
	}

	render() {
		if(this.state.users === null) {
			return(<div></div>)
		}
		return(
			<div>
				{this.state.users.length > 0
				?	this.state.users.map((user, i) => {
						if(user.username !== this.props.clientusername) {
							return <User
								key={i}
								data={user}
								clientusername={this.props.clientusername}
								clientfriendlist={this.props.clientfriendlist}
								clientincominglist={this.props.clientincominglist}
								clientoutgoinglist={this.props.clientoutgoinglist}
								refreshFriendList={this.props.refreshFriendList}
							/>
						}
						else return null
					})
				:	<p>No results found.</p>
				}
			</div>
		)
	}
}

export default Search;