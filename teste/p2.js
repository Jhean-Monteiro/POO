class ErroPetShop extends Error {
    constructor(message) {
        super(message);
        this.name = "ErroPetShop"
    }
}

class ErroTipoInvalido extends ErroPetShop {
    constructor(message) {
        super(message);
        this.name = "ErroTipoInvalido"
    }
}

class ErroAnimalNaoEncontrado extends ErroPetShop {
    constructor(message) {
        super(message);
        this.name = "ErroAnimalNaoEncontrado"
    }
}

class ErroAbstracao extends ErroPetShop {
    constructor(message) {
        super(message);
        this.name = "ErroAbstracao";
    }
}

class Vacina {
    #nome;
    #dose;
    constructor(nome, dose) {
        this.#nome = nome;
        this.#dose = dose;
    }

    toString() {
        return `Vacina: [${this.#nome}] | Dose: [${this.#dose}]`
    }
}

class Animal {
    #nome;
    #especie;
    #vacinas;

    constructor(nome, especie) {
        if (new.target === Animal) {
            throw new ErroAbstracao("Animal é uma classe abstrata e não pode ser instanciada")
        }
        this.#nome = nome;
        this.#especie = especie;
        this.#vacinas = [];
    }

    get nome() {
        return this.#nome
    }
    get especie() {
        return this.#especie
    }

    addVacina(vacina) {
        if (!(vacina instanceof Vacina)) {
            throw new ErroTipoInvalido(`O objeto enviado não é uma instância de Vacina.`);
        }
        this.#vacinas.push(vacina);
    }

    listarVacinas() {
        if (this.#vacinas.length === 0) {
            throw new ErroPetShop(`Nenhuma vacina foi aplicada!`);
        }
        return this.#vacinas.map(vacina => console.log(vacina.toString()))
    }

    som() {
        throw new Error(`O método som() deve ser implementado nas subclasses.`);
    }

    toString() {
        return `Espécie: ${this.especie} | Nome: ${this.nome}`
    }
}

class Cachorro extends Animal {
    #raca;
    constructor(nome, especie, raca) {
        super(nome, especie);
        this.#raca = raca;
    }

    som() {
        return `O Cachorro ${this.nome} faz "Au Au!"`
    }
}

class Gato extends Animal {
    #cor;
    constructor(nome, especie, cor) {
        super(nome, especie);
        this.#cor = cor;
    }

    som() {
        return `O Gato ${this.nome} faz "Miau!"`
    }
}

class Porco extends Animal {
    constructor() {
        super()
    }
}


class Clinica {
    #nome;
    #animais;
    constructor(nome) {
        this.#nome = nome;
        this.#animais = [];
    }

    get animais() {
        return this.#animais;
    }

    addAnimal(a) {
        if(!(a instanceof Animal)) {
            throw new ErroTipoInvalido(`Objeto ${a} não é uma instância de Animal`);
        }
        this.#animais.push(a);
    }

    removerAnimal(nome) {
        const index = this.#animais.indexOf(nome);
        if (!index) {
            throw new ErroAnimalNaoEncontrado(`Ainda não há nenhum animal na Clinica`);
        }

        this.#animais.splice(index, 1);
    }

    buscar(trecho) {
        this.#animais.map(a => { if (a.nome.toLowerCase().includes(trecho.toLowerCase())) {
            console.log(a.nome)
        }})
    }

    listarAnimais() {
        if (this.#animais.length === 0) {
            throw new ErroAnimalNaoEncontrado("Ainda não há nenhum animal na Clínica")
        }
        this.animais.map(a => console.log(`${a.toString()}`))
    }

    listarTodasVacinas(nomeCompleto) {
        this.#animais.map(a => {
           if (a.nome === nomeCompleto) {
            a.listarVacinas()
           }
        })
    } 
}

/* testes que fiz durante o andamento da prova
const gato = new Gato("Gatinho", "Especie exemplo")
const gato2 = new Gato("Gatinhoo", "Especie exemplo")
gato.addVacina(new Vacina("vacina exemplo", 5))
gato.addVacina(new Vacina("vacina exemplo2", 4))
console.log(gato.toString())

const clinica = new Clinica("Clinica do Zé")
clinica.addAnimal(gato)
clinica.addAnimal(gato2)
console.log(clinica.animais)
clinica.buscar("Gat")

try {
    clinica.listarTodasVacinas("Gatinhoo")
} catch (e) {
    console.log(`${e.name}, ${e.message}`)
}

clinica.listarAnimais()
clinica.removerAnimal(gato)
clinica.listarAnimais()

*/
try {
    console.log("\n==== tentar instanciar Animal dá erro ====")
    const animal = new Animal("Animal inválido")
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n==== Se tentar adicionar uma vacina que não é uma instância da classe Vacina, lança erro ====");
    const cachorro = new Cachorro("cachorrin", "sla");
    cachorro.addVacina("vacina")
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n === Se a lista de vacinas de um animal estiver vazia, lança erro ao tentar exibir ===")
    const cachorro = new Cachorro("cachorrin", "sla");
    cachorro.listarVacinas()
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n=== Tentar implementar método abstrato sem adicionar o método na subclasse lança erro. (criei uma classe Porco pra usar de exemplo) ===")
    const porco = new Porco("porco")
    porco.som()
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n=== Tentar adicionar na clinica um Objeto que não é instâncioa de Animal lança erro. ===");
    const clinica = new Clinica("Generica")
    clinica.addAnimal("cachorro")
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n=== Tentar remover animal da clínica com a lista de animais vazia lança erro ===")
    const clinica = new Clinica("Generica")
    const generico = new Gato("gatão", "sei la")
    clinica.removerAnimal(generico)
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n=== Tentar exibir a lista de animais na clínica sem ter adicionado nenhum animal lança erro ===");
    const clinicaaa = new Clinica("DNV KKKKK")
    clinicaaa.listarAnimais()
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {
    console.log("\n=== Método listarTodasVacinas na Clínica chama o método listarVacinas de Animal, então lança o mesmo erro caso nenhuma vacina tenha sido adicionada ===");
    const outraClinica = new Clinica("Outra");
    const outroAnimal = new Gato("GATIN", "sla");
    outraClinica.addAnimal(outroAnimal);
    outraClinica.listarTodasVacinas("GATIN")
} catch (e) {
    console.log(`Erro: ${e.name} | ${e.message}`)
}

try {

} catch (e) {
    
}


const cachorro = new Cachorro("cachorrinho 1", "cachorro")
const dog = new Cachorro("cachorro2", "cachorro")
const gato = new Gato("Zé da Manga", "gato", "preto")

cachorro.addVacina(new Vacina("vacina 1", 1))
cachorro.addVacina(new Vacina("vacina 2", 2))

dog.addVacina(new Vacina("teste 1", 1))
dog.addVacina(new Vacina("teste 2", 2))

gato.addVacina(new Vacina("generico 1", 1))
gato.addVacina(new Vacina("generico 2", 2))

const clinica = new Clinica("VETERINÁRIA")
clinica.addAnimal(cachorro)
clinica.addAnimal(dog)
clinica.addAnimal(gato)

console.log("\nPercorrendo e exibindo lista de animais da clínica,e mostrando todas as suas vacinas");
clinica.listarAnimais()
console.log("\nvacinas do cachorrinho 1:")
clinica.listarTodasVacinas("cachorrinho 1")
console.log("\nvacinas do cachorro2:")
clinica.listarTodasVacinas("cachorro2")
console.log("\nvacinas do Zé da Manga:")
clinica.listarTodasVacinas("Zé da Manga")

clinica.removerAnimal("cachorro2")
console.log("\nclinica atual, sem cachorro2:")

clinica.listarAnimais()
console.log("\nMesmo depois de removido, o cachorro2 continua existindo");
console.log(dog.toString())

console.log("\nChamando método som()")
console.log(cachorro.som())
console.log(gato.som())
