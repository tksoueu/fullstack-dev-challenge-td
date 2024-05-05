# fullstack-dev-challenge-td

Este é um projeto simples que conta com uma crud de login e cadastro num servidor de autenticação do Firebase e uma tela que permite adicionar novos contatos ao banco de dados e mostrar os contatos atualmente salvos no mesmo.

Para rodar o projeto basta abrir o readme dentro da pasta ```crud_contacts``` neste repositório.

O intuito dessa aplicação é simples.

Na primeira tela você tem acesso ao login e um botão que o leva à tela de cadastro para que possa se autenticar no banco do Firebase e iniciar a adição de contatos.
_Caso queira logar sem fazer um cadastro, pode utilizar das seguintes credenciais: ```email: admin@gmail.com``` e ```senha: admin123```_

Após realizado o login, o usuário é redirecionado a uma tela onde pode cadastrar novos contatos ao salvar nome e número de telefone. Nessa tela o usuário podee clicar em um botão para aumentar os campos de adição de contato até um máximo de 5.
Ao clicar no botão registrar contatos, é aberto um popup com uma caixa de mensagem que poderia ser enviada aos contatos cadastrados, porém neste momento a mensagem é printada no console e é exibido um alerta no navegador, informando que a mensagem foi enviada.
Ao clicar no botão de mostrar contatos, é feita uma busca no banco de dados do Firebase onde são retornados os contatos salvos até o momento.

Ambos os popups contam como botão de fechar no canto superior direito.

O deply dessa aplicação foi feito no [Vercel](https://fullstack-dev-challenge-td.vercel.app/add-contacts) 
