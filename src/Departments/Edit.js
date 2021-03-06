import React from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import queryString from 'query-string'
import FormElements from './Form'
import Create from './Create'
import {initializeState, axiosEdit, axiosDelete, getAxiosConfig} from '../shared/axios'
import {formElementsToArray, SaveButton, DeleteButton} from '../shared/utils'

import Grid from '@material-ui/core/Grid'
import RenderForm from '../shared/renderForm'

class Edit extends Create {
	state = {
		id: null,
		form: FormElements()
	}

	componentDidMount () {
		const department_id = queryString.parse(this.props.location.search).department
		const department = axios.get(API_ROOT + 'departments/get/' + department_id, getAxiosConfig())

		initializeState(
			[department],
			[null],
			this.state,
			(state) => this.axiosSetState(state)
		)
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const department = this.department()
		axiosEdit("departments", this.state.id, department, this.props.history)
	}

	deleteDepartment = () => {
		axiosDelete("departments", this.state.id, this.props.history)
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<>
				<h3>Επεξεργασία Τμήματος</h3>
				<form onSubmit={this.onSubmitHandler}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs={6}>
							<Grid container direction="column" spacing={3}>
								<RenderForm
									formElementsArray={formElementsArray}
									changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
									loadComponent={(inputIdentifier) => this.loadComponent(inputIdentifier)}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item>
								<SaveButton />
							</Grid>
							<Grid item>
								<DeleteButton deleteInstance={() => this.deleteDepartment()} />
							</Grid>
						</Grid>
					</Grid>
				</form>
			</>
		)
	}
}

export default Edit