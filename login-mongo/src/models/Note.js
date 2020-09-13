const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    cedula: {
      type: String,
      required: true
    },
    apellidos: {
      type: String,
      required: true
    },
    nombres: {
      type: String,
      required: true
    },
    edad: {
      type: String,
      required: true
    },
    ciudad: {
      type: String,
      required: true
    },
    barrio: {
      type: String,
      required: true
    },
    sintomas: {
      type: String,
      required: true
    },
    patologias: {
      type: String,
      required: true
    },
    created_ad: {
      type: Date,
      default: Date.now
    },
///////////////////////////////////////////////    
  },
  {
    timestamps: true
  }
);



module.exports = model("Note", NoteSchema);

