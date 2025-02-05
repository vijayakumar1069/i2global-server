import { NOTES } from "../schema/notes.schema.js";

export async function createNote(req, res, next) {
  try {
    const { note_content, note_title } = req.body;

    const newNote = new NOTES({
      note_content,
      note_title,
      user: req.user.id,
    });
    await newNote.save();
    res.status(201).json({
      message: "Note created successfully",
      statusCode: 201,
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllNotes(req, res, next) {
  try {
    const notes = await NOTES.find({ user: req.user.id });
    res.status(200).json({
      message: "All notes fetched successfully",
      data: notes,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}

export async function getNoteById(req, res, next) {
  try {
    const note = await NOTES.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: "Note fetched successfully",
      note,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
export async function updateNoteById(req, res, next) {
  try {
    const { id } = req.params;
    const { note_content, note_title, note_status } = req.body;
    const note = await NOTES.findById(id);
  
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        statusCode: 404,
      });
    }
    if (note_title) {
      note.note_title = note_title;
    }
    if (note_content) {
      note.note_content = note_content;
    }
    if (note_status) {
      note.note_status = note_status;
    }
    const newNote = await note.save();
    res.status(200).json({
      message: "Note updated successfully",
      statusCode: 200,
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteNoteById(req, res, next) {
  try {
    const { id } = req.params;
    const note = await NOTES.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
        statusCode: 404,
      });
    }
    await NOTES.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
}
