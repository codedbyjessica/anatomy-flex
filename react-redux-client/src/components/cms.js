import React, { Component } from 'react';
import {fetchMuscles, addMuscle} from '../actions/cmsActions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class CMS extends React.Component{
	constructor(){
		super();
		this.state = {
			group: null,
			name: null,
			origin: null,
			insertion: null,
			nerve: null,
			muscleFunction: null,
		}
	}

	componentDidMount() {
		this.props.fetchMuscles();
	}

	handleInputChange(input, e) {
		this.setState({
			[input]: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const values = {
			group: this.state.group,
			name: this.state.name,
			origin: this.state.origin,
			insertion: this.state.insertion,
			nerve: this.state.nerve,
			muscleFunction: this.state.muscleFunction
		}
		this.props.addMuscle(values);
		console.log(values)
		
	}

	handleRenderMuscleItem(obj) {
		return (
			<div className="cms-item">
				<div>{`Name: ${obj.displayName}`}</div>
				<div>{`origin: ${obj.origin}`}</div>
				<div>{`Insertion: ${obj.insertion}`}</div>
				<div>{`Innervation: ${obj.nerve}`}</div>
				<div>{`Function: ${obj.function}`}</div>
			</div>
		)
	}

	handleRenderMuscles() {
		const muscles = this.props.muscles;
		let muscleGroups = muscles.map(muscle => muscle.group);
		muscleGroups = muscleGroups.filter(function(item, pos) {
			return muscleGroups.indexOf(item) == pos;
		})
		let musclesSortedByGroups = [];
		muscleGroups.forEach(group => {
			var groupOfMuscles = [];
			muscles.forEach(muscle => {
				if (muscle.group === group) {
					groupOfMuscles.push(muscle)
				}
			})
			musclesSortedByGroups.push({groupName: group, muscles: groupOfMuscles});
		})
		return (
			<div className="cms-group-container">
				<h1>Muscles</h1>
			{musclesSortedByGroups.map((group, i) => {
				return (<div key={i} className="cms-group-item">
					<h3>{group.groupName}</h3>
					<div className="cms-items-container">
						{group.muscles.map((muscle, i) => <span key={`muscle-${i}`}>{this.handleRenderMuscleItem(muscle)}</span>)}
					</div>
				</div>)
				}
			)}
			</div>
		)
	}

	render(){

		return (
			<div className="cms-container">
				<div>all dem muskles</div>
				{this.handleRenderMuscles()}
				<form onSubmit={this.handleSubmit.bind(this)}>
				{FORM_FIELDS.map((input, i) => <div key={i}><label htmlFor={input}>{input}</label> <input onChange={this.handleInputChange.bind(this, input)} type="text" id={input} /></div>)}
					<input type="submit" />
				</form>
			</div> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		muscles: state.muscles
	}
  }


export default withRouter(connect(mapStateToProps, {fetchMuscles, addMuscle})(CMS));

	
