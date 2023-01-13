const express = require("express");
const {
  getNotes,
  notesById,
  createNotes,
  UpdatedNote,
  DeleteNote,
} = require("../controllers/notesController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getNotes);
router.post("/create", protect, createNotes);
// signle note
// router.get('/:id', protect, notesById)

// router.put('/:id', protect, UpdatedNote);
router
  .route("/:id")
  .get(protect, notesById)
  .delete(protect, DeleteNote)
  .put(protect, UpdatedNote);
module.exports = router;
