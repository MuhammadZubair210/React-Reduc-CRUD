import React, { Component } from 'react';
import { addtodo, view, deletetodo, edittodo, updatetodo } from '../store/action/action';
import { connect } from 'react-redux';

class Todo extends Component {
    constructor(props) {

        super(props);
        this.state = {
            todo: '',
        }
    }

    componentWillMount() {
        console.log(this.props.alltodos)
        this.props.view();
    }

    getValue(ev) {
        this.setState({
            todo: ev.target.value
        })
    }

    sendValue() {
        this.props.addTodo({ todo: this.state.todo });
        this.setState({ array: this.props.alltodos })
    }

    deletee(id) {
        // let ind = this.state.arraykeys[id];
        // this.props.deletetodo(id);
        (this.props.alltodos).slice(id, 1);
        console.log(id);
        
    }

    edit(id) {
        this.setState({ inddex: this.state.arraykeys[id] });
        this.props.edittodo(this.state.inddex);
    }

    update(id) {
        let ind = this.state.arraykeys[id];
        this.props.updatetodo(ind);
    }

    render() {

        return (
            <div className="App">
                <p className="App-intro">
                    <input type="text" value={this.state.todo} onChange={this.getValue.bind(this)} />
                    <button onClick={this.sendValue.bind(this)}>Add Todo</button>
                </p>
                <hr />
                <ul>
                    {
                        this.props.alltodos.map((value, index) => {
                            return <li key={index}>{value.todo}<span><button>Edit</button></span><button onClick={this.deletee.bind(this, index)}>Delete</button><span></span></li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProp(state) {
    return ({
        todo: state.root.addTodo,
        alltodos: state.root.alltodos,
    })

}

function mapDispatchToProp(dispatch) {
    return ({
        addTodo: (todo) => {
            dispatch(addtodo(todo))
        },
        view: () => {
            dispatch(view())
        },
        deletetodo: (id) => {
            dispatch(deletetodo(id))
        },
        edittodo: (id) => {
            dispatch(edittodo(id))
        },
        updatetodo: (id) => {
            dispatch(updatetodo(id))
        }
    })
}

export default Todo = connect(mapStateToProp, mapDispatchToProp)(Todo);