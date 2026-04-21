const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ORIENTATIONS_DIR = path.join(__dirname, '../orientações');

async function loadKnowledgeBase() {
  if (!fs.existsSync(ORIENTATIONS_DIR)) return "Sem documentos.";
  const files = fs.readdirSync(ORIENTATIONS_DIR);
  let text = '';
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.txt' || ext === '.md') {
      text += `\n--- ${file} ---\n` + fs.readFileSync(path.join(ORIENTATIONS_DIR, file), 'utf-8');
    }
    // PDF e DOCX desativados temporariamente para teste de conexão
  }
  return text || "Nenhum arquivo de texto encontrado.";
}

app.post('/chat', async (req, res) => {
  const { question } = req.body;
  try {
    const knowledge = await loadKnowledgeBase();
    // Tentando o modelo com o prefixo completo
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      Você é o Gestor Orientador da equipe de suporte.
      Sua função é orientar os analistas exclusivamente com base nos documentos abaixo.
      
      BASE DE CONHECIMENTO:
      ${knowledge}
      
      PERGUNTA DO ANALISTA:
      ${question}
      
      REGRAS DE FORMATAÇÃO:
      1. Use **negrito** para termos importantes.
      2. Use listas (• ou 1.) para passos e procedimentos.
      3. Cite sempre o arquivo de origem (Ex: *Fonte: incidentes.md*).
      4. Seja direto e profissional.
    `;

    const result = await model.generateContent(prompt);
    res.json({ answer: result.response.text() });
  } catch (error) {
    console.error('ERRO:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor de TESTE rodando em http://127.0.0.1:${PORT}`);
});
