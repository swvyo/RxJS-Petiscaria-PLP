const { Subject, from } = require('rxjs');
const { filter, take, distinct, skipWhile, merge } = require('rxjs/operators');

class Prato {
  constructor(name) {
    this.name = name;
  }
}

class PetiscosSalgados extends Prato {
  constructor(name) {
    super(name);
    this.type = 'Salgado'
  }
}

class PetiscosVegetarianos extends Prato {
  constructor(name) {
    super(name);
    this.type = 'Vegetariano'
  }
}

class Sobremesas extends Prato {
  constructor(name) {
    super(name);
    this.type = 'Doce'
  }
}


//Subjects, maneira de transmitir um valor ou um evento para vários Observadores.
const pessoa2 = new Subject();
const pessoa3 = new Subject();


//Arrays
const petiscosPessoa1 = new Array();
const petiscosPessoa2 = new Array();
const petiscosPessoa3 = new Array();

//Objetos
const carneDoSol = new PetiscosSalgados('Carne do Sol');
const croquete = new PetiscosSalgados('Croquetes');
const coxinha = new PetiscosSalgados('Coxinhas');
const pastel = new PetiscosSalgados('Pastelzinho');
const asinhaFrango = new PetiscosSalgados('Asinhas de Frango');
const calabresa = new PetiscosSalgados('Calabresa');
const queijoChips = new PetiscosSalgados('Chips de Queijo');
const chipsBacon = new PetiscosSalgados('Chips de Bacon');
const chipsBatata = new PetiscosSalgados ('Batata Chips')

const coxinhaJaca = new PetiscosVegetarianos ('Coxinha de Jaca');
const pastelTofu = new PetiscosVegetarianos ('Pastel de Tofu');
const chipsTomate = new PetiscosVegetarianos ('Chips de Tomate');
const empadaCouve = new PetiscosVegetarianos ('Empada de Couve');
const empadaRepolho = new PetiscosVegetarianos ('Empada de Repolho')

const brigadeiro = new Sobremesas('Brigadeiros');
const beijinho = new Sobremesas('Beijinho');
const bemCasado = new Sobremesas('Bem Casado');
const pudim = new Sobremesas ('Pudim');
const mousseMaracuja = new Sobremesas('Mousse de Maracuja');
const mousseChocolate = new Sobremesas ('Mousse de Chocolate')

const pratos = [
  carneDoSol,
  croquete,
  carneDoSol,
  coxinha,
  pastel,
  asinhaFrango,
  calabresa,
  queijoChips,
  chipsBacon,
  chipsBacon,
  chipsBatata,
  coxinhaJaca,
  pastelTofu,
  pastelTofu,
  chipsTomate,
  empadaCouve,
  empadaRepolho,
  brigadeiro,
  beijinho,
  beijinho,
  bemCasado,
  pudim,
  mousseChocolate,
  mousseMaracuja,
];

//Solucionando Pessoa1
petiscosSalgados = (prato$) => prato$.pipe(
  filter(prato => (prato.type === 'Salgado' && prato.name !== 'Calabresa')),
  distinct(),
  take(8)
);

sobremesas = (prato$) => prato$.pipe(
  filter(prato => prato.type === 'Doce'),
  distinct(),
  take(3)
);

const sourcePetiscos$ = from(pratos);
const salgados$ = petiscosSalgados(sourcePetiscos$);
const doces$ = sobremesas(sourcePetiscos$);

salgados$.pipe(merge(doces$)).subscribe(
  prato => petiscosPessoa1.push(prato)
);

//Solucionando Pessoa2
pessoa2
.pipe(
  skipWhile(prato => prato.type === 'Salgado'),
  skipWhile(prato => prato.type === 'Vegetariano')
)
.subscribe(
  prato => petiscosPessoa2.push(prato)
);


//Solucionando Pessoa3 
pessoa3
.pipe(
  distinct()
)
.subscribe(
  prato => petiscosPessoa3.push(prato)
);

setPrato = (prato) => {
  pessoa2.next(prato);
  pessoa3.next(prato);
}


pratos.forEach(prato => setPrato(prato));


//console.log(`petiscosPessoa1: ${JSON.stringify(petiscosPessoa1, null, 2)}`);
//console.log(`petiscosPessoa2: ${JSON.stringify(petiscosPessoa2, null, 2)}`);
console.log(`petiscosPessoa3: ${JSON.stringify(petiscosPessoa3, null, 2)}`);