import { Component } from 'react';
import Container from './components/Container';
import TodoList from './components/TodoList';
import TodoEditor from './components/TodoEditor';
import Filter from 'components/Filter';
import shortid from 'shortid';
import { Form } from './components/Form/Form';
import Modal from './components/Modal';
// import todos from './todos';
import Tabs from './components/Tabs';
import tabs from './tabs.json';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';

export class App extends Component {
  state = {
    todos: [],
    inputValue: '',
    filter: '',
    showModal: false,
  };

  countCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);
    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  componentDidUpdate(prevProps, prevState) {
   
    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      console.log('Обновилось поле todos, записываю todos в хранилище');
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }
    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const completedTodosCount = this.countCompletedTodos();
    const totalTodoCount = todos.length;
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="40" height="40" fill="#fff" />
        </IconButton>
        {/* <Tabs items={tabs} /> */}
        <button type="button" onClick={this.toggleModal}>
          Open modal window
        </button>

        {showModal && (
          <Modal onClose={this.toggleModal}>
               <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}

        <h1>State</h1>
        {/* <Form onSubmit={this.formSubmitHandler} /> */}
        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        
        <div>
          <p>Total amount of 'todos': {totalTodoCount}</p>
          <p>Number of finished 'todos': {completedTodosCount}</p>
        </div>
      </Container>
    );
  }
}
