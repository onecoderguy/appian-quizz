# Appian Quizz
## Requisitos de sistema
* [Node](https://nodejs.org/) >= 16
* [Docker](https://www.docker.com/) >= 27.3.1
* [Docker-compose](https://www.docker.com/) >= 1.29.2

## Estrutura
* `/docker/`: Pasta de recursos docker;
* `/src/`: Pasta de desenvolvimento dos recursos do framework NextJS;
* `.eslintrc.json`: Arquivo configuração do ESLint criado pelo framework NextJS.
* `.gitignore`: Arquivo exclusão de versionamento de arquivos ou diretórios.
* `next-env.d.ts`: Arquivo de configuração de environments criado pelo framework NextJS.
* `next.config.mjs`: Arquivo de configuração do NextJS criado pelo framework NextJS.
* `package-lock.json`: Arquivos de metadados dos pacotes instalados via NPM.
* `package.json`: Arquivos de gerenciamento dos pacotes instalados via NPM.
* `postcss.config.mjs`: Arquivo de configuração do plugin PostCSS utilizado em momento de compilação.
* `README.md`: Documentação de requerimentos, estrutura e instalação básica do projeto.
* `tailwind.config.ts`: Arquivo de configuração do UI framework Tailwind.
* `tsconfig.json`: Arquivo de configuração typescript para compilador Node.

## Instalação
1. Clone este repositório;
3. Abra o terminal de comandos e navegue até a pasta docker;
4. Digite o comando `docker-compose up -d` para criação e inicialização do container do banco de dados;
5. Retorne para a raíz do projeto;
6. Digite o comando `npm i` para instalação de todas as dependências do projeto **Obs: O container da aplicação precisa estar UP!** ;
7. Digite o comando `npm build` para compilação do projeto;
8. Digite o comando `npm start` para inicializar o projeto;
9. Acesse o endereço localhost com a porta indicada pelo framework no terminal;