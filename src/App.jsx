import { Component } from 'react';
import { TodoList } from 'components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import todos from './todos';

export class App extends Component {
  state = {
    todos,
    inputValue: '',
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  formSubmitHandler = data => {
    console.log(data);

}



  render() {
    const { todos } = this.state;
    const completedTodosCount = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0
    );
    const totalTodoCount = todos.length;

    return (
      <>
        <h1>State</h1>
        <Form onSubmit={this.formSubmitHandler}/>
        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
        <div>
          <p>Total amount of 'todos': {totalTodoCount}</p>
          <p>Number of finished 'todos': {completedTodosCount}</p>
        </div>
      </>
    );
  }
}
