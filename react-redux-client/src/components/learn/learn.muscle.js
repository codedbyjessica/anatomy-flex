import React, { Component } from 'react';
import {fetchMuscles} from '../../actions/cmsActions';
import { connect } from 'react-redux';
import SvgGeneralAnteriorMuscle from '../svg/svg.generalAnteriorMuscles'
import {withRouter} from 'react-router';

// const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class MuscleLearn extends React.Component{
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
		const START_ELEMENT_NAME = [].filter.call(document.querySelectorAll(`[data-name]`), element => {
			return element.getAttribute('data-name') !== 'base';
		})[0].getAttribute('data-name');
		this.setState({name: START_ELEMENT_NAME});
		this.changeClasslistOfBilateralElements(START_ELEMENT_NAME, true, 'selected');
	}

	changeClasslistOfBilateralElements(ELEMENT_NAME, isAdd, className) {
		const ELEMENTS = document.querySelectorAll(`[data-name=${ELEMENT_NAME}]`);
		[].forEach.call(ELEMENTS, element => {isAdd ? element.classList.add(className) : element.classList.remove(className)});
	}

	resetSelectedClasslist() {
		const ELEMENTS = document.querySelectorAll(`[data-name]`);
		[].forEach.call(ELEMENTS, element => {
			element.classList.remove('selected');
			element.classList.remove('hovered');
		});
	}

	handleMouseOver(name) {
		if (this.state.name !== name) {
			this.changeClasslistOfBilateralElements(name, true, 'hovered');
		}
	}

	handleMouseOut(name) {
		if (this.state.name !== name) {
			this.changeClasslistOfBilateralElements(name, false, 'hovered');
		}
	}

	handleClick(name) {
		this.resetSelectedClasslist()
		this.setState({name})
		this.changeClasslistOfBilateralElements(name, true, 'selected');
	}

	renderSVG() {
		const EL_CLICKABLE = [].filter.call(document.querySelectorAll('[data-name]') ,element => element.getAttribute('data-name') !== 'base');
		for (var i = 0; i < EL_CLICKABLE.length; i++) {
			const EL_NAME = EL_CLICKABLE[i].getAttribute('data-name')
			const original_fill = EL_CLICKABLE[i].getAttribute('fill')
			EL_CLICKABLE[i].addEventListener('mouseover', () => this.handleMouseOver(EL_NAME));
			EL_CLICKABLE[i].addEventListener('mouseout', () => this.handleMouseOut(EL_NAME));
			EL_CLICKABLE[i].addEventListener('click', () => this.handleClick(EL_NAME));
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
			<div className="learn-info-container">
				<div className="card">
					<div className="card-instruction"> Click on a muscle to learn about it </div>
					<label>Name:</label>
					<div className="learn-info-label">{muscleInfo.displayName}</div>

					<label>Origin:</label>
					<div className="learn-info-label">{muscleInfo.origin}</div>

					<label>Insertion:</label>
					<div className="learn-info-label">{muscleInfo.insertion}</div>

					<label>Innervation:</label>
					<div className="learn-info-label">{muscleInfo.nerve}</div>

					<label>Function:</label>
					<div className="learn-info-label">{muscleInfo.function}</div>
				</div>

			</div>
		)
	}

	render(){
		return (
			<div className="learn-container container">
				<div className="learn-svg-container">{this.renderSVG()}</div>
				{this.renderInfo()}
			</div> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		muscles: state.muscles
	}
  }


export default withRouter(connect(mapStateToProps, {fetchMuscles})(MuscleLearn));

	
