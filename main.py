from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

usuarios = []

# Rota para listar todos os usuários
@app.route('/getall', methods=['GET'])
def lista_usuarios():
    return jsonify(usuarios)

# Rota para obter um usuário pelo código
@app.route('/<int:cpf>', methods=['GET'])
def get_usuarios(cpf):
  for usuario in usuarios:
    if usuario['cpf'] == cpf:
      return jsonify(usuario)
  return jsonify({"error": "Usuário não encontrado"}), 404

# Rota para adicionar um novo usuário
@app.route('/novo', methods=['POST'])
def add_usuario():
  nome_usuario = request.form['user']
  email_usuario = request.form['email']
  senha_usuario = request.form['senha']
  for usuario in usuarios:
    if usuario['email'] == email_usuario:
      return jsonify({"message": "Usuário já tem cadastro!"}), 409
    else:
        id = len(usuarios) + 1
        novo_usuario = {"id": id, "email": email_usuario, "user": nome_usuario, "senha":senha_usuario}
        usuarios.append(novo_usuario)
        return jsonify({"message": "Usuário cadastrado"}), 201

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

# Rota para alterar informações do usuário
@app.route('/editar/<int:id>', methods=['PUT'])
def alterar(id):
  nome_usuario = request.form['nome']
  cpf_usuario = int(request.form['cpf'])
  for usuario in usuarios:
    if usuario['id'] == id:
      usuario['nome']=nome_usuario
      usuario['cpf']=cpf_usuario
  return jsonify({"message": "Alterações realizadas"}), 201

# Rota para excluir um usuário
@app.route('/deletar/<int:id>', methods=['DELETE'])
def deletar_usuario(id):
  for usuario in usuarios:
    if usuario['id'] == id:
      usuarios.remove(usuario)
      return jsonify({'message': 'Usuário deletado com sucesso'}), 200
  else:
    return jsonify({'error': 'Usuário não encontrado'}), 404
          
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=80)