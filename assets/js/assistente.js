/**
 * ASSISTENTE VIRTUAL – GESTÃO DE TRÁFEGO PAGO
 * Fluxo guiado focado em qualificação de leads, estratégia, otimização e relatórios
 */

document.addEventListener('DOMContentLoaded', () => {
    const floatingBtn = document.getElementById('bot-floating-button');
    const chatContainer = document.getElementById('bot-chat-container');
    const closeBtn = document.querySelector('.bot-close');
    const messageArea = document.getElementById('bot-messages-list');
    const typingIndicator = document.getElementById('typing-indicator');

    const WHATSAPP_NUMBER = "5547991597258";
    
    let userContext = {
        service: null,
        detail: null
    };

    // Estrutura de Navegação do Chat
    const flow = {
        start: {
            text: "Olá! 👋 Seja bem-vindo.<br><br>Sou o assistente virtual e vou te ajudar a encontrar a melhor estratégia para atrair clientes, gerar leads e aumentar suas vendas. O que você busca hoje?",
            options: [
                { text: "🚀 Criar campanhas de tráfego pago", next: "campanhas" },
                { text: "📈 Melhorar campanhas existentes", next: "otimizacao" },
                { text: "📊 Estratégia e planejamento", next: "estrategia" },
                { text: "📑 Relatórios e análise de resultados", next: "relatorios" }
            ]
        },

        campanhas: {
            text: "Perfeito! Para criarmos campanhas eficientes, preciso entender melhor seu negócio. Qual é o seu objetivo principal?",
            options: [
                { text: "Gerar leads qualificados", next: "final", context: { service: "Tráfego Pago", detail: "Geração de Leads" } },
                { text: "Vender produtos ou serviços", next: "final", context: { service: "Tráfego Pago", detail: "Vendas Diretas" } },
                { text: "Divulgar minha marca", next: "final", context: { service: "Tráfego Pago", detail: "Branding e Alcance" } }
            ]
        },

        otimizacao: {
            text: "Ótima decisão! A otimização correta reduz custos e aumenta conversões. O que mais te incomoda hoje nas suas campanhas?",
            options: [
                { text: "Alto custo por lead/venda", next: "final", context: { service: "Otimização de Campanhas", detail: "Redução de CPA" } },
                { text: "Poucas conversões", next: "final", context: { service: "Otimização de Campanhas", detail: "Aumento de Conversão" } },
                { text: "Campanhas sem escala", next: "final", context: { service: "Otimização de Campanhas", detail: "Escala de Resultados" } }
            ]
        },

        estrategia: {
            text: "Estratégia é a base de resultados consistentes. Como você se encontra hoje?",
            options: [
                { text: "Estou começando do zero", next: "final", context: { service: "Estratégia de Tráfego", detail: "Início do Projeto" } },
                { text: "Já anuncio, mas sem estratégia clara", next: "final", context: { service: "Estratégia de Tráfego", detail: "Reestruturação" } },
                { text: "Quero escalar com segurança", next: "final", context: { service: "Estratégia de Tráfego", detail: "Escala e Previsibilidade" } }
            ]
        },

        relatorios: {
            text: "Analisar dados corretamente é o que gera crescimento real. Como podemos te ajudar?",
            options: [
                { text: "Relatórios claros e profissionais", next: "final", context: { service: "Relatórios de Performance", detail: "Análise Completa" } },
                { text: "Acompanhar ROI e métricas", next: "final", context: { service: "Relatórios de Performance", detail: "ROI e Indicadores" } },
                { text: "Entender onde investir mais", next: "final", context: { service: "Relatórios de Performance", detail: "Tomada de Decisão" } }
            ]
        }
    };

    // Abrir/Fechar Chat
    floatingBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active') && messageArea.children.length === 0) {
            renderStep("start");
        }
    });

    closeBtn.addEventListener('click', () => chatContainer.classList.remove('active'));

    function renderStep(stepKey) {
        const step = flow[stepKey];
        showBotMessage(step.text, step.options);
    }

    function showBotMessage(text, options = []) {
        typingIndicator.style.display = 'block';
        messageArea.scrollTop = messageArea.scrollHeight;

        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message bot';
            msgDiv.innerHTML = `<div>${text}</div>`;
            
            if (options.length > 0) {
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'bot-actions';
                options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'action-btn';
                    btn.textContent = opt.text;
                    btn.onclick = () => handleSelection(opt);
                    actionsDiv.appendChild(btn);
                });
                msgDiv.appendChild(actionsDiv);
            }
            
            messageArea.appendChild(msgDiv);
            messageArea.scrollTop = messageArea.scrollHeight;
        }, 700);
    }

    function showUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user';
        msgDiv.textContent = text;
        messageArea.appendChild(msgDiv);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    function handleSelection(option) {
        showUserMessage(option.text);
        
        if (option.context) {
            userContext = { ...userContext, ...option.context };
        }

        if (option.next === "final") {
            showBotMessage("Perfeito! Já entendi seu objetivo. Agora vou te conectar com um especialista em gestão de tráfego para analisar seu caso.");
            setTimeout(() => {
                const finishBtn = { text: "📲 Falar com especialista agora", action: "send" };
                showBotMessage("Clique abaixo para enviar suas informações pelo WhatsApp:", [finishBtn]);
            }, 1000);
        } else if (option.action === "send") {
            finishAndSend();
        } else if (option.action === "restart") {
            messageArea.innerHTML = '';
            renderStep("start");
        } else if (option.action === "close") {
            showBotMessage("Obrigado pelo contato! 🚀 Estaremos prontos para escalar seus resultados quando precisar.");
            setTimeout(() => {
                chatContainer.classList.remove('active');
            }, 3000);
        } else {
            renderStep(option.next);
        }
    }

    function finishAndSend() {
        const message = `Olá! Vim pelo site e gostaria de um atendimento especializado em gestão de tráfego.

📌 *Resumo da Solicitação:*
🚀 *Serviço:* ${userContext.service}
📊 *Objetivo:* ${userContext.detail}

Fico no aguardo para analisarmos meu projeto.`;

        const encodedMsg = encodeURIComponent(message);
        const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
        
        window.open(link, '_blank');

        setTimeout(() => {
            showBotMessage("Mensagem pronta! Deseja fazer mais alguma coisa?", [
                { text: "🔄 Iniciar nova conversa", action: "restart" },
                { text: "👋 Encerrar atendimento", action: "close" }
            ]);
        }, 1500);
    }
});
