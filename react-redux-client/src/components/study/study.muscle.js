import React, { Component } from 'react';
import {fetchMuscles} from '../../actions/cmsActions';
import { connect } from 'react-redux';
import SvgGeneralAnteriorMuscle from '../svg/svg.generalAnteriorMuscles'
import {withRouter} from 'react-router';

// const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class MuscleStudy extends React.Component{
	constructor(){
		super();
		this.state = {
			name: null
		}
		this.handleMouseOver.bind(this);
		this.handleMouseOut.bind(this);
		this.handleClick.bind(this);
	}

	componentDidMount() {
		this.props.fetchMuscles();
	}

	changeColorOfBilateralElements(ELEMENT_NAME, color) {
		const ELEMENTS = document.querySelectorAll(`[data-name=${ELEMENT_NAME}]`);
		[].forEach.call(ELEMENTS, element => element.style.fill = color);
	}

	handleMouseOver(name) {
		this.changeColorOfBilateralElements(name, 'black');
	}

	handleMouseOut(name, originalFill) {
		this.changeColorOfBilateralElements(name, originalFill);
	}

	handleClick(name) {
		this.setState({name})
	}

	renderSVG() {
		const EL_CLICKABLE = [].filter.call(document.querySelectorAll('[data-name]') ,element => element.getAttribute('data-name') !== 'base');
		for (var i = 0; i < EL_CLICKABLE.length; i++) {
			const EL_NAME = EL_CLICKABLE[i].getAttribute('data-name')
			const original_fill = EL_CLICKABLE[i].getAttribute('fill')
			EL_CLICKABLE[i].addEventListener('mouseover', () => this.handleMouseOver(EL_NAME));
			EL_CLICKABLE[i].addEventListener('mouseout', () => this.handleMouseOut(EL_NAME, original_fill));
			EL_CLICKABLE[i].addEventListener('click', () => this.handleClick(EL_NAME, original_fill));
		}
		return <div><SvgGeneralAnteriorMuscle /></div>
			}


	getInfo(targetName) {
		const MUSCLE_LIBRARY = this.props.muscles;
		return MUSCLE_LIBRARY.filter(muscle => muscle.name == targetName)[0];
	}

	renderInfo() {
		const muscleInfo = this.getInfo(this.state.name);
		if (!muscleInfo) {
			return;
		}
		return (
			<div>
				<div className="cms-item-label">{muscleInfo.displayName}</div>
				<div className="cms-item-label">{muscleInfo.origin}</div>
				<div className="cms-item-label">{muscleInfo.insertion}</div>
				<div className="cms-item-label">{muscleInfo.nerve}</div>
				<div className="cms-item-label">{muscleInfo.function}</div>
			</div>
		)
	}

	render(){
		return (
			<div className="study-container container">
				<h1>studeh with meh</h1>
				<div>{this.renderSVG()}</div>
				<div>{this.renderInfo()}</div>
			</div> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		muscles: state.muscles
	}
  }


export default withRouter(connect(mapStateToProps, {fetchMuscles})(MuscleStudy));

	
