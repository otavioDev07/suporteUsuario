// listarUsuariosGestao(): Esta função é responsável por fazer uma requisição à API para obter a lista de usuários cadastrados. Em seguida, ela popula uma tabela HTML com os dados retornados pela API, incluindo opções para editar, excluir e alterar o status de cada usuário.

async function listarChamadosGestao(email:string,login:boolean):Promise<void> {
  const listaChamados:any = document.getElementById("listaChamados")
  const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/chamado/getall'
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

  async function enviarChamadoAdm(event:any):Promise<boolean> {
    event.preventDefault()//método que bloqueia a ação padrão do formulário, que seria a de recarregar a página limpando os dados do formulário.

    const formData:FormData = new FormData(document.getElementById('formulario')) //cria um novo objeto FormData e preenche-o com os dados do formulário HTML
    const response:Response = await fetch('https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/novochamado', {
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
  async function preencherDetalheGestao(id:string, logado:boolean):Promise<void>{
    try {
      if (logado==false){
        window.location.href = "../../login.html"
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
    const apiUrl = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/status/' + id
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


  async function preencherResposta(id:string):Promise<void> {
    try {
      const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/chamadoid/' + id
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
  

  async function alterarResposta(event:any,id:string,userEmail:string,logado:string):Promise<boolean>{
    event.preventDefault() 
  
    const apiUrl:string = 'https://a38e4b81-b74c-4406-8b37-931c4d31e33c-00-l2kdebn1d3nc.janeway.replit.dev/responder/' + id
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
  

  