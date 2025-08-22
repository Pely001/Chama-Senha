from flask import Flask, render_template, jsonify, request
import threading
import time

app = Flask(__name__)

# O sistema de fila será um dicionário simples
# Em um sistema de produção, você usaria um banco de dados
fila_senhas = []
senhas_chamadas = []
senha_atual = None
ultima_senha_gerada = 0
lock = threading.Lock()

# Rotas do Frontend
@app.route('/')
def painel():
    """Rota para a tela pública do painel de senhas."""
    return render_template('painel.html')

@app.route('/atendimento')
def atendimento():
    """Rota para a tela de atendimento do operador."""
    return render_template('atendimento.html')

# Rotas da API
@app.route('/api/gerar_senha', methods=['POST'])
def gerar_senha():
    """Endpoint para gerar uma nova senha na fila."""
    global ultima_senha_gerada
    with lock:
        ultima_senha_gerada += 1
        nova_senha = f"A{ultima_senha_gerada:03d}"
        fila_senhas.append(nova_senha)
    
    print(f"Nova senha gerada: {nova_senha}. Fila atual: {fila_senhas}")
    return jsonify({'senha': nova_senha, 'status': 'sucesso'})

@app.route('/api/chamar_proximo', methods=['POST'])
def chamar_proximo():
    """Endpoint para chamar a próxima senha da fila."""
    global senha_atual
    with lock:
        if fila_senhas:
            senha_chamada = fila_senhas.pop(0)
            senha_atual = senha_chamada
            senhas_chamadas.insert(0, senha_chamada)
            if len(senhas_chamadas) > 5:  # Manter um histórico de até 5 senhas
                senhas_chamadas.pop()
            
            print(f"Chamando próxima senha: {senha_chamada}. Fila restante: {fila_senhas}")
            return jsonify({'senha': senha_chamada, 'status': 'sucesso'})
        else:
            return jsonify({'senha': None, 'status': 'fila_vazia'})

@app.route('/api/status', methods=['GET'])
def get_status():
    """Endpoint para o frontend obter o status atual do sistema."""
    with lock:
        return jsonify({
            'senha_atual': senha_atual,
            'historico': senhas_chamadas,
            'fila_tamanho': len(fila_senhas)
        })

if __name__ == '__main__':
    app.run(debug=True)