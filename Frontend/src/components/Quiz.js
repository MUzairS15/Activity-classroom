import { useState } from "react";
import GenQuiz from "./GenQuiz";
import Resources from "./Resources";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import { Link } from "react-router-dom";

function Quiz() {
	const [dat, setData] = useState([]);

	const handleAdd = function (e) {
		e.preventDefault();
		const ele = new FormData(e.target);
		setData(dat => dat.concat(Object.fromEntries(ele)))
	}

	const handleDelete = function (e) {
		const newDat = dat.filter(function (delIndex, value) {
			if (value === e.target.value) {
				return false;
			} 
				
			return true;	
		})
		setData(newDat);
	}

	const handleSubmit = async function () {
		const code = localStorage.getItem('current-code');
		const sub = localStorage.getItem("current-sub");
		if (code !== null && sub !== null) {
			const response = await fetch('/api/quiz/live/addQuestion', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					"auth-token": localStorage.getItem('auth-token')
				},
				body: JSON.stringify({
					"question": dat,
					"sub": sub,
					"code": code,
					"type": "mcq",
					"score": 2
				})
			})
			const success = await response.json();

			if (success === "success") {
				alert('Posted Successfully');
			} else {
				alert('Some error Occured');
			}
		} else {
			alert('Please select class from home section');
		}
	}

	const data = dat.length === 0 ? <div>Please add Questions</div> : (
		(dat.map((question, ind) => (
			<div className="mx-2 my-2" key={ind} style={{ width: "18rem" }}>
				<a href="#" className="list-group-item list-group-item-action list-group-item-dark active">
					<button type="delete" onClick={(e) => { handleDelete(e) }} className="btn btn-dark" value={ind} style={{ width: "max-content", fontSize: "small", padding: "2px", position: "relative", left: "-7rem", top: "-1rem" }}>Delete</button>
					<div className="w-100 justify-content-between text-break text-truncate ">
						<h5 className="mb-1 ">Q.{ind + 1}</h5>
					</div>
					<p className="mb-1 text-break text-truncate ">{question.question}</p>
				</a>
			</div>
		)))
	)
	return (
		<div>
			<Router>
				<div className="sidenav">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div className="navbar-nav">
								<Link to="/Quiz/genQuiz" className="nav-item nav-link active" > Generate Quiz</Link>
								<Link to="/Quiz/res" className="nav-item nav-link active" > Resources</Link>
							</div>
						</div>
					</nav>
				</div>
				<Switch>
					<Route exact path="/Quiz/genQuiz">
						<GenQuiz
							data={data} 
							handleSubmit={handleSubmit} 
							handleAdd={handleAdd}
						/>
					</Route>
					<Route exact path="/Quiz/res">
						<Resources />
					</Route>
				</Switch>
			</Router>

		</div>
	)

}

export default Quiz;
