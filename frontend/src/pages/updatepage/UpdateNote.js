import React, { useEffect, useState } from "react";
import DefaultScreen from "../../component/defaultscreen/DefaultScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, updateNote } from "../../actions/notesAction";
import ErrorMessage from "../../component/ErrorMessage";
import Loader from "../../component/Loader";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function UpdateNote() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const { id } = useParams();
  const noteId = id;
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error } = noteUpdate;
  const [message, setMessage] = useState(null);

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
    Navigate("/mynotes");
  };

  useEffect(() => {
    const fetchingNote = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/notes/${noteId}`, config);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetchingNote();
  }, [noteId, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNote(noteId, title, content, category));
    if (!title || !content || !category) {
      return setMessage("Please include all field");
    }

    resetHandler();
    Navigate("/mynotes");
  };
  console.log(noteId);
  return (
    <DefaultScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loading && <Loader />}
            {loadingDelete && <Loader />}

            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ marginBottom: "15px" }}
              />
            </Form.Group>
            {loading && <Loader size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(noteId)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </DefaultScreen>
  );
}

export default UpdateNote;
