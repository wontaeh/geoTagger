import React, { Component } from 'react';
import DataCreate from './DataCreate';
import DataDisplay from './DataDisplay';
import fetch from 'isomorphic-fetch';
import './styles.css';

class Tagger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datas : [],
						displayDatas : [],
						username: this.props.location.state.referrer.username
        };
		}
		
		handleChange = (e) => {
			this.handleDisplay(e.target.value);
		}

		handleDisplay = (value) => {
			let selectedDatas = this.state.datas.filter( (data) => {
				for(let i = 0; i < data.tags.length; i++) {
					if(data.tags[i] === value) {
						return true;
					}
				}
				return false;
			});
			this.setState({
				displayDatas : selectedDatas
			});
		}

    handleClickSave = (data) => {
        const { datas, username } = this.state; 
        let addData = {
            name: data.name,
						tags: data.tags,
						googleInfo: [],
						username: username
        };
				console.log('before fetch - add data: ', addData);
				let that = this;
        fetch('/addLocation', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(addData), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => {
              return res.json()
            })
          .catch(error => {
						console.error('Error:', error)
						that.setState({
							datas : datas.concat(response)
						});
					})
					.then(response => {
						console.log('after google response: ', response);
						that.setState({
							datas : datas.concat(response)
						});
					});
		}

		// componentWillMount = () => {
		// 	console.log('state username: ', this.state.username);
		// 	let that = this;
		// 	const { datas, username } = this.state; 
		// 	fetch('/getResults')
		// 	.then(function(res) {
		// 		return res.json();
		// 	})
		// 	.then(function(response) {
		// 		console.log('In componentWillMount response: ', response);
		// 		that.setState({
		// 			datas : datas.concat(response.filter((item) => item.username === username )),
		// 		});
		// 	});
		// }

		componentWillMount = () => {
			let that = this;
			const { datas, username } = this.state;
			let userData = {
				username
			}
			fetch('/getResults', {
				method: 'POST', 
        body: JSON.stringify(userData), //
        headers:{
          'Content-Type': 'application/json'
        }
			}).then(function(res) {
				return res.json();
			})
			.then(function(response) {
				that.setState({
					datas : datas.concat(response)
				});
			});
		}

    render(){
				const { datas, displayDatas } = this.state;
        return (
            <div>
              <DataCreate onClick={this.handleClickSave}/>
              <DataDisplay datas={datas} displayDatas={displayDatas} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Tagger;
