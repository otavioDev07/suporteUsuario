let logado:boolean = false
let loginEmail:string = ""
// listarUsuariosGestao(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.

async function listarChamadosGestao():Promise<void> {
    const listaChamados:any = document.getElementById("listaChamados")
    const apiUrl:string = 'http://127.0.0.1/getall'
    const response:Response = await fetch(apiUrl)
  
    if (!response.ok) {
      listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>"
    }
    else {
      const data:any = await response.json()
      for (const item of data) {
        listaChamados.innerHTML = `
        <div class="card col-12 col-lg-4">
        <div class="card-body">
          <h5 id="cardProblema" class="card-title">${item.problema}</h5>
          <div class="d-flex justify-content-between">
            <h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.problema}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.user}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.data} - ${item.hora}</h6>
          </div>
          <p class="card-text">${item.detalhes}</p>
          <div id="cardResposta"></div>
        </div>
      </div>
        ` //adiciona card com informações do chamado
        const cardResposta:any = document.getElementById("cardResposta")
        if(item.resposta){
          cardResposta.innerHTML = `
            <hr>
            <h5 class="card-title">Resposta</h5>
            <p class="card-text">${item.resposta}</p>
          `
        }
      }
    }
  }
  
  // listarUsuariosUser(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.

  async function listarChamadosUser(email: string): Promise<void> {
    const listaChamados:any = 'http://127.0.0.1:80/chamado/' + email;
    const response:Response = await fetch(apiUrl);
    if (!response.ok) {
      listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>";
    } else {
      const data = await response.json();
  
      // Clear listaChamados content before adding new cards
      listaChamados.innerHTML = '';
  
      for (let item of data) {
        const card = createCard(item); // Create the card structure (see below)
        listaChamados.appendChild(card); // Add the card to the listaChamados element
      }
    }
  }
  
  function createCard(item: any) {
    `<div class="card col-12 col-lg-4"><div class="card-body"><h5 id="cardProblema" class="card-title">${item.problema}</h5><div class="d-flex justify-content-between"><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.user}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.data} - ${item.hora}</h6></div><p class="card-text">${item.detalhes}</p><div id="cardResposta"></div></div></div>`
    const cardResposta:any = document.getElementById("cardResposta")
      if(item.resposta.trim() != ""){
        cardResposta.innerHTML = `<hr><h5 class="card-title">Resposta</h5><p class="card-text">${item.resposta}</p>`
      }
  }

async function listarChamadosUser(email:string):Promise<void> {
  const listaChamados:any = document.getElementById("listaChamados")
  const apiUrl:string = 'http://127.0.0.1:80/chamado/' + email
  const response:Response = await fetch(apiUrl)
  if (!response.ok) {
    listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>"
  }
  else {
    const data:any = await response.json()
    for (let item of data) {  
      listaChamados.innerHTML = `<div class="card col-12 col-lg-4"><div class="card-body"><h5 id="cardProblema" class="card-title">${item.problema}</h5><div class="d-flex justify-content-between"><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.user}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.data} - ${item.hora}</h6></div><p class="card-text">${item.detalhes}</p><div id="cardResposta"></div></div></div>` //adiciona card com informações do chamado
      const cardResposta:any = document.getElementById("cardResposta")
      if(item.resposta.trim() != ""){
        cardResposta.innerHTML = `
          <hr>
          <h5 class="card-title">Resposta</h5>
          <p class="card-text">${item.resposta}</p>
        `
      }
    }
  }
}

  // enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
  
  async function enviarDados(event:any):Promise<boolean> {
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
    
    const formData:FormData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
    const response:Response = await fetch('http://127.0.0.1:80/novo', {
      method: 'POST',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Usuário cadastrado com sucesso!')
      window.location.href = "login.html"
      return true
    } else if (response.status == 409) {
      alert('Usuário já tem cadastro!')
      return false
    } else {
      alert('Falha ao cadastrar! Fale com o suporte')
      return false
    }
  }

  async function enviarChamado(event:any):Promise<boolean> {
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
    const user:any = document.getElementById("user")
    const email:any = document.getElementById("email")
    const dia:any = document.getElementById("dia")
    const hora:any = document.getElementById("hora")
    const resposta:any = document.getElementById("resposta")
    const apiUrl:string = 'http://127.0.0.1:80/' + email.value
    const Getresponse:Response = await fetch(apiUrl)
    if (!Getresponse.ok) {
      alert('Usuário não encontrado!')
    }
    else {
      const data:any = await Getresponse.json()
      const username:any = data.user
      user.value = username
    }
    resposta.value = ""
    const date = new Date()
    dia.value = date.toLocaleDateString()
    hora.value = date.toLocaleTimeString()

    const formData:FormData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
    const response:Response = await fetch('http://127.0.0.1:80/novochamado', {
      method: 'POST',
      body: formData
    })
    
    if (response.status == 201) {
      alert('Chamado registrado com sucesso!')
      listarChamadosUser(email.value)
      return true
    } else if (response.status == 409) {
      alert('Chamado já tem registro!')
      return false
    } else {
      alert('Falha ao registrar! Fale com o suporte')
      return false
    }
  }
  
  // validaSenha(): Esta função é utilizada para validar a senha inserida em um campo de formulário. Ela verifica se a senha é forte o suficiente.
  
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

  function validaAdm():boolean {
    const adm:any = document.getElementById('adm').value

    // Verifica se a chave de acesso para administração está correta
    if (adm != "Adm#123") {
      alert("Senha incorreta!")
      return false
    }  else{
        // Retorna true se a chave de acesso para administração for válida
        return true
    }
  }

  //LiberarAdm(): função que torna o input Adm visível
  function LiberarAdm(){
    const admCampo:any = document.getElementById("admCampo")
    admCampo.style.display = "block"
  }
  
  // verificarUsuario(): Essa função verifica se um usuário com o CPF fornecido está cadastrado no sistema. Ela faz uma solicitação à API para obter informações sobre o usuário e exibe uma mensagem dependendo do status do usuário (ativo ou bloqueado).
  async function verificarUsuario():Promise<void> {
    try {
      const adm:any = document.getElementById("adm").value
      const formData:FormData = new FormData(document.getElementById('formulario'))
      const response:Response = await fetch('http://127.0.0.1:80/login', {
      method: 'POST',
      body: formData
    })
      if (!response.ok) {
        alert('Usuário não encontrado!')
      }
      else {
        const data:Response = await response.json()
        logado = true
        loginEmail = data.email
  
        setTimeout(() => {
          if (adm != "Adm#123"){
            const urlEditar:string = `home.html?userEmail=${loginEmail}&logado=${logado}`
            window.location.href = urlEditar
          } else{
            const urlEditar:string = `gestao.html?userEmail=${loginEmail}&logado=${logado}`
            window.location.href = urlEditar
          }
        }, 2000)
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }

  async function preencherHome(userEmail:string,logado:boolean):Promise<void> {
    try {
      if (logado==false){
        window.location.href = "login.html"
      } else{
        const username:any = document.getElementById("username")
        const apiUrl:string = 'http://127.0.0.1:80/' + userEmail
        const response:Response = await fetch(apiUrl)
    
        if (!response.ok) {
          alert('Usuário não encontrado!')
        }
        else {
          const data:any = await response.json()
          const user:any = data.user
    
          username.innerText = `Bem-vindo, ${user}!`
        }
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // editaUsuario(cpf): Esta função é chamada quando o usuário seleciona a opção de editar um usuário. Ela redireciona o usuário para uma página de edição com o CPF do usuário como parâmetro na URL.
  
  async function editaUsuario(userEmail:string,logado:boolean):Promise<void> {
    const urlEditar:string = `edicao.html?userEmail=${userEmail}+logado?=${logado}`
    window.location.href = urlEditar //permite redirecionar o navegador para o URL fornecido
  }
  
  // editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
  
  async function editarUsuario(userEmail:string,logado:boolean):Promise<void> {
    try {
      const nome_usuario:string = username
      const login_usuario:boolean = logado
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
    const apiUrl:string = 'http://127.0.0.1:80/editar/' + id
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
  
  excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
  
  async function excluir(id){
    const apiUrl = 'http://127.0.0.1:80/deletar/' + id
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