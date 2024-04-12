from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

usuarios = [
]
chamados = []

# Rota para listar todos os usuários
@app.route('/getall', methods=['GET'])
def lista_usuarios():
    if usuarios:
      return jsonify(usuarios)
    else:
      return jsonify({"error":"Nenhum usuário cadastrado até o momento"}), 404

# Rota para obter um usuário pelo email
@app.route('/<email>', methods=['GET'])
def get_usuarios(email):
  for usuario in usuarios:
    if usuario['email'] == email:
      return jsonify(usuario)
  return jsonify({"error": "Usuário não encontrado"}), 404

# Rota para obter a lista de chamados
@app.route('/chamado/getall', methods=['GET'])
def get_todos_chamados():
  if chamados:
      return jsonify(chamados)
  else:
      return jsonify({"error": "Nenhum chamado registrado até o momento"}), 404

# Rota para obter uma lista de chamados pelo email
@app.route('/chamado/<email>', methods=['GET'])
def get_chamado(email):
  chamados_cliente = [chamado for chamado in chamados if chamado['email'] == email]
  if chamados_cliente:
      return jsonify(chamados_cliente)
  else:
      return jsonify({"error": "Nenhum chamado encontrado para este cliente"}), 404

# Rota para obter um usuário pelo código
@app.route('/login', methods=['POST'])
def get_login():
  email_usuario = request.form['email']
  senha_usuario = request.form['senha']
  for usuario in usuarios:
    if usuario['email'] == email_usuario and usuario['senha'] == senha_usuario:
      return jsonify(usuario)
  return jsonify({"error": "Usuário não encontrado"}), 404


def tem_simbolo(string):
  simbolos = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']
  for letra in string:
      if letra in simbolos:
          return True
      
def verifique_senha(string):
    if (string.islower() == True) or (string.isupper() == True) or (any(s.isdigit() for s in string)==False) or (any(l.isalpha() for l in string)==False) or (tem_simbolo(string) is not True) or (string.count(" ")>0):
        return False
    else:
        return True
    
# Rota para adicionar um novo usuário
@app.route('/novo', methods=['POST'])
def add_usuario():
    nome_usuario = request.form.get('user')
    email_usuario = request.form.get('email')
    telefone_usuario = request.form.get('telefone')
    senha_usuario = request.form.get('senha')
    
    # Verifica se todos os campos necessários estão presentes no formulário
    required_fields = ['user', 'email', 'telefone', 'senha']
    for field in required_fields:
        if field not in request.form:
            return jsonify({'message': f'Campo "{field}" ausente no formulário'}), 400
    
    for usuario in usuarios:
        if usuario['email'] == email_usuario:
            return jsonify({"message": "Usuário já tem cadastro!"}), 409
    
    # Verifica a validade da senha
    if len(senha_usuario) < 8:
        return jsonify({"message": "A senha precisa ter, pelo menos, 8 dígitos!"}), 409
    elif not verifique_senha(senha_usuario):
        if senha_usuario.islower():
            return jsonify({"message": "Faltam letras maiúsculas"}), 400
        if senha_usuario.isupper():
            return jsonify({"message": "Faltam letras minúsculas"}), 400
        if not any(s.isdigit() for s in senha_usuario):
            return jsonify({"message": "Faltam números!"}), 400
        if not any(l.isalpha() for l in senha_usuario):
            return jsonify({"message": "Faltam letras"}), 400
        if not tem_simbolo(senha_usuario):
            return jsonify({"message": "Faltam símbolos!"}), 400
        if ' ' in senha_usuario:
            return jsonify({"message": "Remova os espaços"}), 400
    
    id = len(usuarios) + 1
    novo_usuario = {"id": id, "email": email_usuario, "user": nome_usuario, "telefone": telefone_usuario, "senha":senha_usuario}
    usuarios.append(novo_usuario)
    return jsonify({"message": "Usuário cadastrado"}), 201

    
# Rota para adicionar um novo chamado
@app.route('/novochamado', methods=['POST'])
def add_chamado():
    # Verifica se todos os campos necessários estão presentes no formulário
    required_fields = ['user', 'email', 'telefone', 'dia', 'hora', 'setor', 'problema', 'detalhes', 'resposta','status']
    for field in required_fields:
        if field not in request.form:
            return jsonify({'message': f'Campo "{field}" ausente no formulário'}), 400

    nome_chamado = request.form['user']
    email_chamado = request.form['email']
    telefone_chamado = request.form['telefone']
    dia_chamado = request.form['dia']
    hora_chamado = request.form['hora']
    setor_chamado = request.form['setor']
    problema_chamado = request.form['problema']
    detalhes_chamado = request.form['detalhes']
    resposta_chamado = request.form['resposta']
    status_chamado = request.form['status']

    for chamado in chamados:
        if chamado['problema'] == problema_chamado and chamado['detalhes'] == detalhes_chamado and chamado['email'] == email_chamado:
            return jsonify({'message': 'Chamado já foi registrado. Verificaremos o problema assim que possível.'}), 409

    id = len(chamados) + 1
    novo_chamado = {
        "id": id,
        "user": nome_chamado,
        "email": email_chamado,
        "telefone": telefone_chamado,
        "dia": dia_chamado,
        "hora": hora_chamado,
        "setor": setor_chamado,
        "problema": problema_chamado,
        "detalhes": detalhes_chamado,
        "resposta": resposta_chamado,
        "status": status_chamado
    }
    chamados.append(novo_chamado)
    return jsonify({"message": "Chamado registrado com sucesso.", "id": id}), 201

# Rota para alterar status do usuário
@app.route('/status/<int:id>')
def edt_status(id):
  for usuario in usuarios:
    if usuario['id'] == id:
      if usuario['ativo'] == True:
        usuario['ativo'] = False
      else:
        usuario['ativo'] = True
  return jsonify({"message": "Status alterado"}), 201      

# # Rota para alterar informações do usuário
# @app.route('/editar/<int:id>', methods=['PUT'])
# def alterar(id):
#   nome_usuario = request.form['nome']
#   cpf_usuario = int(request.form['cpf'])
#   for usuario in usuarios:
#     if usuario['id'] == id:
#       usuario['nome']=nome_usuario
#       usuario['cpf']=cpf_usuario
#   return jsonify({"message": "Alterações realizadas"}), 201

# # Rota para excluir um usuário
# @app.route('/deletar/<int:id>', methods=['DELETE'])
# def deletar_usuario(id):
#   for usuario in usuarios:
#     if usuario['id'] == id:
#       usuarios.remove(usuario)
#       return jsonify({'message': 'Usuário deletado com sucesso'}), 200
#   else:
#     return jsonify({'error': 'Usuário não encontrado'}), 404
          
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)