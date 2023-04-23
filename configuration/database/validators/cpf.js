'use strict';
const validarCpf = require('validar-cpf');

const cpf = (value) => {
    // Remove dots and dashes from the CPF value
    const cpf = value.replace(/[.-]/g, '');

    // Use cpf-cnpj-validator to validate the CPF
    return validarCpf(cpf);
}

module.exports = cpf;