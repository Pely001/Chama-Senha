# Chama Senha 🎟️

Este é um **projeto de estudo** para praticar desenvolvimento web com **Python (Flask)**, utilizando **HTML, CSS e JavaScript** no frontend.  
A ideia é simular um **sistema de chamada de senhas** para filas de atendimento.

## 🚀 Funcionalidades

- Painel de exibição de senhas  
- Tela para o atendente chamar a próxima senha  
- Integração simples entre frontend e backend com Flask  
- Interface web responsiva básica  

## 📂 Estrutura do Projeto

``` bash
chama_senha/
│── app.py                # Backend principal (Flask)
│── static/
│   ├── style.css         # Estilos da interface
│   └── script.js         # Funções JS do frontend
│── templates/
│   ├── painel.html       # Tela do painel de senhas
│   └── atendimento.html  # Tela de atendimento
```

## 🛠️ Tecnologias Utilizadas

- **Python 3 + Flask**
- **HTML5, CSS3 e JavaScript**
- **Bootstrap (pode ser integrado futuramente)**

## ⚠️ Aviso Importante

🔹 Este é um projeto **experimental** criado apenas para **estudo e prática**.  
🔹 O código ainda **precisa de melhorias** em:
- Organização e boas práticas (separação em módulos, tratamento de erros)  
- Persistência de dados (atualmente sem banco de dados)  
- Design da interface (UI/UX)  
- Segurança (rotas abertas, sem autenticação)  

## ▶️ Como Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/chama_senha.git
   cd chama_senha
2. Crie um ambiente virtual e instale as dependências:
  ```
     python -m venv venv
     source venv/bin/activate  # Linux/Mac
     venv\Scripts\activate     # Windows
     pip install flask
  ```

3. Execute o servidor:
   ```
        python app.py
   ```
4. Abra no navegador:
  ```
      http://127.0.0.1:5000
  ```

## 📌 Próximos Passos (Sugestões de Melhoria)

Implementar banco de dados (SQLite ou PostgreSQL) para salvar senhas

Criar autenticação para os atendentes

Adicionar histórico de senhas chamadas

Melhorar o layout usando um framework CSS (Bootstrap ou Tailwind)

Deploy em um serviço gratuito (Railway, Fly.io, Render, etc.)

[![Instagram](https://img.shields.io/badge/Instagram-000?style=for-the-badge&logo=instagram)](https://www.instagram.com/pelyhenrique/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-000?style=for-the-badge&logo=linkedin&logoColor=0E76A8)](https://www.linkedin.com/in/pedro-henrique-matias/)
