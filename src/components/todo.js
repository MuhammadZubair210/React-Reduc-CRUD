import React, { Component } from 'react';
import { addtodo, view, deletetodo, edittodo, updatetodo } from '../store/action/action';
import { connect } from 'react-redux';

class Todo extends Component {
    constructor(props) {

        super(props);
        this.state = {
            todo: '',
            isTrue: false,
            editedtodo: '',
            saveupd: '',
            key: ''
        }
    }

    componentWillMount() {
        this.props.view();
    }

    getValue(ev) {
        this.setState({
            todo: ev.target.value
        })
    }

    updvalue(ev, id) {
        this.setState({ editedtodo: ev.target.value })
    }

    sendValue() {
        this.props.addTodo({ todo: this.refs.todo.value });
    }

    deletee(id) {
        this.props.allkeys
        let key = this.props.keys[id]
        this.props.deletetodo(key)
    }

    edit(val, id) {
        let key = this.props.keys[id]
        let value = this.props.alltodos[id]
        this.setState({ editedtodo: value, key: key, isTrue: false })
    }

    update(id) {
        let key = this.props.keys[id]
        this.setState({ isTrue: true });
        this.props.updatetodo(this.state.key, { todo: this.state.editedtodo });
    }

    render() {

        return (
            <div>
                <div className="Heading">
                    <div className="name-head">
                        React Redux Todo App
                    </div>
                    <div class="form-group">
                        <input type="text" ref="todo" placeholder="Write Here" class="form-control first-inp" id="usr" />
                    </div>
                    <button className="btn btn-success" onClick={this.sendValue.bind(this)}>Add Todo</button>

                </div>
                <hr />
                <ul className="list-group">
                    {
                        this.props.alltodos.map((value, index) => {
                            // console.log(value)
                            return <li className="list-group-item justify-content-between" key={index}><span className="">{value.todo}</span><span className="badge badge-default badge-pill"><span><button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.edit.bind(this, value, index)} data-target="#myModal">Edit Todo
                            </button></span><button className="btn btn-danger" onClick={this.deletee.bind(this, index)}>Delete</button><span></span></span></li>
                        })
                    }
                </ul>

                <div className="modal fade" id="myModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Update Todo</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <div className="modal-body">
                                <div class="form-group">
                                    <label for="upd">Write here</label>
                                    <input type="text" class="form-control" value={this.state.editedtodo.todo} onChange={this.updvalue.bind(this)} id="upd" />
                                </div>
                            </div>
                            <div>{
                                (this.state.isTrue) ?
                                    <div class="alert alert-success">
                                        <strong>SuccessFULL!</strong> TODO UPDATED
</div> : ''}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={this.update.bind(this, this.state.key)}>Update</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProp(state) {

    let array = [];
    (state.root.alltodos).map((value, index) => {
        return array.push(value);
    })

    let arraykeys = [];
    (state.root.allkeys).map((value, index) => {
        return arraykeys.push(value);
    })

    return ({
        todo: array,
        keys: arraykeys,
        alltodos: state.root.alltodos,
        specifictodo: state.root.specifictodo,
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
        updatetodo: (id, val) => {
            console.log(val)
            dispatch(updatetodo(id, val))
        }
    })
}

export default Todo = connect(mapStateToProp, mapDispatchToProp)(Todo);