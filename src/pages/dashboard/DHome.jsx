import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TODO_ATOM } from "../../atoms/todoAtom";
import { USER_ATOM } from "../../atoms/userAtom";
import TodosComp from "../../components/TodosComp";

const DHomePage = () => {
  const user = useRecoilValue(USER_ATOM);
  const todos = useRecoilValue(TODO_ATOM);

  const openModal = () => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.classList.add("show");
  };

  return (
    <Wrapper className="">
      <p className="my-3 text-primary">Hello, {user?.name}</p>
      {!todos.length ? (
        <div className="card home-card">
          <h3>
            <span className="text-primary">Saathi ToDo</span> helps you <br />{" "}
            schedule your tasks.
          </h3>

          <p>
            Your task schedule is empty, click the Plus to add your first Task
          </p>
        </div>
      ) : (
        <TodosComp />
      )}

      <img
        src="/images/plus-icon.svg"
        onClick={openModal}
        className="plus-icon openModal c-hand"
        alt=""
        height="70"
        width="70"
      />
    </Wrapper>
  );
};

export default DHomePage;

const Wrapper = styled.div`
  position: relative;
  .plus-icon {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .home-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 2rem;
    }
  }
`;
