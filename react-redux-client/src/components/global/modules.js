import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

// const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class Modules extends React.Component{
	constructor(){
		super();
		this.state = {
			page: null
		}

	}

	componentDidMount() {
    }
    
    renderModule() {
        return <React.Fragment>
            <div className="module-img">

            </div>
            <h3>Module Name here</h3>
            <a className="button button-light" href="muscle/learn">Learn</a>
            <a className="button button-light">Test</a>
            <a className="button button-light">Dissect</a>
            </React.Fragment>
    }

	render(){
        var MODULES = ['nameru',2,3,4,5,6,7];
		return (
            <div className="modules-container container">
                <h1>Modules</h1>
                <div className="modules-wrapper">
                    {MODULES.map((i) => <div key={i} className="module">{this.renderModule()} </div>)}          
                </div>
            	
            </div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
	}
  }


export default withRouter(connect(mapStateToProps, {})(Modules));

	
