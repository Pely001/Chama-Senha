// Funções para a tela do Atendente
document.addEventListener('DOMContentLoaded', () => {
    const btnGerarSenha = document.getElementById('btn-gerar-senha');
    const btnChamarProximo = document.getElementById('btn-chamar-proximo');
    const proximaSenhaDisplay = document.getElementById('proxima-senha');
    const senhaAtualDisplay = document.getElementById('senha-atual-display');
    const historicoDiv = document.getElementById('historico-senhas');
    const statusMessage = document.getElementById('status-message');

    // Função para atualizar o status em ambas as telas
    async function atualizarStatus() {
        try {
            const response = await fetch('/api/status');
            const data = await response.json();

            // Lógica para a tela de Atendimento
            if (proximaSenhaDisplay) {
                // Se a fila não estiver vazia, mostra a próxima senha
                if (data.fila_tamanho > 0) {
                    proximaSenhaDisplay.textContent = 'Fila (' + data.fila_tamanho + ')';
                } else {
                    proximaSenhaDisplay.textContent = 'Fila vazia';
                }
            }

            // Lógica para a tela do Painel de Senhas
            if (senhaAtualDisplay) {
                senhaAtualDisplay.textContent = data.senha_atual || '--';
            }
            if (historicoDiv) {
                historicoDiv.innerHTML = ''; // Limpa o histórico atual
                data.historico.forEach(senha => {
                    const senhaElement = document.createElement('div');
                    senhaElement.className = 'bg-gray-700 text-3xl md:text-4xl font-semibold p-4 rounded-lg text-center shadow-md';
                    senhaElement.textContent = senha;
                    historicoDiv.appendChild(senhaElement);
                });
            }
        } catch (error) {
            console.error('Erro ao buscar status:', error);
        }
    }

    // Eventos para a tela de Atendimento
    if (btnGerarSenha) {
        btnGerarSenha.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/gerar_senha', { method: 'POST' });
                const data = await response.json();
                if (data.status === 'sucesso') {
                    statusMessage.textContent = `Senha ${data.senha} gerada com sucesso.`;
                    statusMessage.style.color = 'green';
                    atualizarStatus();
                }
            } catch (error) {
                console.error('Erro ao gerar senha:', error);
                statusMessage.textContent = 'Erro ao gerar senha.';
                statusMessage.style.color = 'red';
            }
        });
    }

    if (btnChamarProximo) {
        btnChamarProximo.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/chamar_proximo', { method: 'POST' });
                const data = await response.json();
                if (data.status === 'sucesso') {
                    statusMessage.textContent = `Senha ${data.senha} chamada.`;
                    statusMessage.style.color = 'blue';
                    atualizarStatus();
                } else {
                    statusMessage.textContent = 'Fila de senhas vazia.';
                    statusMessage.style.color = 'red';
                }
            } catch (error) {
                console.error('Erro ao chamar próxima senha:', error);
                statusMessage.textContent = 'Erro ao chamar a próxima senha.';
                statusMessage.style.color = 'red';
            }
        });
    }

    // Atualiza o status a cada 3 segundos para manter as telas sincronizadas
    setInterval(atualizarStatus, 3000);
    atualizarStatus(); // Chama a função na primeira vez para carregar os dados
});