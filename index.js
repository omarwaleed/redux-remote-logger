import axios from "axios";

export default function({host, headers, failureFunction}){
	return ({ getState }) => next => action => {
		axios.post(host, {
			action,
			state: getState()
		}, {
			headers
		})
		.catch((err)=> (failureFunction && typeof failureFunction === 'function')? failureFunction : console.error(err));

		return next(action);
	}
}