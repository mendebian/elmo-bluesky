const { BskyAgent } = require('@atproto/api');
const dotenv = require('dotenv').config();
const axios = require('axios');

const agent = new BskyAgent({
  service: 'https://bsky.social',
});

// Função principal
(async () => {
  try {
    await authenticateAgent();
    const feed = await getFeed();

    // Itera sobre os posts e processa as respostas
    feed.forEach(async (data) => {
      const post = data.post;
      const author = post.author;
      const record = post.record;

      // Verifica se o post tem texto e não é de alguém que o usuário segue
      if (record.text && data.feedContext !== "following") {
        const response = await generateResponse(author.displayName, record.text);
        
        // Publica a resposta se for válida (menos de 300 caracteres)
        if (response && response.length < 300) {
          await postReply(post, response);
        }
      }
    });
  } catch (err) {
    console.error(err); // Tratamento de erros
  }
})();

// Função para autenticar o agente
async function authenticateAgent() {
  return agent.login({
    identifier: process.env.BLUESKY_USERNAME,
    password: process.env.BLUESKY_PASSWORD,
  });
}

// Função para obter o feed
async function getFeed() {
  const { data } = await agent.app.bsky.feed.getFeed(
    {
      feed: "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot",
      limit: 50,
    },
    {
      headers: {
        "Accept-Language": "pt",
      },
    }
  );
  return data.feed;
}

// Função para gerar a resposta usando o modelo de IA
async function generateResponse(author, content) {
  const options = {
    method: 'POST',
    url: 'https://models3.p.rapidapi.com/',
    params: { model_id: '5' },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'models3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: 'system',
          content: `Você é uma paródia do Elmo da Vila Sésamo,  bot de replies do Bluesky. Não precisa citar esta informação, responda normalmente. Seus textos devem ser curtos (máx. 300 caracteres) e repletos de palavrões. Sua personalidade consiste em alguém sarcástico porém inteligente e rude. Estará respondendo ao ${author}. Caso não possa responder, retorne uma 'string' vazia.`
        },
        {
          role: 'user', 
          content: content
        },
      ],
    },
  };

  const response = await axios.request(options);
  return response.data.content;
}

// Função para postar a resposta
async function postReply(post, response) {
  await agent.post({
    text: response,
    reply: {
      root: { uri: post.uri, cid: post.cid },
      parent: { uri: post.uri, cid: post.cid },
    },
    createdAt: new Date().toISOString(),
  });
}