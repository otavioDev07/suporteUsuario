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
function listarChamadosUser(email, login) {
    return __awaiter(this, void 0, void 0, function () {
        var listaChamados, apiUrl, response, data_2, _i, data_1, item, cardTitle, cardTitle, cards;
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
                    data_2 = _a.sent();
                    listaChamados.innerHTML = "";
                    for (_i = 0, data_1 = data_2; _i < data_1.length; _i++) {
                        item = data_1[_i];
                        listaChamados.innerHTML += "<div style=\"cursor: pointer\" class=\"cartinha col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 m-3\"><div class=\"card text-center bg-light\"><div id=\"".concat(item.id, "\" class=\"card-header fs-3 text-danger\">").concat(item.problema, "</div><div class=\"card-body\"><h5 class=\"card-title\"></h5><div class=\"d-flex justify-content-between\"><p class=\"card-subtitle mb-2 text-body-secondary\">").concat(item.user, "</p><p class=\"card-subtitle mb-2 text-body-secondary\">").concat(item.telefone, "</p></div><div class=\"d-flex flex-column justify-content-between\"><p class=\"card-subtitle mb-2 text-body-secondary col-12\">").concat(item.setor, "</p><p class=\"card-subtitle mb-2 text-body-secondary col-12\">").concat(item.dia, " - ").concat(item.hora, "</p></div></div></div></div>"); //adiciona card com informações do chamado 
                        if (item.status == "Fechado") {
                            cardTitle = document.getElementById("".concat(item.id));
                            cardTitle.classList.remove('text-danger');
                            cardTitle.classList.add('text-success');
                        }
                        else {
                            cardTitle = document.getElementById("".concat(item.id));
                            cardTitle.classList.remove('text-success');
                            cardTitle.classList.add('text-danger');
                        }
                    }
                    cards = document.querySelectorAll('.cartinha');
                    cards.forEach(function (card, index) {
                        card.addEventListener('click', function () {
                            var item = data_2[index];
                            window.location.href = "detalhe.html?id=".concat(item.id, "&userEmail=").concat(email, "&logado=").concat(login);
                        });
                    });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function enviarChamado(event) {
    return __awaiter(this, void 0, void 0, function () {
        var user, email, telefone, setor, problema, detalhes, apiUrl, Getresponse, data, username, userphone, formData, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault(); //método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
                    user = document.getElementById("user");
                    email = document.getElementById("email");
                    telefone = document.getElementById("telefone");
                    setor = document.getElementById("setor");
                    problema = document.getElementById("problema");
                    detalhes = document.getElementById("detalhes");
                    if (!(setor.value.trim() == "" || problema.value.trim() == "" || detalhes.value.trim() == "")) return [3 /*break*/, 1];
                    alert("Não deixe campos em branco!");
                    return [3 /*break*/, 7];
                case 1:
                    apiUrl = 'http://127.0.0.1:80/' + email.value;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    Getresponse = _a.sent();
                    if (!!Getresponse.ok) return [3 /*break*/, 3];
                    alert('Usuário não encontrado!');
                    window.location.href = "../../login.html";
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Getresponse.json()];
                case 4:
                    data = _a.sent();
                    username = data.user;
                    userphone = data.telefone;
                    user.value = username;
                    telefone.value = userphone;
                    _a.label = 5;
                case 5:
                    formData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
                    ;
                    return [4 /*yield*/, fetch('http://127.0.0.1:80/novochamado', {
                            method: 'POST',
                            body: formData
                        })];
                case 6:
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
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
function preencherHome(userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var username, apiUrl, response, data, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(logado == false)) return [3 /*break*/, 1];
                    window.location.href = "../../login.html";
                    return [3 /*break*/, 5];
                case 1:
                    username = document.getElementById("username");
                    apiUrl = 'http://127.0.0.1:80/' + userEmail;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    alert('Usuário não encontrado!');
                    window.location.href = "../../login.html";
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    user = data.user;
                    username.innerText = "Bem-vindo, ".concat(user, "!");
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Preenche a página do Chamado
function preencherDetalhe(id, userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var buttons, pencilButton, problemaTxt, statusTxt, usuarioTxt, telefoneTxt, setorTxt, diaTxt, detalhesTxt, diaRespostaTxt, respostaTxt, apiUrl, response, data, user, email, telefone, dia, hora, diaResposta, horaResposta, setor, problema, detalhes, resposta, status_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    if (!(logado == false)) return [3 /*break*/, 1];
                    window.location.href = "../../login.html";
                    return [3 /*break*/, 5];
                case 1:
                    buttons = document.getElementById('buttons');
                    pencilButton = document.getElementById('pencilButton');
                    problemaTxt = document.getElementById("problemaTxt");
                    statusTxt = document.getElementById('statusTxt');
                    usuarioTxt = document.getElementById("usuarioTxt");
                    telefoneTxt = document.getElementById("telefoneTxt");
                    setorTxt = document.getElementById('setorTxt');
                    diaTxt = document.getElementById('diaTxt');
                    detalhesTxt = document.getElementById('detalhesTxt');
                    diaRespostaTxt = document.getElementById('diaRespostaTxt');
                    respostaTxt = document.getElementById('repostaTxt');
                    apiUrl = 'http://127.0.0.1:80/chamadoid/' + id;
                    return [4 /*yield*/, fetch(apiUrl)];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    alert('Chamado não encontrado!');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    user = data.user;
                    email = data.email;
                    telefone = data.telefone;
                    dia = data.dia;
                    hora = data.hora;
                    diaResposta = data.diaResposta;
                    horaResposta = data.horaResposta;
                    setor = data.setor;
                    problema = data.problema;
                    detalhes = data.detalhes;
                    resposta = data.resposta;
                    status_1 = data.status;
                    problemaTxt.innerText = problema;
                    if (status_1 == "Em Aberto") {
                        statusTxt.innerText = status_1;
                        statusTxt.classList.remove('bg-success');
                        statusTxt.classList.add('bg-danger');
                    }
                    else {
                        statusTxt.innerText = status_1;
                        statusTxt.classList.remove('bg-danger');
                        statusTxt.classList.add('bg-success');
                    }
                    usuarioTxt.innerText = user;
                    telefoneTxt.innerText = telefone;
                    setorTxt.innerText = setor;
                    diaTxt.innerText = "".concat(dia, " - ").concat(hora);
                    detalhesTxt.innerText = detalhes;
                    if (resposta.trim() == "" || !resposta) {
                        respostaTxt.innerText = "A equipe de TI ainda não comentou esse chamado.";
                        diaRespostaTxt.style.display = 'none';
                    }
                    else {
                        respostaTxt.innerText = resposta;
                        diaRespostaTxt.style.display = "block";
                        diaRespostaTxt.innerText = "".concat(diaResposta, " - ").concat(horaResposta);
                    }
                    if (userEmail == email) {
                        buttons.style.display = 'flex';
                        if (status_1 == "Fechado") {
                            pencilButton.style.display = 'none';
                        }
                        else {
                            pencilButton.style.display = 'block';
                        }
                    }
                    else {
                        buttons.style.display = 'none';
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
function preencherEdicao(id, userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response, data, email_chamado, setor_chamado, problema_chamado, detalhes_chamado, id_chamado, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    apiUrl = 'http://127.0.0.1/chamadoid/' + id;
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
                    error_3 = _a.sent();
                    console.error("API com problemas!");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
function alterarChamado(event, id, userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, formData, response, urlEditar, urlEditar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    apiUrl = 'http://127.0.0.1:80/editar/' + id;
                    formData = new FormData(document.getElementById('formulario'));
                    return [4 /*yield*/, fetch(apiUrl, {
                            method: 'PUT',
                            body: formData
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status == 201) {
                        alert('Chamado alterado com sucesso!');
                        urlEditar = "home.html?userEmail=".concat(userEmail, "&logado=").concat(logado);
                        window.location.href = urlEditar;
                        return [2 /*return*/, true];
                    }
                    else {
                        alert('Falha ao alterar! Fale com o suporte');
                        urlEditar = "home.html?userEmail=".concat(userEmail, "&logado=").concat(logado);
                        window.location.href = urlEditar;
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
function excluir(id, userEmail, logado) {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response, urlEditar, urlEditar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = 'http://127.0.0.1:80/deletar/' + id;
                    return [4 /*yield*/, fetch(apiUrl, { method: 'DELETE' })];
                case 1:
                    response = _a.sent();
                    if (response.status == 200) {
                        alert('Chamado deletado com sucesso!');
                        urlEditar = "home.html?userEmail=".concat(userEmail, "&logado=").concat(logado);
                        window.location.href = urlEditar;
                        return [2 /*return*/, true];
                    }
                    else {
                        alert('Falha ao excluir! Fale com o suporte');
                        urlEditar = "home.html?userEmail=".concat(userEmail, "&logado=").concat(logado);
                        window.location.href = urlEditar;
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
