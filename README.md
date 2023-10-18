# project-tfc
Projeto TFC - aplicação desenvolvida aplicando todos os conceitos de Backend com Node.js e Javascript, além de aplicar os princípios de POO e conceitos de SOLID.


<details>
<summary><strong>👨‍💻 O que foi desenvolvido:</strong></summary><br />

  ![Exemplo app front](assets/front-example.png)

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No desenvolvimento do `TFC`, foi desenvolvolvida uma API (utilizando o método `TDD`) e também foi integrado *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, foi construido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Foi **respeitada as regras de negócio** e **a API foi capaz de ser consumida por um front-end nesse projeto**.

  No back-end foi implementado regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

</details>

<details>
<summary><strong>🏟️ Estrutura do projeto</strong></summary><br />

O projeto é composto de 4 entidades importantes para sua estrutura:

1️⃣ **Banco de dados:**
  - Será um container docker MySQL já configurado no docker-compose através de um serviço definido como `db`.
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - Durante a execução dos testes sempre vai ser acessado pelo `sequelize` e via porta `3306` do `localhost`;
  - Você também pode conectar a um Cliente MySQL (Workbench, Beekeeper, DBeaver e etc), colocando as credenciais configuradas no docker-compose no serviço `db`.

2️⃣ **Back-end:**
 - Será o ambiente onde terá nossa API.
 - Deve rodar na porta `3001`, pois o front-end faz requisições para ele nessa porta por padrão;
 - A aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Foi garantido que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.

3️⃣ **Front-end:**
  - O front irá consumir nossa API. Ela possui um Dockerfile que foi devidamente configurado.
  - Todos os testes a partir do requisito de login usam o `puppeteer` para simular uma pessoa acessando o site `http://localhost:3000/`;
  - O front se comunica com serviço de back-end pela url `http://localhost:3001` através dos endpoints que foi construido.

4️⃣ **Docker:**
  - O `docker-compose` tem a responsabilidade de unir todos os serviços conteinerizados (backend, frontend e db) e subir o projeto completo com o comando `npm run compose:up`;
  - Com as `Dockerfiles` configuradas corretamente nas raízes do `front-end` e `back-end`, é possível inicializar a aplicação;

</details>