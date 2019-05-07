import React, { Component } from 'react';
import {fetchMuscles, addMuscle, deleteMuscle, editMuscle} from '../../actions/cmsMuscleActions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

const FORM_FIELDS = [ "group", "name", "origin", "insertion", "nerve", "muscleFunction" ];

class MuscleCMS extends React.Component{
	constructor(){
		super();
		this.state = {
			id: null,
			group: null,
			name: null,
			origin: null,
			insertion: null,
			nerve: null,
			muscleFunction: null,
			isDeleted: false
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
	}

	handleDelete(values) {
		if (values.isDeleted) {
			this.props.deleteMuscle(values._id)
		} else {
			values.isDeleted = true;
			this.props.editMuscle(values)
		}
	}

	handleUnDelete(values) {			
		values.isDeleted = false;
		this.props.editMuscle(values)
	}

	renderMuscleItem(obj) {
 		return (
			<div>
				<div className="cms-item-label">{obj._id}</div>
				<div className="cms-item-label">{obj.displayName}</div>
				<div className="cms-item-label">{obj.origin}</div>
				<div className="cms-item-label">{obj.insertion}</div>
				<div className="cms-item-label">{obj.nerve}</div>
				<div className="cms-item-label">{obj.function}</div>
				<div onClick={this.handleDelete.bind(this, obj)} className="cms-item-label cms-item-delete">x</div>
				{ obj.isDeleted ? (<div onClick={this.handleUnDelete.bind(this, obj)} className="cms-item-label cms-item-restore">o</div>) : ""}
			</div>
		)
	}

	renderMuscles() {
		const muscles = this.props.muscles;
		console.log("muscle structure example", muscles[0])
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
			{musclesSortedByGroups.map((group, i) => {
				return (
				<div key={i} className="cms-group-item">
					<h3>{group.groupName}</h3>
					<div className="cms-items-container cms-item-container-legend">
						<div className="cms-item-label">_id</div>
						<div className="cms-item-label">name</div>
						<div className="cms-item-label">origin</div>
						<div className="cms-item-label">insertion</div>
						<div className="cms-item-label">innervation</div>
						<div className="cms-item-label">function</div>
					</div>
					<div className="cms-items-container">
						{group.muscles.filter(muscle => !muscle.isDeleted).map((muscle, i) => <div className="cms-item" key={`muscle-${i}`}>{this.renderMuscleItem(muscle)}</div>)}
					</div>
				</div>)
				}
			)}
			</div>
		)
	}

	renderDeletedMuscles() {
		const muscles = this.props.muscles;
		return(
			<div className="cms-group-item container-deleted">
				<h3>Deleted</h3>
				<div className="cms-items-container cms-item-container-legend">
						<div className="cms-item-label">_id</div>
						<div className="cms-item-label">name</div>
						<div className="cms-item-label">origin</div>
						<div className="cms-item-label">insertion</div>
						<div className="cms-item-label">innervation</div>
						<div className="cms-item-label">function</div>
					</div>
				<div className="cms-items-container">
				{muscles.filter(muscle => muscle.isDeleted).map((muscle, i) => {
					return (
					<div className="cms-item" key={`muscle-${i}`}>{this.renderMuscleItem(muscle)}</div>)}
					)
				}
				</div>
			</div>
		)
	}

	renderForm() {
		return (
			<div className="cms-form-container">
			<h3>Add Item</h3>
			<form onSubmit={this.handleSubmit.bind(this)}>
			{FORM_FIELDS.map((input, i) => <fieldset key={i}><label htmlFor={input}>{input}:</label> <input onChange={this.handleInputChange.bind(this, input)} type="text" id={input} /></fieldset>)}
				<button type="submit">Add Muscle</button>
			</form>
			</div>
		)
	}

	render(){
		return (
			<div className="cms-container container">
				<h1>Muscles</h1>
				{this.renderMuscles()}
				{this.renderDeletedMuscles()}
				{this.renderForm()}
			</div> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		muscles: state.muscles
	}
  }


export default withRouter(connect(mapStateToProps, {fetchMuscles, addMuscle, deleteMuscle, editMuscle})(MuscleCMS));

	
