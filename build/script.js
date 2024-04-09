// listarUsuarios(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function listarUsuarios() {
    return __awaiter(this, void 0, void 0, function () {
        var dados_tabela, apiUrl, response, data, _i, data_1, item, linha, id, nome, cpf, ativo, editar, excluir_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dados_tabela = document.getElementById("dados_tabela");
                    apiUrl = 'http://127.0.0.1/getall';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    alert('Usuários não cadastrados!');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                        item = data_1[_i];
                        linha = document.createElement("tr") //cria uma nova linha
                        ;
                        id = document.createElement("td") //cria uma nova coluna
                        ;
                        nome = document.createElement("td");
                        cpf = document.createElement("td");
                        ativo = document.createElement("td");
                        editar = document.createElement("td");
                        excluir_1 = document.createElement("td");
                        id.textContent = item.id;
                        nome.textContent = item.nome;
                        cpf.textContent = item.cpf;
                        if (item.ativo == true) {
                            ativo.innerHTML = "<button onclick='alterarStatus(".concat(item.id, ")'>Ativo</button>");
                        }
                        else {
                            ativo.innerHTML = "<button onclick='alterarStatus(".concat(item.id, ")'>Bloqueado</button>");
                        }
                        editar.innerHTML = "<button onclick='editaUsuario(".concat(item.cpf, ")'>Editar</button>");
                        excluir_1.innerHTML = "<button onclick='excluir(".concat(item.id, ")'>Excluir</button>");
                        linha.appendChild(id); //adiciona a coluna id como filha do elemento de linha
                        linha.appendChild(nome);
                        linha.appendChild(cpf);
                        linha.appendChild(ativo);
                        linha.appendChild(editar);
                        linha.appendChild(excluir_1);
                        dados_tabela.appendChild(linha); //adiciona a linha como filha do elemento dados_tabela
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// alterarStatus(id): Essa função é chamada quando o status de um usuário é alterado. Ela envia uma solicitação à API para atualizar o status do usuário com o ID fornecido.
function alterarStatus(id) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://10.142.227.72:80/status/' + id;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (response.status == 201) {
                        console.log('Status alterado!');
                    }
                    location.reload(); //atualiza a página atual no navegador
                    return [2 /*return*/];
            }
        });
    });
}
// enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
function enviarDados(event) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    alert("Chegamos aqui - chamou a fuçao")
                    event.preventDefault(); //método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
                    formData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML 
                    alert("Chegamos aqui - preventDefault")
                    ;
                    return [4 /*yield*/, fetch('http://10.142.227.72:80/novo', {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    alert("Chegamos aqui - formData")
                    response = _a.sent();
                    if (response.status == 201) {
                        alert('Usuário cadastrado com sucesso!');
                        window.location.href = "home.html";
                        return [2 /*return*/, true];
                    }
                    else if (response.status == 409) {
                        alert('Usuário já tem cadastro!');
                        return [2 /*return*/, false];
                    }
                    else {
                        alert('Falha ao cadastrar! Fale com o suporte');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// validaCPF(): Esta função é utilizada para validar o CPF inserido em um campo de formulário. Ela verifica se o CPF possui apenas números e se possui 11 caracteres.
function validaSenha() {
    var senha = document.getElementById('senha').value;
    var user = document.getElementById('user').value;
    var email = document.getElementById('email').value;

    // Verifica se a senha é forte
    if (senha.length < 8) {
        alert("A senha precisa ter, pelo menos, 8 dígitos!");
        return false;
    }
    else if (senha == user) {
        alert("Sua senha não pode ser igual a seu nome de usuário!");
        return false;
    }
    else if (senha == email) {
        alert("Sua senha não pode ser igual a seu email!");
        return false;
    }
    else if (!senha.match(/[a-z]/) && !senha.match(/[A-Z]/)) {
        alert("Misture letras maiúsculas e minúsculas!");
        return false;
    }
    else if (!senha.match(/\d/)) {
        alert("Coloque pelo menos um número!");
        return false;
    }
    else if (!senha.match(/[^a-zA-Z\d]/)) {
        alert("Inclua pelo menos um caractere especial!");
        return false;
    }
    else {
        // Retorna true se o CPF for válido
        return true;
    }
}
// verificarUsuario(): Essa função verifica se um usuário com o CPF fornecido está cadastrado no sistema. Ela faz uma solicitação à API para obter informações sobre o usuário e exibe uma mensagem dependendo do status do usuário (ativo ou bloqueado).
var logado = false;
var username = "";
function verificarUsuario() {
    return __awaiter(this, void 0, void 0, function () {
        var email_usuario, senha_usuario, formData, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    email_usuario = document.getElementById('email').value.trim();
                    senha_usuario = document.getElementById('senha').value.trim();
                    formData = new FormData(document.getElementById('formulario'));
                    return [4 /*yield*/, fetch('http://10.142.227.72:80/login', {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    alert('Usuário não encontrado!');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    username = data.user;
                    logado = true;
                    setTimeout(function () {
                        window.location.href = "home.html"; //Recarrega a página
                    }, 2000);
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// editaUsuario(cpf): Esta função é chamada quando o usuário seleciona a opção de editar um usuário. Ela redireciona o usuário para uma página de edição com o CPF do usuário como parâmetro na URL.
function editaUsuario(cpf) {
    return __awaiter(this, void 0, void 0, function () {
        var urlEditar;
        return __generator(this, function (_a) {
            urlEditar = "edicao.html?cpf=".concat(cpf);
            window.location.href = urlEditar; //permite redirecionar o navegador para o URL fornecido
            return [2 /*return*/];
        });
    });
}
// editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
function editarUsuario(cpf) {
    return __awaiter(this, void 0, void 0, function () {
        var cpf_usuario, apiUrl, response, data, nome, cpf_1, id, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    cpf_usuario = cpf;
                    apiUrl = 'http://127.0.0.1/' + cpf_usuario;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    alert('Usuário não encontrado!');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    nome = data.nome;
                    cpf_1 = data.cpf;
                    id = data.id;
                    document.getElementById("nome").value = nome;
                    document.getElementById("cpf").value = cpf_1;
                    document.getElementById("id").value = id;
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
function alterarDados(event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, apiUrl, formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    id = document.getElementById("id").value;
                    apiUrl = 'http://10.142.227.72:80/editar/' + id;
                    formData = new FormData(document.getElementById('formulario'));
                    return [4 /*yield*/, fetch(apiUrl, {
                            method: 'PUT',
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status == 201) {
                        alert('Usuário alterado com sucesso!');
                        window.location.href = "gestao.html";
                        return [2 /*return*/, true];
                    }
                    else {
                        alert('Falha ao alterar! Fale com o suporte');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
function excluir(id) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://10.142.227.72:80/deletar/' + id;
                    return [4 /*yield*/, fetch(apiUrl, { method: 'DELETE' })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        alert('Usuário deletado com sucesso!');
                        window.location.href = "gestao.html";
                        return [2 /*return*/, true];
                    }
                    else {
                        alert('Falha ao excluir! Fale com o suporte');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
