const asyncHandler = require("express-async-handler");
// const notes = require('../data/notes');
const Note = require("../modals/notesModal");
const User = require("../modals/userModal");

// @desc notes
// @dsec /api/notes
// @access Public

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });

  return res.json(notes);
});

// @desc notes
// @dsec /api/create
// @access Public

const createNotes = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    return res.status(400).json({ message: "Please include all filed" });
  } else {
    const note = new Note({ user: req.user._id, title, content, category });
    const createNote = await note.save();

    return res.status(201).json(createNote);
  }
});

const notesById = asyncHandler(async (req, res) => {
  // find the notes array

  const singleNote = await Note.findById(req.params.id);
  // console.log(singleNote);
  if (singleNote) {
    return res.json(singleNote);
  } else {
    return res.status(404).json({ message: "Note Not Found" });
  }
});

const UpdatedNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const DeleteNote = asyncHandler(async (req, res) => {
  // find the notes array

  const singleNote = await Note.findById(req.params.id);
  if (singleNote.user.toString() !== req.user._id.toString()) {
    res.status(401).json({ message: "You can't perform this action" });
  }
  if (singleNote) {
    await singleNote.remove();
    return res.json({ message: "Note Removed" });
  } else {
    return res.status(404).json({ message: "Note Not Found" });
  }
});

module.exports = {
  getNotes,
  createNotes,
  notesById,
  UpdatedNote,
  DeleteNote,
};
