// listarUsuarios(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.

async function listarUsuarios():Promise<void> {
    const dados_tabela:any = document.getElementById("dados_tabela")
    const apiUrl:string = 'http://127.0.0.1/getall'
    const response:Response = await fetch(apiUrl)
  
    if (!response.ok) {
      alert('Usuários não cadastrados!')
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
      }
    }
  }
  
  // alterarStatus(id): Essa função é chamada quando o status de um usuário é alterado. Ela envia uma solicitação à API para atualizar o status do usuário com o ID fornecido.
  
  async function alterarStatus(id:any):Promise<void> {
    const apiUrl = 'http://10.142.227.72:80/status/' + id
    const response = await fetch(apiUrl)
    if (response.status == 201) {
      console.log('Status alterado!')
    }
    location.reload() //atualiza a página atual no navegador
  }
  
  // enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
  
  async function enviarDados(event:any):Promise<boolean> {
    alert("Chegamos aqui - chamou a fuçao")
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
    alert("Chegamos aqui - preventDefault")
    
    const formData:FormData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
    alert("Chegamos aqui - formData") 
    const response:Response = await fetch('http://10.142.227.72:80/novo', {
      method: 'POST',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Usuário cadastrado com sucesso!')
      window.location.href = "home.html"
      return true
    } else if (response.status == 409) {
      alert('Usuário já tem cadastro!')
      return false
    } else {
      alert('Falha ao cadastrar! Fale com o suporte')
      return false
    }
  }
  
  // validaCPF(): Esta função é utilizada para validar o CPF inserido em um campo de formulário. Ela verifica se o CPF possui apenas números e se possui 11 caracteres.
  
  function validaSenha():boolean {
    const senha:any = document.getElementById('senha').value
    const user:any = document.getElementById('user').value
    const email:any = document.getElementById('email').value

    // Verifica se a senha é forte
    if (senha.length < 8) {
      alert("A senha precisa ter, pelo menos, 8 dígitos!")
      return false
    } else if(senha == user){
        alert("Sua senha não pode ser igual a seu nome de usuário!")
        return false
    } else if(senha == email){
        alert("Sua senha não pode ser igual a seu email!")
        return false
    } else if(!senha.match(/[a-z]/) && !senha.match(/[A-Z]/)){
        alert("Misture letras maiúsculas e minúsculas!")
        return false
    } else if(!senha.match(/\d/)){
        alert("Coloque pelo menos um número!")
        return false
    } else if(!senha.match(/[^a-zA-Z\d]/)){
        alert("Inclua pelo menos um caractere especial!")
        return false
    } else{
        // Retorna true se o CPF for válido
        return true
    }
  }
  
  // verificarUsuario(): Essa função verifica se um usuário com o CPF fornecido está cadastrado no sistema. Ela faz uma solicitação à API para obter informações sobre o usuário e exibe uma mensagem dependendo do status do usuário (ativo ou bloqueado).
  let logado:boolean = false
  let username:string = ""
  async function verificarUsuario():Promise<void> {
    try {
      const email_usuario:any = document.getElementById('email').value.trim()
      const senha_usuario:any = document.getElementById('senha').value.trim()
      const formData:FormData = new FormData(document.getElementById('formulario'))
      const response:Response = await fetch('http://10.142.227.72:80/login', {
      method: 'POST',
      body: formData
    })
      if (!response.ok) {
        alert('Usuário não encontrado!')
      }
      else {
        const data:Response = await response.json()
        logado = true
        username = data.user
        
  
        setTimeout(() => {
            window.location.href = "home.html" //Recarrega a página
        }, 2000)
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // editaUsuario(cpf): Esta função é chamada quando o usuário seleciona a opção de editar um usuário. Ela redireciona o usuário para uma página de edição com o CPF do usuário como parâmetro na URL.
  
  async function editaUsuario(cpf:any):Promise<void> {
    const urlEditar:string = `edicao.html?username=${username}+logado?=${logado}`
    window.location.href = urlEditar //permite redirecionar o navegador para o URL fornecido
  }
  
  // editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
  
  async function editarUsuario(cpf:any):Promise<void> {
    try {
      const cpf_usuario:any = cpf
      const apiUrl:string = 'http://127.0.0.1/' + cpf_usuario
      const response:Response = await fetch(apiUrl)
  
      if (!response.ok) {
        alert('Usuário não encontrado!')
      }
      else {
        const data:any = await response.json()
        const nome:any = data.nome
        const cpf:any = data.cpf
        const id:any = data.id
  
        document.getElementById("nome").value = nome
        document.getElementById("cpf").value = cpf
        document.getElementById("id").value = id
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
  
  async function alterarDados(event:any):Promise<boolean>{
    event.preventDefault() 
  
    const id:any = document.getElementById("id").value
    const apiUrl:string = 'http://10.142.227.72:80/editar/' + id
    const formData:FormData = new FormData(document.getElementById('formulario'))
    const response:Response = await fetch(apiUrl, {
      method: 'PUT',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Usuário alterado com sucesso!')
      window.location.href = "gestao.html"
      return true
    } else {
      alert('Falha ao alterar! Fale com o suporte')
      return false
    }
  }
  
  // excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
  
  async function excluir(id){
    const apiUrl = 'http://10.142.227.72:80/deletar/' + id
    const response = await fetch(apiUrl,{method:'DELETE'})
  
    if (response.status == 200) {
      alert('Usuário deletado com sucesso!')
      window.location.href = "gestao.html"
      return true
    } else {
      alert('Falha ao excluir! Fale com o suporte')
      return false
    }
  }