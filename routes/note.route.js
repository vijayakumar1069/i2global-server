import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  createNote,
  deleteNoteById,
  getAllNotes,
  getNoteById,
  updateNoteById,
} from "../controllers/note.controller.js";
import servermiddleware from "../middlewares/servermiddleware.js";

const noteRouter = express.Router();

noteRouter.get("/get-all-notes", servermiddleware, getAllNotes);
noteRouter.post("/create-note", middleware, createNote);
noteRouter.get("/get-note-by-id/:id", middleware, getNoteById);
noteRouter.put("/edit-note/:id", middleware, updateNoteById);
noteRouter.delete("/delete-note/:id", middleware, deleteNoteById);

export default noteRouter;
