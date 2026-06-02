

class ErroDeSistema extends Error {
    constructor(mensagem) {
        // "super()" chama o construtor da classe pai "Error", que define a propriedade .message automaticamente
        super(mensagem);

        // Define o nome do erro como o nome da própria classe. sem isso, todo erro apareceria como "Error" no console
        this.name = this.constructor.name;
    }
}

class SalarioInvalidoError extends ErroDeSistema {
    // não precisa reescrever o constructor pois ele é herdado de ErroDeSistema. o "name" também é definido automaticamente como "salarioInvalidoError"
}

class FuncionarioNaoEncontradoError extends ErroDeSistema {
    // mesmo caso da classe filha acima
}

module.exports = {ErroDeSistema, SalarioInvalidoError, FuncionarioNaoEncontradoError}