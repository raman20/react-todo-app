import React from 'react';
import ReactDOM from 'react-dom';

class TodoListRow extends React.Component {
	render() {
		const row = this.props.tasks.map((item, index) => {
			return (
				<tr key={index}>
					<td>{item}	<button onClick={() => {this.props.deleteTasks(index);}}>delete</button></td>
				</tr>
			);
		});
		return <tbody>{row}</tbody>;
	}
}
class TodoList extends React.Component {
	render() {
		return (
			<table>
				<TodoListRow tasks={this.props.tasks} deleteTasks={this.props.deleteTasks}/>
			</table>
		);
	}
}
class TodoInput extends React.Component {
	add = () => {
		let inp = document.getElementById("inp");
		this.props.onAdd(inp.value);
		inp.value = "";
	};
	render() {
		return (
			<div className="Input">
				<input type="text" id="inp" placeholder="enter task todo" />
				<button onClick={this.add}>Add</button>
			</div>
		);
	}
}
class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { items: [] };
	}

	addTasks = (tasks) => {
		this.setState({items: this.state.items.concat(tasks)});
	};

	deleteTasks = (index) => {
		let tempItems = this.state.items;
		tempItems = tempItems.filter((item,idx)=>{
			return idx !== index;
		})
		this.setState({items: tempItems});
	};

	render() {
		return (
			<div className="app">
				<h1>Todo App</h1>
				<TodoInput onAdd={this.addTasks} />
				<br/>
				<TodoList tasks={this.state.items} deleteTasks = {this.deleteTasks}/>
			</div>
		);
	}
}


ReactDOM.render(<TodoApp />, document.getElementById("root"));
