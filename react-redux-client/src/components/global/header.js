import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

// const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class Header extends React.Component{
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
			<header>
                <div className="header-logo">my logo here</div>
                <div className="header-main-menu">
                    <a href="todo">Modules</a>
                </div>
                <div className="header-user-menu">
                    <a href="todo">Login</a>
                    <a href="todo">Sign up</a>
                </div>

            </header>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	}
  }


export default withRouter(connect(mapStateToProps, {})(Header));

	
