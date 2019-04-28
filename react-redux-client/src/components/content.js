import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

// const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class ContentContainer extends React.Component{
	constructor(){
		super();
		this.state = {

        }
	}

	componentDidMount() {

	}

	render(){
		return (
			<div className="content-container container">

			</div> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		muscles: state.muscles
	}
  }


export default withRouter(connect(mapStateToProps, {fetchMuscles})(ContentContainer));

	
