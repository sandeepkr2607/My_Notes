import React from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import DefaultScreen from "../../component/defaultscreen/DefaultScreen";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, listNotes } from "../../actions/notesAction";
import Loader from "../../component/Loader";
import ErrorMessage from "../../component/ErrorMessage";

function MyNotes(props) {
  const { search } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const noteUpdate = useSelector((state) => state.noteUpdate);

  const { success: successUpdate } = noteUpdate;
  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <p type="button" onClick={decoratedOnClick}>
        {children}
      </p>
    );
  }

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, successCreate, userInfo, successUpdate, successDelete]);

  return (
    <DefaultScreen title={`Welcome Back ${userInfo?.name}..`}>
      {loading && <Loader />}
      {loadingDelete && <Loader />}
      <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        size="lg"
        onClick={() => navigate("/createnote")}
      >
        Create New Note
      </Button>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {notes &&
        notes
          .reverse()
          .filter((filterNote) =>
            filterNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((data, index) => (
            <>
              <Accordion key={data._id}>
                <Card style={{ margin: 10 }}>
                  <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <CustomToggle eventKey="0">{data.title}</CustomToggle>
                    </span>
                    <div>
                      <Button onClick={() => navigate(`/mynotes/${data._id}`)}>
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(data._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <h4>
                        <Badge variant="success">
                          Category-{data.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{data.content}</p>
                        <footer className="blockquote-footer">
                          Created On -
                          <cite title="Source Title">
                            {data.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </>
          ))}
    </DefaultScreen>
  );
}

export default MyNotes;
