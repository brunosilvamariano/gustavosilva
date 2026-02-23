/**
 * ASSISTENTE VIRTUAL - GUSTAVO SILVA (TRÁFEGO PAGO)
 * Fluxo otimizado para conversão e qualificação de leads
 */

document.addEventListener('DOMContentLoaded', () => {
    const floatingBtn = document.getElementById('bot-floating-button');
    const chatContainer = document.getElementById('bot-chat-container');
    const closeBtn = document.querySelector('.bot-close');
    const messageArea = document.getElementById('bot-messages-list');
    const typingIndicator = document.getElementById('typing-indicator');

    const WHATSAPP_NUMBER = "5511939376933"; // Número atualizado conforme o site
    
    let userContext = {
        service: null,
        detail: null
    };

    // Estrutura de Navegação do Chat (Refeita do Zero)
    const flow = {
        start: {
            text: "Olá! 👋 Sou o assistente do Gustavo Silva.<br><br>Estou aqui para te ajudar a escalar seu negócio através do tráfego pago e estratégias digitais de alta performance. Como posso te ajudar hoje?",
            options: [
                { text: "🚀 Quero vender mais com anúncios", next: "anuncios" },
                { text: "📈 Preciso de mais leads qualificados", next: "leads" },
                { text: "📱 Quero melhorar meu Social Media", next: "social" },
                { text: "🔍 Gostaria de uma consultoria", next: "consultoria" }
            ]
        },

        anuncios: {
            text: "Excelente! O tráfego pago é o caminho mais rápido para vendas. Em qual plataforma você tem mais interesse em anunciar?",
            options: [
                { text: "Meta Ads (Instagram/Facebook)", next: "final", context: { service: "Vendas com Anúncios", detail: "Meta Ads" } },
                { text: "Google Ads (Pesquisa/YouTube)", next: "final", context: { service: "Vendas com Anúncios", detail: "Google Ads" } },
                { text: "TikTok Ads", next: "final", context: { service: "Vendas com Anúncios", detail: "TikTok Ads" } },
                { text: "Quero uma estratégia multicanal", next: "final", context: { service: "Vendas com Anúncios", detail: "Multicanal" } }
            ]
        },

        leads: {
            text: "Gerar leads qualificados é fundamental para o crescimento B2B ou serviços. Qual o seu nicho de atuação?",
            options: [
                { text: "Prestação de Serviços", next: "final", context: { service: "Geração de Leads", detail: "Serviços" } },
                { text: "Imobiliário / Automotivo", next: "final", context: { service: "Geração de Leads", detail: "Alto Valor Agregado" } },
                { text: "Educação / Infoprodutos", next: "final", context: { service: "Geração de Leads", detail: "Infoprodutos" } },
                { text: "Outros nichos", next: "final", context: { service: "Geração de Leads", detail: "Geral" } }
            ]
        },

        social: {
            text: "Presença digital é autoridade. Como você quer potencializar suas redes sociais?",
            options: [
                { text: "Gestão completa de conteúdo", next: "final", context: { service: "Social Media", detail: "Gestão Completa" } },
                { text: "Design e Identidade Visual", next: "final", context: { service: "Social Media", detail: "Design" } },
                { text: "Estratégia de Engajamento", next: "final", context: { service: "Social Media", detail: "Engajamento" } }
            ]
        },

        consultoria: {
            text: "Uma análise estratégica pode mudar o jogo do seu negócio. O que você busca na consultoria?",
            options: [
                { text: "Análise de campanhas atuais", next: "final", context: { service: "Consultoria", detail: "Auditoria de Contas" } },
                { text: "Planejamento de escala", next: "final", context: { service: "Consultoria", detail: "Escala de Resultados" } },
                { text: "Estruturação de funil de vendas", next: "final", context: { service: "Consultoria", detail: "Funil de Vendas" } }
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
        }, 800);
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
            showBotMessage("Perfeito! Já tenho as informações iniciais. Agora, para te dar um atendimento personalizado e analisar seu caso, vou te conectar diretamente ao meu WhatsApp.");
            setTimeout(() => {
                const finishBtn = { text: "📲 Falar com Gustavo agora", action: "send" };
                showBotMessage("Clique no botão abaixo para iniciarmos:", [finishBtn]);
            }, 1200);
        } else if (option.action === "send") {
            finishAndSend();
        } else if (option.action === "restart") {
            messageArea.innerHTML = '';
            renderStep("start");
        } else if (option.action === "close") {
            showBotMessage("Obrigado pelo contato! 🚀 Vamos transformar seus anúncios em lucro.");
            setTimeout(() => {
                chatContainer.classList.remove('active');
            }, 2500);
        } else {
            renderStep(option.next);
        }
    }

    function finishAndSend() {
        const message = `Olá Gustavo! Vim pelo seu site e gostaria de escalar meus resultados.

📌 *Interesse:* ${userContext.service}
📊 *Detalhe:* ${userContext.detail}

Pode me ajudar com essa estratégia?`;

        const encodedMsg = encodeURIComponent(message);
        const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
        
        window.open(link, '_blank');

        setTimeout(() => {
            showBotMessage("Deseja iniciar uma nova consulta ou encerrar o atendimento?", [
                { text: "🔄 Nova consulta", action: "restart" },
                { text: "👋 Encerrar", action: "close" }
            ]);
        }, 2000);
    }
});
