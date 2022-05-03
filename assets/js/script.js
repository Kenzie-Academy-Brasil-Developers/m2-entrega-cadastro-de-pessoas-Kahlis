class Pessoa {
    constructor(name, lastName, birthday, email, contact, phoneNum, role) {
        this._name = name;
        this._lastName = lastName;
        this._birthday = birthday;
        this._email = email;
        this._contact = contact;
        this._phoneNum = phoneNum;
        this._role = role;
    }

    get name() {
        return this._name;
    }

    get birthday() {
        return this._birthday;
    }

    get email() {
        return this._email;
    }

    get role() {
        return this._role;
    }

    static NovaPessoaAoContainer(pessoa) {
        if(!register.includes(pessoa)) {
            register.push(pessoa);
        }

        const pessoaHTML = document.createElement("li");
        pessoaHTML.innerHTML = `<span>${pessoa.name}</span><span>${pessoa.email}</span><span>${pessoa.role}</span>`;
        const container = document.getElementById("lista-de-alunos");
        if(pessoa.role === currentRole || currentRole == "Todos") {
            container.appendChild(pessoaHTML);
        }
    }

    //Pedaço de código extraído da internet - https://www.codegrepper.com/
    getAge() {
        var ageInMilliseconds = new Date() - new Date(this.birthday);
        return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
    }
    //Fim do código com base na internet
}

let currentRole = "Todos";
let register = [];

let Marcos = new Pessoa("Marcos", "Lima", "1998-05-04", "marcos@hotmail.com", "", "(14) 99856-7348", "Facilitador");
let Daila = new Pessoa("Dáila", "Oliveira", "2000-07-02", "daila@gmail.com", "", "(11) 99153-2924", "Facilitador");
let Luana = new Pessoa("Luana", "Alves", "1995-04-05", "lua.alves@outlook.com", "", "(16) 98018-1621", "Instrutor");
let Felipe = new Pessoa("Felipe", "Melo", "1999-03-10", "felipe@gmail.com", "", "(16) 98642-7380", "Aluno");
let Paulo = new Pessoa("Paulo", "Gomes", "1999-03-10", "paulo@hotmail.com", "", "(17) 98294-7339", "Aluno");

register.push(Marcos);
register.push(Daila);
register.push(Luana);
register.push(Felipe);
register.push(Paulo);

RebuildContainer("Todos");

document.getElementById("register-button").addEventListener("click", () => {
    const name = document.querySelectorAll(".field")[0].value;
    const lastName = document.querySelectorAll(".field")[1].value;
    const birthday = document.querySelectorAll(".field")[2].value;
    const email = document.querySelectorAll(".field")[3].value;
    const contact = document.querySelectorAll(".field")[4].value;
    const phoneNum = document.querySelectorAll(".field")[5].value;
    const role = document.querySelectorAll(".field")[6].value;
    const newPerson = new Pessoa(name, lastName, birthday, email, contact, phoneNum, role);
    
    let emailExists = false;
    let error = false;

    if(name == "" || lastName == "" || birthday == "" || email == "" || contact == "" || phoneNum == "" || role == ""){
        alert("Preencha todos os campos!");
        error = true;
    }
    
    register.forEach((elem) => {
        if(elem.email == email)
            emailExists = true;
    });

    if(newPerson.getAge() < 18 && !error){
        alert("Para se cadastrar você precisa ser maior de 18 anos de idade");
        error = true;
    }
    
    if(emailExists && !error) {
        alert("Esse email já foi cadastrado em nossa plataforma, tente outro ou recupere o acesso à sua conta");
        error = true;
    }

    if(error === false) {
        Pessoa.NovaPessoaAoContainer(newPerson);
    }
});

document.getElementById("btn").addEventListener("click", () => {
    const role = document.getElementById("cargoOption").value;
    RebuildContainer(role);
});

function RebuildContainer(filter) {
    let count = 0;
    ClearContainer();
    currentRole = filter;
    register.forEach(element => {
        if(element.role == filter || filter == "Todos") {
            Pessoa.NovaPessoaAoContainer(element);
            count++;
        }
    });
    document.getElementById("total-alunos").innerText = count;
}

function ClearContainer() {
    const container = document.getElementById("lista-de-alunos");
    let child = container.lastChild;
    while(child) {
        container.removeChild(child);
        child = container.lastChild;
    }
}