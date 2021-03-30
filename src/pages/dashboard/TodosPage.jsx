import React from "react";
import styled from "styled-components";

const TodosPage = () => {
  const openModal = () => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.classList.add("show");
  };
  return (
    <Wrapper className="todo">
      <div className="todo-uncompleted box">
        <p className="text-muted mb-3">List of all uncompleted Tasks</p>

        <div className="content">
          <small className="mb-3">
            To mark a task completed, check the box
          </small>
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
      </div>
      <div className="todo-completed box">
        <p className="text-muted mb-3">List of all uncompleted Tasks</p>

        <div className="content">
          <small className="mb-3">
            {" "}
            To mark a task completed, check the box
          </small>

          <TodoItem />
        </div>
      </div>
      <img
        onClick={openModal}
        src="/images/plus-icon.svg"
        className="plus-icon"
        alt=""
        height="70"
        width="70"
      />
    </Wrapper>
  );
};

export default TodosPage;

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
    display: flex;
    align-items: baseline;
    margin-bottom: 1rem;
    .text-content {
      margin-left: 1rem;
      small {
        /* text-align: center; */
        display: block;
      }
    }
  }
`;

const TodoItem = () => {
  return (
    <div className="todo-item">
      <input type="checkbox" name="" id="" />
      <div className="text-content">
        <p>Meeting With Saathi</p>
        <small>
          You’re having a meeting the Saathi Hiring Team on the 17th of March,
          2021 by 4PM (WAT)
        </small>
      </div>
    </div>
  );
};
