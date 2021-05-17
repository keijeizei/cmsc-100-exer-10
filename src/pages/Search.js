import React from 'react';
import User from '../components/User';
const queryString = require('query-string');

class Search extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			query: queryString.parse(props.location.search).name,
			users: []
		}
	}

	componentDidMount() {
		fetch(`http://localhost:3001/search?name=${this.state.query}`)
		.then(response => response.json())
		.then(body => {
			this.setState({ users: body })
		});
	}

	render() {
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