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
var logado = false;
var loginEmail = "";
// listarUsuariosGestao(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.
function listarChamadosGestao() {
    return __awaiter(this, void 0, void 0, function () {
        var listaChamados, apiUrl, response, data, _i, data_1, item, cardResposta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listaChamados = document.getElementById("listaChamados");
                    apiUrl = 'http://127.0.0.1:80/chamado/getall';
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>";
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    listaChamados.innerHTML = "";
                    for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                        item = data_1[_i];
                        listaChamados.innerHTML += "<div class=\"card col-12 col-lg-3 mx-2\"><div class=\"card-body\"><h5 id=\"cardProblema\" class=\"card-title\">".concat(item.problema, "</h5><div class=\"d-flex justify-content-between\"><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.user, "</h6><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.telefone, "</h6><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.setor, "</h6><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.dia, " - ").concat(item.hora, "</h6></div><p class=\"card-text\">").concat(item.detalhes, "</p><div id=\"cardResposta\"></div></div></div>"); //adiciona card com informações do chamado
                        cardResposta = document.getElementById("cardResposta");
                        if (item.resposta.trim() != "") {
                            cardResposta.innerHTML += "\n          <hr>\n          <h5 class=\"card-title\">Resposta</h5>\n          <p class=\"card-text\">".concat(item.resposta, "</p>\n        ");
                        }
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function listarChamadosUser(email) {
    return __awaiter(this, void 0, void 0, function () {
        var listaChamados, apiUrl, response, data, _i, data_2, item, cardResposta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listaChamados = document.getElementById("listaChamados");
                    apiUrl = 'http://127.0.0.1:80/chamado/' + email;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>";
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    listaChamados.innerHTML = "";
                    for (_i = 0, data_2 = data; _i < data_2.length; _i++) {
                        item = data_2[_i];
                        listaChamados.innerHTML += "<div onclick=\"editaChamado(".concat(item.id, ")\" style=\"cursor: pointer\" class=\"card col-12 col-lg-3 mx-2\"><div class=\"card-body\"><h5 id=\"cardProblema\" class=\"card-title\">").concat(item.problema, "</h5><div class=\"d-flex justify-content-between\"><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.user, "</h6><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.telefone, "</h6><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.setor, "</h6><h6 class=\"card-subtitle mb-2 text-body-secondary\" style=\"font-size: 8px;\">").concat(item.dia, " - ").concat(item.hora, "</h6></div><p class=\"card-text\">").concat(item.detalhes, "</p><div id=\"cardResposta\"></div></div></div>"); //adiciona card com informações do chamado
                        cardResposta = document.getElementById("cardResposta");
                        if (item.resposta.trim() != "") {
                            cardResposta.innerHTML += "\n          <hr>\n          <h5 class=\"card-title\">Resposta</h5>\n          <p class=\"card-text\">".concat(item.resposta, "</p>\n        ");
                        }
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
function enviarDados(event) {
    return __awaiter(this, void 0, void 0, function () {
        var formData, response, responseData // Declaração da variável responseData
        , error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    formData = new FormData(document.getElementById('formulario'));
                    return [4 /*yield*/, fetch('http://127.0.0.1:80/novo', {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData = _a.sent(); // Extrai o corpo da resposta JSON
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error('Erro ao processar a resposta JSON:', error_1);
                    return [2 /*return*/, false];
                case 5:
                    if (response.status === 201) {
                        alert('Usuário cadastrado com sucesso!');
                        window.location.href = "login.html";
                        return [2 /*return*/, true];
                    }
                    else if (response.status === 409) {
                        alert('Usuário já tem cadastro!');
                        return [2 /*return*/, false];
                    }
                    else if (response.status === 400) { // Se o status for 400, exibe a mensagem retornada pelo servidor
                        alert(responseData.message); // Exibe a mensagem retornada pelo servidor
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
function enviarChamado(event) {
    return __awaiter(this, void 0, void 0, function () {
        var user, email, telefone, apiUrl, Getresponse, data, username, userphone, formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault(); //método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
                    user = document.getElementById("user");
                    email = document.getElementById("email");
                    telefone = document.getElementById("telefone");
                    apiUrl = 'http://127.0.0.1:80/' + email.value;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    Getresponse = _a.sent();
                    if (!!Getresponse.ok) return [3 /*break*/, 2];
                    alert('Usuário não encontrado!');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, Getresponse.json()];
                case 3:
                    data = _a.sent();
                    username = data.user;
                    userphone = data.telefone;
                    user.value = username;
                    telefone.value = userphone;
                    _a.label = 4;
                case 4:
                    formData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
                    ;
                    return [4 /*yield*/, fetch('http://127.0.0.1:80/novochamado', {
                            method: 'POST',
                            body: formData
                        })];
                case 5:
                    response = _a.sent();
                    if (response.status == 201) {
                        alert('Chamado registrado com sucesso!');
                        window.location.reload();
                        return [2 /*return*/, true];
                    }
                    else if (response.status == 409) {
                        alert('Chamado já tem registro!');
                        return [2 /*return*/, false];
                    }
                    else {
                        alert('Falha ao registrar! Fale com o suporte');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function enviarChamadoAdm(event) {
    return __awaiter(this, void 0, void 0, function () {
        var dia, hora, date, formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault(); //método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
                    dia = document.getElementById("dia");
                    hora = document.getElementById("hora");
                    date = new Date();
                    dia.value = date.toLocaleDateString();
                    hora.value = date.toLocaleTimeString();
                    formData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
                    ;
                    return [4 /*yield*/, fetch('http://127.0.0.1:80/novochamado', {
                            method: 'POST',
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status == 201) {
                        alert('Chamado registrado com sucesso!');
                        window.location.reload();
                        return [2 /*return*/, true];
                    }
                    else if (response.status == 409) {
                        alert('Chamado já tem registro!');
                        return [2 /*return*/, false];
                    }
                    else {
                        alert('Falha ao registrar! Fale com o suporte');
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function validaAdm() {
    var adm = document.getElementById('adm').value;
    // Verifica se a chave de acesso para administração está correta
    if (adm != "Adm#123") {
        alert("Senha incorreta!");
        return false;
    }
    else {
        // Retorna true se a chave de acesso para administração for válida
        return true;
    }
}
//LiberarAdm(): função que torna o input Adm visível
function liberarAdm() {
    var admCampo = document.getElementById("admCampo");
    admCampo.style.display = "block";
}
// verificarUsuario(): Essa função verifica se um usuário com o CPF fornecido está cadastrado no sistema. Ela faz uma solicitação à API para obter informações sobre o usuário e exibe uma mensagem dependendo do status do usuário (ativo ou bloqueado).
function verificarUsuario(event) {
    return __awaiter(this, void 0, void 0, function () {
        var adm_1, formData, response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    _a.trys.push([0, 5, , 6]);
                    adm_1 = document.getElementById("adm").value;
                    alert(adm_1)
                    formData = new FormData(document.getElementById('formulario'));
                    return [4 /*yield*/, fetch('http://127.0.0.1:80/login', {
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
                    logado = true;
                    loginEmail = data.email;
                    setTimeout(function () {
                        if (adm_1 != "Adm#123") {
                            var urlEditar = "home.html?userEmail=".concat(loginEmail, "&logado=").concat(logado);
                            window.location.href = urlEditar;
                        }
                        else {
                            var urlEditar = "gestao.html?userEmail=".concat(loginEmail, "&logado=").concat(logado);
                            window.location.href = urlEditar;
                        }
                    }, 2000);
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
function preencherHome(userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var username, apiUrl, response, data, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(logado == false)) return [3 /*break*/, 1];
                    window.location.href = "login.html";
                    return [3 /*break*/, 5];
                case 1:
                    username = document.getElementById("username");
                    apiUrl = 'http://127.0.0.1:80/' + userEmail;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    alert('Usuário não encontrado!');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    user = data.user;
                    username.innerText = "Bem-vindo, ".concat(user, "!");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Envia para a página de edição
function editaChamado(id, userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var urlEditar;
        return __generator(this, function (_a) {
            urlEditar = "edicao.html?id=".concat(id, "+useremail=").concat(userEmail, "+logado=").concat(logado);
            window.location.href = urlEditar; //permite redirecionar o navegador para o URL fornecido
            return [2 /*return*/];
        });
    });
}
// editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
function editarChamado(id, userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response, data, email_chamado, setor_chamado, problema_chamado, detalhes_chamado, id_chamado, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    apiUrl = 'http://127.0.0.1/chamado/' + id;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 2];
                    alert('Chamado não encontrado!');
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    email_chamado = data.email;
                    setor_chamado = data.setor;
                    problema_chamado = data.problema;
                    detalhes_chamado = data.detalhes;
                    id_chamado = data.id;
                    document.getElementById("setor").value = setor_chamado;
                    document.getElementById("problema").value = problema_chamado;
                    document.getElementById("detalhes").value = detalhes_chamado;
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
function alterarChamados(event) {
    return __awaiter(this, void 0, void 0, function () {
        var id, apiUrl, formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    id = document.getElementById("id").value;
                    apiUrl = 'http://127.0.0.1:80/editar/' + id;
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
                    apiUrl = 'http://127.0.0.1:80/deletar/' + id;
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
/*
async function listarChamadosGestao():Promise<void> {
  const listaChamados:any = document.getElementById("listaChamados")
  const apiUrl:string = 'http://127.0.0.1/getall'
  const response:Response = await fetch(apiUrl)

  if (!response.ok) {
    listaChamados.innerHTML = "<h2>Não há chamados cadastrados</h2>"
  }
  else {
    const data:any = await response.json()
    for (const item of data) {
      
      const linha:any = document.createElement("tr") //cria uma nova linha
      const id:any = document.createElement("td") //cria uma nova coluna
      const nome:any = document.createElement("td")
      const cpf:any = document.createElement("td")
      const ativo:any = document.createElement("td")
      const editar:any = document.createElement("td")
      const excluir:any = document.createElement("td")

      id.textContent = item.id
      nome.textContent = item.nome
      cpf.textContent = item.cpf

      if (item.ativo == true) {
        ativo.innerHTML = `<button onclick='alterarStatus(${item.id})'>Ativo</button>`
      } else {
        ativo.innerHTML = `<button onclick='alterarStatus(${item.id})'>Bloqueado</button>`
      }

      editar.innerHTML = `<button onclick='editaUsuario(${item.cpf})'>Editar</button>`
      excluir.innerHTML = `<button onclick='excluir(${item.id})'>Excluir</button>`

      linha.appendChild(id) //adiciona a coluna id como filha do elemento de linha
      linha.appendChild(nome)
      linha.appendChild(cpf)
      linha.appendChild(ativo)
      linha.appendChild(editar)
      linha.appendChild(excluir)

      dados_tabela.appendChild(linha) //adiciona a linha como filha do elemento dados_tabela
*/ 
