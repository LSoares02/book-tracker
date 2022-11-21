# **Sobre o Asset**

Neste repositório se encontra o código desenvolvido para atender o desafio proposto de construir uma simples aplicação fullstack capaz de armazenar dados a respeito da leitura de livros.

Através da interface apresentada, o usuário que realizou login consegue cadastrar livros e atualizá-los conforme o status de leitura do mesmo evolua. O usuário é capaz de dar uma nota final (de 1 - 5) para o livro uma vez que tenha concluído sua leitura, além de também ser capaz de excluir livros cadastrados anteriormente.

Foi desenvolvida uma lógica de login, de forma que os livros cadastrados na base estão atrelados cada qual ao usuário que o cadastrou, só sendo exibidos e editáveis por ele.

Há também facilidades que permitem que o usuário filtre os cadastros realizados através de uma barra de pesquisa presente no topo da página.

Você pode ver uma demo da aplicação [neste vídeo](https://youtu.be/TrrQwEYsUhU).

A aplicação também se encontra disponível através da imagem de container, disponível para _pull_ neste repositório do docker hub: `lucashlsoares/book-tracker:v1`.

# **Estrutura da DB**

Os dados foram divididos em duas collections pertencentes à mesma database no MongoDb:

### **Usuários:**

Cada objeto desta collection identifica um usuário que realizou signup na aplicação:

      {
            "_id": {
                  "$oid": "637b1000ef38cfb9eaebb2d5"
            },
            "password": "$2a$10$swT0k96ju8RJccmTb5fXROTtumbu9oEtiU.q/DUdTumpUCv0s.Ij.",
            "user": "lucashlsoares@gmail.com"
      }

### **Livros:**

Cada objeto desta collection identifica um livro que tenha sido cadastrado por um usuário. Identifica-se qual o usuário responsável através da chave `user`:

      {
            "_id": {
                  "$oid": "637b1017ef38cfb9eaebb400"
            },
            "author": "José de Alencar",
            "dateAdded": "21/11/2022",
            "dateCompleted": "28/10/2022",
            "score": 4,
            "status": "Lido",
            "title": "Iracema",
            "user": "lucashlsoares@gmail.com"
      }

# **Como Realizar o Deployment**

Antes de mais nada, por gentileza renomeie o arquivo `example.env` para `.env` e o preencha com as credenciais de sua instância do MongoDb.

## Através do container disponibilizado:

Clone a imagem localmente:

      podman pull lucashlsoares/book-tracker:v1

Inicialize o container passando para ele a porta em que deve se vinvular ao OS e as variáveis de que precisa:

      podman run -p 5000:5000 --env-file <path para o seu arquivo .env> lucashlsoares/book-tracker:v1

## Através do código fonte:

1. Instale as dependências do front e do back, rodando o comando `npm i` em ambos seus respectivos diretórios.

2. Inicie o servidor rodando o comando `npm start` no seu diretório `./backend`

   Caso queira rodar a aplicação utilizando o front já compilado, acesse em seu navegador a url `localhost:5000`, a qual utilizará o diretório `build`, que conta com a interface React em environment de produção.

3. Para realizar e visualizar mudanças no frontend,3inicie o React App com o comando `npm start` no seu diretório `./client`

   Acesse em seu navegador a url `localhost:3000`, que apresentará a interface React em environment de desenvolvimento, com compilação de alterações em tempo real.
