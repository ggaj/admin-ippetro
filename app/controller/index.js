const moduloController          = require('./modulo.controller');
const materiaController         = require('./materia.controller');
const licaoController           = require('./licao.controller');
const membroController          = require('./membro.controller');
const professorController       = require('./professorController');
const saladeaulaController      = require('./saladeaula.controller');
const matriculaController       = require('./matricula.controller');
const diadeaulaController       = require('./diadeaula.controller');
const usuarioController         = require('./usuario.controller');
const igrejaController          = require('./igreja.controller');
const ebdrelatorios             = require('./ebd-relatorios.controller');
const gf_matriculasController   = require('./gf-matricula.controller');
const visitanteController       = require('./visitante.controller');    
const agendaController          = require('./agenda.controller');    
const pequenosGruposController          = require('./pequenosgrupos.controller');    
const pequenosGruposMembrosController   = require('./pequenosgrupos-membros.controller');
const pequenosGruposPresencaController  = require('./pequenosgrupos-presenca.controller');

module.exports = { 
    moduloController,
    materiaController,
    licaoController,
    membroController,
    professorController,
    saladeaulaController,
    matriculaController,
    diadeaulaController,
    usuarioController,
    igrejaController,
    ebdrelatorios,
    gf_matriculasController,
    visitanteController,
    agendaController,
    pequenosGruposController,
    pequenosGruposMembrosController,
    pequenosGruposPresencaController,
}
