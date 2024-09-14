# Elmo
Bot com integração a uma API de IA gratuita.

### Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/)
3. [Yarn](https://yarnpkg.com/)

### Passo 1: Instalar Git

Se você ainda não tem o Git instalado, siga o tutorial de instalação oficial para o seu sistema operacional [aqui](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

### Passo 2: Instalar Node.js

Node.js é necessário para rodar o projeto. Baixe e instale a versão mais recente de Node.js a partir do [site oficial](https://nodejs.org/).

### Passo 3: Instalar Yarn

Para instalar Yarn, execute o seguinte comando no terminal:

```bash
npm install -g yarn
```

### Passo 4: Clonar o Repositório

Depois de instalar o Git, você pode clonar o repositório do projeto. No terminal, execute o seguinte comando:

```bash
git clone https://github.com/mendebian/elmo-bsky.git
```

### Passo 5: Instalar Dependências

Navegue até o diretório do repositório clonado:

```bash
cd elmo-bsky
```

Em seguida, instale as dependências necessárias usando Yarn:

```bash
yarn add @atproto/api dotenv axios
```

### Passo 6: Configurar o Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
BLUESKY_USERNAME=
BLUESKY_PASSWORD=
RAPIDAPI_KEY=
```

- `BLUESKY_USERNAME`: @ na rede social Bluesky.
- `BLUESKY_PASSWORD`: Recomendo usar "app password", que pode ser gerada nas configurações de segurança.
- `RAPIDAPI_KEY`: A chave de API adquirida após criar uma conta no site [RapidAPI](https://rapidapi.com/) e inscrever-se na API [Models3](https://rapidapi.com/qewertyyirl/api/models3).

### Passo 7: Executar o Projeto

Depois de configurar o arquivo `.env`, você pode iniciar o projeto com o seguinte comando:

```bash
node app.js
```

---

Isso deve ser suficiente para configurar e iniciar o seu projeto.
