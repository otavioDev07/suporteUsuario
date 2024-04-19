let logado:boolean = false
let loginEmail:string = ""
  // enviarDados(event): Esta função é chamada quando os dados de um novo usuário são enviados por meio de um formulário. Ela envia os dados para a API através de uma solicitação POST para cadastrar o novo usuário.
  
  async function enviarDados(event:any): Promise<boolean> {
    event.preventDefault();
    
    const formData: FormData = new FormData(document.getElementById('formulario'));
    const response: Response = await fetch('http://127.0.0.1:80/novo', {
        method: 'POST',
        body: formData
    });

    let responseData:Response // Declaração da variável responseData
    // Possível alteração let responseData: { message: string };
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
        window.location.href = "login.html"
      }
      else {
        const data:any = await response.json()
        logado = true
        loginEmail = data.email
  
        setTimeout(() => {
          if (adm != "Adm#123"){
            const urlEditar:string = `./user/home.html?userEmail=${loginEmail}&logado=${logado}`
            window.location.href = urlEditar
          } else{
            const urlEditar:string = `./adm/gestao.html?userEmail=${loginEmail}&logado=${logado}`
            window.location.href = urlEditar
          }
        }, 2000)
      }
    }
    catch (error) {
      console.error("API com problemas!")
    }
  }