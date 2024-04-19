let logado:boolean = false
let loginEmail:string = ""
// listarUsuariosGestao(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.

async function listarChamadosGestao(email:string,login:boolean):Promise<void> {
  const listaChamados:any = document.getElementById("listaChamados")
  const apiUrl:string = 'http://127.0.0.1:80/chamado/getall'
  const response:Response = await fetch(apiUrl)
  if (!response.ok) {
    listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>"
  }
  else {
    const data:any = await response.json()
    listaChamados.innerHTML = ""
    for (let item of data) {  
      listaChamados.innerHTML += `<div style="cursor:pointer" class="card col-12 col-lg-3 mx-2"><div class="card-body"><h5 id="cardProblema" class="card-title">${item.problema}</h5><div class="d-flex justify-content-between"><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.user}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.telefone}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.dia} - ${item.hora}</h6></div><p class="card-text">${item.detalhes}</p></div></div>` //adiciona card com informações do chamado
    }
    const cards = document.querySelectorAll('.card')
      cards.forEach((card, index) => {
        card.addEventListener('click',function(){
          const item = data[index]
          window.location.href = `gestaoDetalhe.html?id=${item.id}&userEmail=${email}&logado=${login}`
        }) 
      })
  }
}

async function listarChamadosUser(email:string,login:boolean):Promise<void> {
  const listaChamados:any = document.getElementById("listaChamados")
  const apiUrl:string = 'http://127.0.0.1:80/chamado/' + email
  const response:Response = await fetch(apiUrl)
  if (!response.ok) {
    listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>"
  }
  else {
    const data:any = await response.json()
    listaChamados.innerHTML = ""
    for (let item of data) {  
      listaChamados.innerHTML += `<div style="cursor: pointer" class="card col-12 col-lg-3 mx-2"><div class="card-body"><h5 id="cardProblema" class="card-title">${item.problema}</h5><div class="d-flex justify-content-between"><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.user}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.telefone}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.setor}</h6><h6 class="card-subtitle mb-2 text-body-secondary" style="font-size: 8px;">${item.dia} - ${item.hora}</h6></div><p class="card-text">${item.detalhes}</p></div></div>` //adiciona card com informações do chamado 
    }
    const cards = document.querySelectorAll('.card')
      cards.forEach((card, index) => {
        card.addEventListener('click',function(){
          const item = data[index]
          window.location.href = `detalhe.html?id=${item.id}&userEmail=${email}&logado=${login}`
        }) 
      })
  }
}


  // enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
  
  async function enviarDados(event:any): Promise<boolean> {
    event.preventDefault();
    
    const formData: FormData = new FormData(document.getElementById('formulario'));
    const response: Response = await fetch('http://127.0.0.1:80/novo', {
        method: 'POST',
        body: formData
    });

    let responseData:Response // Declaração da variável responseData
    
    try {
        responseData = await response.json(); // Extrai o corpo da resposta JSON
    } catch (error) {
        console.error('Erro ao processar a resposta JSON:', error)
        return false
    }

    if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!')
        window.location.href = "login.html"
        return true;
    } else if (response.status === 409) {
        alert('Usuário já tem cadastro!')
        return false;
    } else if (response.status === 400) { // Se o status for 400, exibe a mensagem retornada pelo servidor
        alert(responseData.message) // Exibe a mensagem retornada pelo servidor
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
    const telefone:any = document.getElementById("telefone")
    const apiUrl:string = 'http://127.0.0.1:80/' + email.value
    const Getresponse:Response = await fetch(apiUrl)
    if (!Getresponse.ok) {
      alert('Usuário não encontrado!')
      window.location.href = "login.html"
    }
    else {
      const data:any = await Getresponse.json()
      const username:any = data.user
      const userphone:any = data.telefone
      user.value = username
      telefone.value = userphone
    }
    
    const formData:FormData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
    const response:Response = await fetch('http://127.0.0.1:80/novochamado', {
      method: 'POST',
      body: formData
    })
    
    if (response.status == 201) {
      alert('Chamado registrado com sucesso!')
      window.location.reload()
      return true
    } else if (response.status == 409) {
      alert('Chamado já tem registro!')
      return false
    } else {
      alert('Falha ao registrar! Fale com o suporte')
      return false
    }
  }

  async function enviarChamadoAdm(event:any):Promise<boolean> {
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.

    const formData:FormData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
    const response:Response = await fetch('http://127.0.0.1:80/novochamado', {
      method: 'POST',
      body: formData
    }) 
    
    if (response.status == 201) {
      alert('Chamado registrado com sucesso!')
      window.location.reload()
      return true
    } else if (response.status == 409) {
      alert('Chamado já tem registro!')
      return false
    } else {
      alert('Falha ao registrar! Fale com o suporte')
      return false
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
  function liberarAdm(){
    const admCampo:any = document.getElementById("admCampo")
    admCampo.style.display = "block"
  }
  
  // verificarUsuario(): Essa função verifica se um usuário com o CPF fornecido está cadastrado no sistema. Ela faz uma solicitação à API para obter informações sobre o usuário e exibe uma mensagem dependendo do status do usuário (ativo ou bloqueado).
  async function verificarUsuario(event:any):Promise<void> {
    event.preventDefault()
    try {
      const adm:any = document.getElementById("adm").value
      const formData:FormData = new FormData(document.getElementById('formulario'))
      const response:Response = await fetch('http://127.0.0.1:80/login', {
      method: 'POST',
      body: formData
    })
      if (!response.ok) {
        alert('Usuário não encontrado!')
        window.location.href = "login.hmtl"
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
          window.location.href = "login.html"
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

  // Preenche a página do Chamado
  async function preencherDetalhe(id:string, userEmail:string,logado:boolean):Promise<void>{
    try {
      if (logado==false){
        window.location.href = "login.html"
      } else{
        const buttons:any = document.getElementById('buttons')
        const pencilButton:any = document.getElementById('pencilButton')
        const problemaTxt:any = document.getElementById("problemaTxt")
        const statusTxt:any = document.getElementById('statusTxt')
        const usuarioTxt:any = document.getElementById("usuarioTxt")
        const telefoneTxt:any = document.getElementById("telefoneTxt")
        const setorTxt:any = document.getElementById('setorTxt')
        const diaTxt:any = document.getElementById('diaTxt')
        const detalhesTxt:any = document.getElementById('detalhesTxt')
        const diaRespostaTxt:any = document.getElementById('diaRespostaTxt')
        const respostaTxt:any = document.getElementById('repostaTxt')
        const apiUrl:string = 'http://127.0.0.1:80/chamadoid/' + id
        const response:Response = await fetch(apiUrl)
        if (!response.ok) {
          alert('Chamado não encontrado!')
        }
        else {
          const data:any = await response.json()
          const user:any = data.user
          const email:any = data.email
          const telefone:any = data.telefone
          const dia:any = data.dia
          const hora:any = data.hora
          const diaResposta:any = data.diaResposta
          const horaResposta:any = data.horaResposta
          const setor:any = data.setor
          const problema:any = data.problema
          const detalhes:any = data.detalhes
          const resposta:any = data.resposta
          const status:any = data.status
    
          problemaTxt.innerText = problema
          if (status == "Em Aberto"){
            statusTxt.innerText = status
            statusTxt.classList.remove('bg-success')
            statusTxt.classList.add('bg-danger')
          } else{
            statusTxt.innerText = status
            statusTxt.classList.remove('bg-danger')
            statusTxt.classList.add('bg-success')
          }
          
          usuarioTxt.innerText = user
          telefoneTxt.innerText = telefone
          setorTxt.innerText = setor
          diaTxt.innerText = `${dia} - ${hora}`
          detalhesTxt.innerText = detalhes
          if (resposta.trim()=="" || !resposta){
            respostaTxt.innerText = "A equipe de TI ainda não comentou esse chamado."
            diaRespostaTxt.style.display = 'none'
          } else{
            respostaTxt.innerText = resposta
            diaRespostaTxt.style.display = "block"
            diaRespostaTxt.innerText = `${diaResposta} - ${horaResposta}`
          }
          if (userEmail == email){
            buttons.style.display = 'flex'
            if (status == "Fechado"){
              pencilButton.style.display = 'none'
            } else{
              pencilButton.style.display = 'block'
            }
          } else{
            buttons.style.display = 'none'
          }
        }
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // Preenche a página do Chamado
  async function preencherDetalheGestao(id:string, logado:boolean):Promise<void>{
    try {
      if (logado==false){
        window.location.href = "login.html"
      } else{
        const pencilButton:any = document.getElementById('pencilButton')
        const problemaTxt:any = document.getElementById("problemaTxt")
        const statusTxt:any = document.getElementById('statusTxt')
        const usuarioTxt:any = document.getElementById("usuarioTxt")
        const telefoneTxt:any = document.getElementById("telefoneTxt")
        const setorTxt:any = document.getElementById('setorTxt')
        const diaTxt:any = document.getElementById('diaTxt')
        const detalhesTxt:any = document.getElementById('detalhesTxt')
        const diaRespostaTxt:any = document.getElementById('diaRespostaTxt')
        const respostaTxt:any = document.getElementById('repostaTxt')
        const apiUrl:string = 'http://127.0.0.1:80/chamadoid/' + id
        const response:Response = await fetch(apiUrl)
        if (!response.ok) {
          alert('Chamado não encontrado!')
        }
        else {
          const data:any = await response.json()
          const user:any = data.user
          const email:any = data.email
          const telefone:any = data.telefone
          const dia:any = data.dia
          const hora:any = data.hora
          const diaResposta:any = data.diaResposta
          const horaResposta:any = data.horaResposta
          const setor:any = data.setor
          const problema:any = data.problema
          const detalhes:any = data.detalhes
          const resposta:any = data.resposta
          const status:any = data.status
    
          problemaTxt.innerText = problema
          if (status == "Em Aberto"){
            statusTxt.innerText = status
            statusTxt.classList.remove('bg-success')
            statusTxt.classList.add('bg-danger')
            pencilButton.style.display = 'block'
          } else{
            statusTxt.innerText = status
            statusTxt.classList.remove('bg-danger')
            statusTxt.classList.add('bg-success')
            pencilButton.style.display = 'none'
          }
          
          usuarioTxt.innerText = user
          telefoneTxt.innerText = telefone
          setorTxt.innerText = setor
          diaTxt.innerText = `${dia} - ${hora}`
          detalhesTxt.innerText = detalhes
          if (resposta.trim()=="" || !resposta){
            respostaTxt.innerText = "A equipe de TI ainda não comentou esse chamado."
            diaRespostaTxt.style.display = "none"
          } else{
            respostaTxt.innerText = resposta
            diaRespostaTxt.style.display = "block"
            diaRespostaTxt.innerText = `${diaResposta} - ${horaResposta}`
          }
        }
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }

  async function alterarStatus(id:any):Promise<void> {
    const apiUrl = 'http://127.0.0.1/status/' + id
    const response = await fetch(apiUrl)
    if (response.status == 201) {
      console.log('Status alterado!')
    }
    location.reload() //atualiza a página atual no navegador
  }



  // // Envia para a página de edição
  // async function editaChamado(id:string,userEmail:string,logado:boolean):Promise<void> {
  //   const urlEditar:string = `edicao.html?id=${id}&useremail=${userEmail}&logado=${logado}`
  //   window.location.href = urlEditar //permite redirecionar o navegador para o URL fornecido
  // }


  // editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
  
  async function preencherEdicao(id:string,userEmail:string,logado:boolean):Promise<void> {
    try {
      const apiUrl:string = 'http://127.0.0.1/chamadoid/' + id
      const response:Response = await fetch(apiUrl)
  
      if (!response.ok) {
        alert('Chamado não encontrado!')
      }
      else {
        const data:any = await response.json()
        const email_chamado:any = data.email
        const setor_chamado:any = data.setor
        const problema_chamado:any = data.problema
        const detalhes_chamado:any = data.detalhes
        const id_chamado:any = data.id
  
        document.getElementById("setor").value = setor_chamado
        document.getElementById("problema").value = problema_chamado
        document.getElementById("detalhes").value = detalhes_chamado
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }

  async function preencherResposta(id:string):Promise<void> {
    try {
      const apiUrl:string = 'http://127.0.0.1/chamadoid/' + id
      const response:Response = await fetch(apiUrl)
  
      if (!response.ok) {
        alert('Chamado não encontrado!')
      }
      else {
        const data:any = await response.json()
        const setor_chamado:any = data.setor
        const problema_chamado:any = data.problema
        const detalhes_chamado:any = data.detalhes
        const resposta_chamado:any = data.resposta
  
        document.getElementById("setor").value = setor_chamado
        document.getElementById("problema").value = problema_chamado
        document.getElementById("detalhes").value = detalhes_chamado
        document.getElementById('resposta').value = resposta_chamado
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }
  
  // alterarDados(event): Esta função é chamada quando os dados de um usuário são alterados em um formulário de edição. Ela envia os dados atualizados para a API através de uma solicitação PUT para atualizar o usuário.
  
  async function alterarChamado(event:any,id:string,userEmail:string,logado:string):Promise<boolean>{
    event.preventDefault() 
  
    const apiUrl:string = 'http://127.0.0.1:80/editar/' + id
    const formData:FormData = new FormData(document.getElementById('formulario'))
    const response:Response = await fetch(apiUrl, {
      method: 'PUT',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Chamado alterado com sucesso!')
      const urlEditar:string = `home.html?userEmail=${userEmail}&logado=${logado}`
      window.location.href = urlEditar
      return true
    } else {
      alert('Falha ao alterar! Fale com o suporte')
      const urlEditar:string = `home.html?userEmail=${userEmail}&logado=${logado}`
      window.location.href = urlEditar
      return false
    }
  }

  async function alterarResposta(event:any,id:string,userEmail:string,logado:string):Promise<boolean>{
    event.preventDefault() 
  
    const apiUrl:string = 'http://127.0.0.1:80/responder/' + id
    const formData:FormData = new FormData(document.getElementById('formulario'))
    const response:Response = await fetch(apiUrl, {
      method: 'PUT',
      body: formData
    })
  
    if (response.status == 201) {
      alert('Chamado alterado com sucesso!')
      const urlEditar:string = `gestaoDetalhe.html?id=${id}&userEmail=${userEmail}&logado=${logado}`
      window.location.href = urlEditar
      return true
    } else if(response.status == 400){
      alert('Chamado já registrado!')
      const urlEditar:string = `gestaoDetalhe.html?id=${id}&userEmail=${userEmail}&logado=${logado}`
      window.location.href = urlEditar
      return false
    } else {
        alert('Falha ao alterar! Fale com o suporte.')
        const urlEditar:string = `gestaoDetalhe.html?id=${id}&userEmail=${userEmail}&logado=${logado}`
        window.location.href = urlEditar
        return false
    }
  }
  
  // excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
  
  async function excluir(id:string, userEmail:string,logado:boolean):Promise<boolean>{
    const apiUrl:string = 'http://127.0.0.1:80/deletar/' + id
    const response:Response = await fetch(apiUrl,{method:'DELETE'})
  
    if (response.status == 200) {
      alert('Chamado deletado com sucesso!')
      const urlEditar:string = `home.html?userEmail=${userEmail}&logado=${logado}`
      window.location.href = urlEditar
      return true
    } else {
      alert('Falha ao excluir! Fale com o suporte')
      const urlEditar:string = `home.html?userEmail=${userEmail}&logado=${logado}`
      window.location.href = urlEditar
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