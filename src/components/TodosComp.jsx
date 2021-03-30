import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DELETE_TODO, MARK_COMPLETED } from "../apollo/queries/TodoQuery";
import { TODO_ATOM } from "../atoms/todoAtom";

const TodosComp = () => {
  const [todos, setTodos] = useRecoilState(TODO_ATOM);
  // const [completedTodos, setCompletedTodos] = useState(
  //   todos.filter((t) => t.completed)
  // );
  // const [uncompletedTodos, setUnCompletedTodos] = useState(
  //   todos.filter((t) => !t.completed)
  // );
  const openModal = () => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.classList.add("show");
  };

  const handleCompleted = (data) => {
    setTodos(
      todos.map((t) => (t.id === data.id ? { ...t, completed: true } : t))
    );
    // setUnCompletedTodos(uncompletedTodos.filter((t) => t.id !== data.id));
    // setCompletedTodos([
    //   ...completedTodos,
    //   {
    //     ...data,
    //     completed: true,
    //   },
    // ]);
  };

  const handleDelete = (data) => {
    setTodos(todos.filter((t) => t.id !== data.id));
    // setCompletedTodos(completedTodos.filter((t) => t.id !== data.id));
    // setUnCompletedTodos(uncompletedTodos.filter((t) => t.id !== data.id));
  };

  // useEffect(() => {
  //   const completed = todos.filter((todo) => todo.completed);
  //   const uncompleted = todos.filter((todo) => !todo.completed);

  //   setUnCompletedTodos(uncompleted);
  //   setCompletedTodos(completed);
  // }, [todos]);

  return (
    <Wrapper className="todo">
      {todos.filter((t) => !t.completed).length > 0 ? (
        <div className="todo-uncompleted box">
          <p className="text-muted mb-3">List of all uncompleted Tasks</p>

          <div className="content">
            <small className="mb-3">
              To mark a task completed, check the box
            </small>
            {todos
              .filter((t) => !t.completed)
              .map((todo, i) => (
                <TodoItem
                  onCompleted={handleCompleted}
                  onDeleted={handleDelete}
                  key={i}
                  todo={todo}
                />
              ))}
          </div>
        </div>
      ) : (
        <h4>You have 0 uncompleted task</h4>
      )}
      {todos.filter((t) => t.completed).length > 0 && (
        <div className="todo-completed box">
          <p className="text-muted mb-3">List of all completed Tasks</p>

          <div className="content">
            {/* <small className="mb-3">
            To mark a task completed, check the box
          </small> */}

            {todos
              ?.filter((t) => t.completed)
              .map((todo, i) => (
                <TodoItem key={i} todo={todo} onDeleted={handleDelete} />
              ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default TodosComp;

const Wrapper = styled.div`
  position: relative;
  .plus-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: pointer;
    /* width: 7rem; */
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2rem;
  .todo-uncompleted {
    .content {
      background: #3b5999;
      color: white;
    }
  }

  .todo-completed {
    .content {
      background: #4c4c4c;

      color: white;
    }
  }
  .box {
    width: 100%;
    max-width: 26rem;
    .content {
      padding: 1rem;

      border-radius: 15px;
    }
  }
  .todo-item {
  }
`;

const TodoItem = ({ todo, onCompleted, onDeleted }) => {
  const [checked, setChecked] = useState(Boolean(todo.completed));
  const [complete, { loading }] = useMutation(MARK_COMPLETED);
  const [todos, setTodos] = useRecoilState(TODO_ATOM);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const markCompleted = async (e) => {
    console.log(e.target.value);

    try {
      await complete({ variables: { id: todo.id } });
      onCompleted(todo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    // e.preventDefault();

    try {
      await deleteTodo({ variables: { id: todo.id } });
      onDeleted(todo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ItemWrapper className="todo-item">
      <input
        value={todo.completed}
        onChange={markCompleted}
        type="checkbox"
        checked={todo?.completed}
        disabled={Boolean(todo?.completed)}
      />
      <div className="text-content">
        <p
          style={{
            textDecoration: `${
              todo.completed || loading ? "line-through" : ""
            }`,
          }}
        >
          {todo?.title}
        </p>
        <small>{todo?.body}</small>
      </div>
      <button
        onClick={handleDelete}
        // disabled={todo.completed}
        style={{ marginLeft: "auto", padding: 0 }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
  /* justify-content: space-between; */
  .text-content {
    margin-left: 1rem;
    small {
      /* text-align: center; */
      display: block;
    }
  }
`;
