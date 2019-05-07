import React, { Component } from 'react';
import {fetchModules, addModule, deleteModule, editModule} from '../../actions/cmsModuleActions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

const FORM_FIELDS = [ "name", "components", "moduleType" ];

class ModuleCMS extends React.Component{
	constructor(){
		super();
		this.state = {
			id: null,
			name: null,
			components: null,
			moduleType: null,
			isDeleted: false
		}
	}

	componentDidMount() {
		this.props.fetchModules();
		console.log('did mount mang')
	}

	handleInputChange(input, e) {
		this.setState({
			[input]: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const values = {
			name: this.state.name,
			components: this.state.components,
			moduleType: this.state.moduleType
		}
		console.log(values);
		this.props.addModule(values);
	}

	handleDelete(values) {
		if (values.isDeleted) {
			this.props.deleteModule(values._id)
		} else {
			values.isDeleted = true;
			this.props.editModule(values)
		}
	}

	handleUnDelete(values) {			
		values.isDeleted = false;
		this.props.editModule(values)
	}

	renderModuleItem(obj) {
 		return (
			<div>
				<div className="cms-item-label">{obj._id}</div>
				<div className="cms-item-label">{obj.displayName}</div>
				<div className="cms-item-label">{obj.components}</div>
				<div onClick={this.handleDelete.bind(this, obj)} className="cms-item-label cms-item-delete">x</div>
				{ obj.isDeleted ? (<div onClick={this.handleUnDelete.bind(this, obj)} className="cms-item-label cms-item-restore">o</div>) : ""}
			</div>
		)
	}

	renderModules() {
		const modules = this.props.modules;
		console.log("module structure example", modules)
		return (
			<div className="cms-group-container">
			{modules.map((module, i) => {
				return (
				<div key={i} className="cms-group-item">
					<div className="cms-items-container cms-item-container-legend">
						<div className="cms-item-label">_id</div>
						<div className="cms-item-label">name</div>
						<div className="cms-item-label">components</div>
						<div className="cms-item-label">module type</div>
					</div>
					<div className="cms-items-container">
						{modules.filter(module => !module.isDeleted).map((module, i) => <div className="cms-item" key={`module-${i}`}>{this.renderModuleItem(module)}</div>)}
					</div>
				</div>)
				}
			)}
			</div>
		)
	}

	renderDeletedModules() {
		const modules = this.props.modules;
		return(
			<div className="cms-group-item container-deleted">
				<h3>Deleted</h3>
				<div className="cms-items-container cms-item-container-legend">
						<div className="cms-item-label">_id</div>
						<div className="cms-item-label">name</div>
						<div className="cms-item-label">components</div>
						<div className="cms-item-label">module type</div>
					</div>
				<div className="cms-items-container">
				{modules.filter(module => module.isDeleted).map((module, i) => {
					return (
					<div className="cms-item" key={`module-${i}`}>{this.renderModuleItem(module)}</div>)}
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
				<button type="submit">Add Module</button>
			</form>
			</div>
		)
	}

	render(){
		return (
			<div className="cms-container container">
				<h1>Modules</h1>
				{this.renderModules()}
				{this.renderDeletedModules()}
				{this.renderForm()}
			</div> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		modules: state.modules
	}
  }


export default withRouter(connect(mapStateToProps, {fetchModules, addModule, deleteModule, editModule})(ModuleCMS));

	
