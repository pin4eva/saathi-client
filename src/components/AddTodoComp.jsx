import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ADD_TODO } from "../apollo/queries/TodoQuery";
import { TODO_ATOM } from "../atoms/todoAtom";

const AddTodoComp = () => {
  const [todos, setTodos] = useRecoilState(TODO_ATOM);
  const [addTodo, { loading }] = useMutation(ADD_TODO);
  const [info, setInfo] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleClose = () => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.classList.remove("show");
  };
  useEffect(() => {
    const overlay = document.querySelector(".th-modal-overlay");
    overlay.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("th-modal") ||
        e.target.classList.contains("btn") ||
        e.target.parentElement.classList.contains("th-modal") ||
        e.target.parentElement.classList.contains("form-group")
      ) {
        console.log("yes");
      } else {
        overlay.classList.remove("show");
      }
    });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!info.title || !info.body) return;
    try {
      const { data } = await addTodo({ variables: info });
      setTodos([...todos, data.addTodo]);

      setInfo({
        title: "",
        body: "",
      });

      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal className="th-modal-overlay">
      <div className="th-modal">
        <div className="th-close" onClick={handleClose}>
          <div className="wrapper">X</div>
        </div>
        <div className="content">
          <h5 className="mb-4">
            Please fill out the details below to add new ToDO
          </h5>

          <form onSubmit={handleAdd}>
            <div className="form-group">
              {/* <label>Enter Text</label> */}
              <input
                type="text"
                value={info.title}
                placeholder="Enter Text"
                className="form-control"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <textarea
                value={info.body}
                name="body"
                onChange={handleChange}
                className="form-control bg-gray"
                id=""
                cols="30"
                rows="10"
                placeholder="Enter ToDO Description Here"
              ></textarea>
            </div>

            <div className="text-center">
              <button className="btn btn-primary mt-3">
                {loading ? "Loading..." : "Add Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddTodoComp;

const Modal = styled.div`
display:none;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
mix-blend-mode: normal;
transition: 0.5s ease-in-out all;
&.show{
    display: block;
}
textarea{
    background: #F7F7F7 !important;

}
  .th-modal {
    position: relative;
    width: 100%;
    max-width: 60rem;
    margin: auto;
    top: 167px;
    background: #fff;
    padding: 2rem;
    display: flex;
    justify-content:center;
    .th-close {
      background: gray;
        width: 2rem;
        height: 2rem;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        position: absolute;
        right: 0;
        top: -1.5rem;
        right: -1.5rem;
      }
    }
  }
`;
