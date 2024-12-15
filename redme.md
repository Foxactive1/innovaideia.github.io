# Portfólio de Dione Castro Alves

Este repositório contém o portfólio de Dione Castro Alves, apresentando alguns dos meus projetos de desenvolvimento de software. Você pode explorar projetos diversos que incluem tecnologias como Python, JavaScript, e outras ferramentas de ponta que uso para transformar ideias em soluções inovadoras.

## Tecnologias Utilizadas
- **Python** (Flask, Django) - Para desenvolvimento de backend e APIs.
- **JavaScript** (React, Node.js) - Para criação de interfaces dinâmicas e desenvolvimento frontend.
- **Banco de dados**: SQLite, PostgreSQL - Para armazenamento e gerenciamento de dados.
- **Docker** - Utilizado para contêineres e facilitar a configuração de ambientes de desenvolvimento.
- **CI/CD** - Ferramentas como GitHub Actions para integração contínua e deploy automático.

## Projetos

### 1. **Sistema de Gestão de Clientes (CRUD)**
   - **Descrição**: Sistema simples para gerenciar clientes utilizando Flask e SQLite. Ele permite operações de CRUD (Criar, Ler, Atualizar e Deletar) para gerenciar informações dos clientes.
   - **Tecnologias**: Python (Flask), SQLite
   - **Como Usar**:
     1. Clone o repositório:
        ```bash
        git clone https://github.com/innovaideia/cliente-crud.git
        cd cliente-crud
        ```
     2. Instale as dependências:
        ```bash
        pip install -r requirements.txt
        ```
     3. Execute o servidor:
        ```bash
        python app.py
        ```
     4. Acesse o aplicativo em `http://127.0.0.1:5000/` no seu navegador.

### 2. **Aplicativo de Previsão de Tendências de Moda com IA**
   - **Descrição**: Um projeto que usa inteligência artificial para prever as tendências de moda. Utiliza dados de vendas passadas e análises de mercado para oferecer previsões.
   - **Tecnologias**: Python (TensorFlow, Keras), Flask, PostgreSQL
   - **Como Usar**:
     1. Clone o repositório:
        ```bash
        git clone https://github.com/innovaideia/moda-ia.git
        cd moda-ia
        ```
     2. Instale as dependências:
        ```bash
        pip install -r requirements.txt
        ```
     3. Prepare os dados (se necessário) e execute o modelo de IA:
        ```bash
        python preprocess.py
        python model.py
        ```
     4. Inicie o servidor Flask:
        ```bash
        python app.py
        ```
     5. Acesse a aplicação em `http://127.0.0.1:5000/`.

### 3. **Dashboard de Análise de Dados**
   - **Descrição**: Dashboard interativo feito com React e Node.js para exibir dados analíticos de forma visual e dinâmica.
   - **Tecnologias**: React, Node.js, Chart.js
   - **Como Usar**:
     1. Clone o repositório:
        ```bash
        git clone https://github.com/innovaideia/dashboard-analitico.git
        cd dashboard-analitico
        ```
     2. Instale as dependências:
        ```bash
        npm install
        ```
     3. Execute o projeto:
        ```bash
        npm start
        ```
     4. Acesse o dashboard em `http://localhost:3000/`.

## Como Rodar os Projetos Localmente
Para rodar os projetos localmente, basta seguir os seguintes passos gerais:

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```
2. Instale as dependências:
    - Para projetos Python:
      ```bash
      pip install -r requirements.txt
      ```
    - Para projetos JavaScript:
      ```bash
      npm install
      ```
3. Execute o projeto:
    - Para projetos Flask (Python):
      ```bash
      python app.py
      ```
    - Para projetos React (JavaScript):
      ```bash
      npm start
      ```

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).