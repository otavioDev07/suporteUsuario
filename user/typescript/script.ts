async function listarChamadosUser(email:string,login:boolean):Promise<void> {
  const listaChamados:any = document.getElementById("listaChamados")
  const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/' + email
  const response:Response = await fetch(apiUrl)
  if (!response.ok) {
    listaChamados.innerHTML = "<h2 class='text-center'>Não há chamados cadastrados</h2>"
  }
  else {
    const data:any = await response.json()
    listaChamados.innerHTML = ""
    for (let item of data) {  
      listaChamados.innerHTML += `<div style="cursor: pointer" class="cartinha col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 m-3"><div class="card text-center bg-light"><div class="card-header fs-3 text-danger">${item.problema}</div><div class="card-body"><h5 class="card-title"></h5><div class="d-flex justify-content-between"><p class="card-subtitle mb-2 text-body-secondary">${item.user}</p><p class="card-subtitle mb-2 text-body-secondary">${item.telefone}</p></div><div class="d-flex justify-content-between"><p class="card-subtitle mb-2 text-body-secondary">${item.setor}</p><p class="card-subtitle mb-2 text-body-secondary">${item.dia} - ${item.hora}</p></div></div></div></div>` //adiciona card com informações do chamado 
    }
    const cards = document.querySelectorAll('.cartinha')
      cards.forEach((card, index) => {
        card.addEventListener('click',function(){
          const item = data[index]
          window.location.href = `detalhe.html?id=${item.id}&userEmail=${email}&logado=${login}`
        }) 
      })
  }
}
  async function enviarChamado(event:any):Promise<boolean> {
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.
    const user:any = document.getElementById("user")
    const email:any = document.getElementById("email")
    const telefone:any = document.getElementById("telefone")
    const setor:any = document.getElementById("setor")
    const problema:any = document.getElementById("problema")
    const detalhes:any = document.getElementById("detalhes")
    if (setor.value.trim() == "" || problema.value.trim() == "" || detalhes.value.trim() == ""){
      alert("Não deixe campos em branco!")
    } else{
      const apiUrl:string = 'http://127.0.0.1:80/' + email.value
      const Getresponse:Response = await fetch(apiUrl)
      if (!Getresponse.ok) {
        alert('Usuário não encontrado!')
        window.location.href = "../../login.html"
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
  }

  async function preencherHome(userEmail:string,logado:boolean):Promise<void> {
    try {
      if (logado==false){
        window.location.href = "../../login.html"
      } else{
        const username:any = document.getElementById("username")
        const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/' + userEmail
        const response:Response = await fetch(apiUrl)
    
        if (!response.ok) {
          alert('Usuário não encontrado!')
          window.location.href = "../../login.html"
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
        window.location.href = "../../login.html"
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
        const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/chamadoid/' + id
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


  // editarUsuario(cpf): Esta função é responsável por preencher um formulário de edição com os dados de um usuário existente. Ela faz uma solicitação à API para obter os dados do usuário com o CPF fornecido.
  
  async function preencherEdicao(id:string,userEmail:string,logado:boolean):Promise<void> {
    try {
      const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/chamadoid/' + id
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
  
  // excluir(id): Esta função é chamada quando um usuário é excluído. Ela envia uma solicitação à API para excluir o usuário com o ID fornecido.
  
  async function excluir(id:string, userEmail:string,logado:boolean):Promise<boolean>{
    const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/deletar/' + id
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