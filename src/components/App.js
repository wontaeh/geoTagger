import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom';

import Tagger from './Tagger';
import Login from './Login';
import './styles.css';

class App extends Component {
	render(){
		return (
			<Router>
				<div>
					<Route exact path="/" component={Login}/>
					<Route path="/main" component={Tagger} />
				</div>
			</Router>
		);
	}
}

export default App;
