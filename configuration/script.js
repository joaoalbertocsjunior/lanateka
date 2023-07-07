'use strict';

const configurations = {
    inviteMessage: "Boa tarde. Gostaria de mais informações!",
    backKeyword: 'voltar',
    verifyMessage: `*1* - Sim\n*2* - Não`,
    invalidVerify: "Opção invalida, selecione uma das opções:",
    invalidOption: "Selecione uma opção válida."
};

const Script = (data) => {
    const script = {
        keywords: [
            "menu"
        ],
        menuStartText: "Bem-vindo a\n*LiderEco* ♻️\nEscolha uma das seguintes opções:\n\n",
        menuEndText: `\nPara voltar ao menu principal a qualquer momento digite a palavra *menu*.\nDigite *voltar* para navegar para opção anterior.`,
        options: [
            {
                menuOption: "Sobre a ♻️ *LiderEco*.",
                info: `Informações sobre Tópico 1.`
            },
            {
                menuOption: "Quem Somos? 🧑🏽‍🔧",
                info: `Informações sobre Tópico 2.`
            },
            {
                menuOption: "Falar com um atendente. 👩🏽",
                info: `Informações sobre Tópico 3.`
            },
            {
                menuOption: "Midias Sociais e Canais de Atendimento.",
                info: `Você pode encontrar nossas Midias Socias e nossos Canais de Atendimento aqui:\n`
                    + `\n`
                    + `https://linktr.ee/[seulinktree]`
            },
            {
                menuOption: "Outros Assuntos.",
                menuStartText: "Outras opções:\n\n",
                options: [
                    {
                        menuOption: "Assunto A",
                        info: `Info A`
                    },
                    {
                        menuOption: "Assunto B",
                        info: `Info B`
                    },
                    {
                        menuOption: "Assunto C",
                        info: `Info C`
                    }
                ],
            },
            {
                menuOption: "Quero ser parceiro ou colaborador!",
                notification: `Deixe sua mensagem, responderemos assim que possível.`
            },
        ]
    };
    return script;
};





module.exports = {
    Script,
    configurations
};