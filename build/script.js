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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    adm_1 = document.getElementById("adm").value;
                    formData = new FormData(document.getElementById('formulario'));
                    return [4 /*yield*/, fetch('http://127.0.0.1:80/login', {
                            method: 'POST',
                            body: formData
                        })];
                case 2:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    alert('Usuário não encontrado!');
                    window.location.href = "login.html";
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    logado = true;
                    loginEmail = data.email;
                    setTimeout(function () {
                        if (adm_1 != "Adm#123") {
                            var urlEditar = "./user/home.html?userEmail=".concat(loginEmail, "&logado=").concat(logado);
                            window.location.href = urlEditar;
                        }
                        else {
                            var urlEditar = "./adm/gestao.html?userEmail=".concat(loginEmail, "&logado=").concat(logado);
                            window.location.href = urlEditar;
                        }
                    }, 2000);
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
