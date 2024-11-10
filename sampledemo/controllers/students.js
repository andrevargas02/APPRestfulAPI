const db = require('../db');

exports.getStudents = (req, res) => {
  const students = db.get('students').value();
  res.status(200).json(students);
};

exports.getStudentById = (req, res) => {
  const student = db.get('students').find({ id: parseInt(req.params.id) }).value();
  if (student) {
    res.status(200).json(student);
  } else {
    res.status(404).json({ error: 'Estudante não encontrado' });
  }
};

exports.createStudent = (req, res) => {
  const { nome, curso, idade } = req.body;
  if (!nome || !curso || !idade) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const students = db.get('students').value();
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    nome,
    curso,
    idade: parseInt(idade)
  };
  db.get('students').push(newStudent).write();
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const { nome, curso, idade } = req.body;
  const student = db.get('students').find({ id: parseInt(req.params.id) });

  if (student.value()) {
    student.assign({ nome, curso, idade: parseInt(idade) }).write();
    res.status(200).json(student.value());
  } else {
    res.status(404).json({ error: 'Estudante não encontrado' });
  }
};

exports.deleteStudent = (req, res) => {
  const removed = db.get('students').remove({ id: parseInt(req.params.id) }).write();
  if (removed.length > 0) {
    res.status(200).json(removed[0]);
  } else {
    res.status(404).json({ error: 'Estudante não encontrado' });
  }
};
