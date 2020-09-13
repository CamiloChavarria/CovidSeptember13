const notesCtrl = {};

// Models
const Note = require("../models/Note");

notesCtrl.renderNoteForm = (req, res) => {
  res.render("about");
};

notesCtrl.createNewNote = async (req, res) => {
  const { cedula, apellidos, nombres, edad, ciudad, barrio, sintomas, patologias } = req.body;
  const errors = [];
  if (!cedula) {
    errors.push({ text: "Please Write a cedula." });
  }
  if (!apellidos) {
    errors.push({ text: "Please Write a apellidos" });
  }
  if (!nombres) {
    errors.push({ text: "Please Write a nombres" });
  }
  if (!edad) {
    errors.push({ text: "Please Write a edad" });
  }
  if (!ciudad) {
    errors.push({ text: "Please Write a ciudad" });
  }
  if (!barrio) {
    errors.push({ text: "Please Write a barrio" });
  }
  if (!sintomas) {
    errors.push({ text: "Please Write a sintomas" });
  }
  if (!patologias) {
    errors.push({ text: "Please Write a patologias" });
  }
  if (errors.length > 0) {
    res.render("about", {
      errors,
      cedula,
      apellidos,
      nombres,
      edad,
      ciudad,
      barrio,
      sintomas,
      patologias,
    });
  } else {
    const newNote = new Note({ cedula, apellidos, nombres, edad, ciudad, barrio, sintomas, patologias});
    await newNote.save();
    req.flash("success_msg", "Habitante Added Successfully");
    res.redirect("/notes");
  }
};

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find()
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  //if (note.user != req.user.id) {
    //req.flash("error_msg", "Not Authorized");
   // return res.redirect("/notes");
  //}
  res.render("/notes", { note });
};


notesCtrl.updateNote = async (req, res) => {
  const { cedula, apellidos, nombres, edad, ciudad, barrio, sintomas, patologias } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { cedula, apellidos, nombres, edad, ciudad, barrio, sintomas, patologias });
  req.flash("success_msg", "Habitante Updated Successfully");
  res.redirect("/notes");
};


notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Habitante Deleted Successfully");
  res.redirect("/notes");
};

module.exports = notesCtrl;