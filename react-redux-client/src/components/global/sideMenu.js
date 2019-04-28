import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

// const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class SideMenu extends React.Component{
	constructor(){
		super();
		this.state = {
			page: null
		}

	}

	componentDidMount() {
	}

	render(){
		return (
			<aside className="sidemenu">
                <ul>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                    <li><a href="todo">options hur</a></li>
                </ul>
            </aside>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	}
  }


export default withRouter(connect(mapStateToProps, {})(SideMenu));

	
