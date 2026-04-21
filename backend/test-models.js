require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.log("Erro na API:", data.error.message);
      return;
    }

    if (!data.models) {
        console.log("Nenhum modelo encontrado. Resposta da API:", JSON.stringify(data));
        return;
    }

    console.log("Modelos disponíveis na sua chave:");
    data.models.forEach(m => {
      if (m.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- ${m.name}`);
      }
    });
  } catch (e) {
    console.log("Erro ao conectar:", e.message);
  }
}

listModels();
