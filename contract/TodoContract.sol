pragma solidity ^0.6.0;

contract TodoContract {
    //Keeping the count of todos
    uint256 public todoCount;

    //Struct to create tasks
    struct Todo {
        uint256 id;
        string description;
        bool completed;
    }

    //Storing the tasks
    mapping(uint256 => Todo) public tasks;

    event taskCreated(uint256 id, string description, bool completed);
    event taskCompleted(uint256 id, bool completed);

    constructor() public {
        addTodo("Hey!");
    }

    function addTodo(string memory _description) public {
        todoCount++;
        tasks[todoCount] = Todo(todoCount, _description, false);
        emit taskCreated(todoCount, _description, false);
    }

    function toggleTaskStatus(uint256 _id) public {
        Todo storage updatedTodo = tasks[_id];
        updatedTodo.completed = !updatedTodo.completed;
        tasks[_id] = updatedTodo;
        emit taskCompleted(_id, updatedTodo.completed);
    }
}