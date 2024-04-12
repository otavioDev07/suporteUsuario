from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

usuarios = [{
  "user":"Ádillan","email":"adillan.soares@gmail.com","telefone":"15997357821","senha":"#Adillan123"
}]
chamados = []

# Rota para listar todos os usuários
@app.route('/getall', methods=['GET'])
def lista_usuarios():
    return jsonify(usuarios)

# Rota para obter um usuário pelo email
@app.route('/<email>', methods=['GET'])
def get_usuarios(email):
  for usuario in usuarios:
    if usuario['email'] == email:
      return jsonify(usuario)
  return jsonify({"error": "Usuário não encontrado"}), 404

# Rota para obter um usuário pelo email
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

# Rota para adicionar um novo usuário
@app.route('/novo', methods=['POST'])
def add_usuario():
  nome_usuario = request.form['user']
  email_usuario = request.form['email']
  telefone_usuario = request.form['telefone']
  senha_usuario = request.form['senha']
  for usuario in usuarios:
    if usuario['email'] == email_usuario:
      return jsonify({"message": "Usuário já tem cadastro!"}), 409
    else:
        id = len(usuarios) + 1
        novo_usuario = {"id": id, "email": email_usuario, "user": nome_usuario, "telefone": telefone_usuario, "senha":senha_usuario}
        usuarios.append(novo_usuario)
        return jsonify({"message": "Usuário cadastrado"}), 201
    
# Rota para adicionar um novo chamado
@app.route('/novochamado', methods=['POST'])
def add_chamdo():
    # Verifica se todos os campos necessários estão presentes no formulário
    required_fields = ['user', 'email', 'telefone', 'dia', 'hora', 'setor', 'problema', 'detalhes', 'resposta']
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
        "resposta": resposta_chamado
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