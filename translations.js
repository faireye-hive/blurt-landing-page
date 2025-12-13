// translations.js

/**
 * Objeto de Tradução (Internacionalização - i18n)
 * Contém todas as strings traduzidas para os idiomas suportados.
 * Exportado para ser usado no app.js.
 */
export const translations = {
  pt: {
    // Menu Section
    head_menu_home: "Início",
    head_menu_features: "Recursos",
    head_menu_stats: "Estatísticas",
    head_menu_guide: "Guia",
    head_menu_resources: "Recursos",
    head_menu_register: "Criar Conta",
    head_menu_buy: "Comprar BLURT",
    // Hero Section
    hero_title: "A Blockchain de Mídia Social Descentralizada",
    hero_subtitle:
      "A Blurt é uma blockchain de mídia social que recompensa criadores de conteúdo com criptomoedas. Nossa missão é devolver o poder aos usuários, eliminando intermediários e garantindo liberdade de expressão.",
    hero_button1: "Começar Agora",
    hero_button2: "Explorar Blog",
    live_data: "Dados em tempo real da blockchain Blurt",
    live_activity: "Atividade em Tempo Real",

    // Blockchain Info
    blockchain_info: "Informações da Blockchain",
    current_block: "Bloco Atual",
    block_time: "Tempo do Bloco",
    accounts: "Contas",
    witnesses: "Testemunhas",
    transactions: "Transações (24h)",
    blurt_price: "Preço do BLURT",
    recent_transactions: "Transações Recentes",
    loading: "Carregando...",

    // Features
    features_title: "Recursos da Blurt Blockchain",
    features_subtitle:
      "A Blurt é uma blockchain que serve como base tecnológica para a criação de redes sociais descentralizadas.",

    feature1_title: "Sistema de recompensas nativo",
    feature1_text:
      "Sistema nativo de distribuição de tokens baseado em Blurt Power, permitindo votar em conteúdos e receber recompensas pelas interações sociais.",

    feature2_title: "Resistência à censura",
    feature2_text:
      "Conteúdos publicados na Blurt são armazenados de forma imutável na blockchain, tornando a censura ou remoção difícil.",

    feature3_title: "Transações rápidas",
    feature3_text:
      "Com tempo de bloco de aproximadamente 3 segundos, a Blurt oferece uma experiência rápida e responsiva para todas as interações.",

    feature4_title: "Validação de blocos",
    feature4_text:
      "Sistema de validação baseado em testemunhas (witnesses), responsáveis por produzir blocos e validar transações na rede.",

    feature5_title: "Governança descentralizada",
    feature5_text:
      "Cada usuário pode votar nas testemunhas que o representam utilizando seu Blurt Power, participando ativamente da governança da rede.",

    feature6_title: "Comunidade ativa",
    feature6_text:
      "Uma comunidade global de criadores de conteúdo, desenvolvedores e entusiastas que valorizam a descentralização e a liberdade de expressão.",



    // Stats
    stats_title: "Blurt em Números",
    stats_subtitle:
      "A Blurt Blockchain cresce constantemente com uma comunidade ativa e engajada.",
    stat1_label: "Milhões de Blocos",
    stat2_label: "Mil Contas",
    stat3_label: "Segundos por Bloco",
    stat4_label: "Testemunhas do consenso",

    // Guide

    guide_title: "Guia para Iniciantes",
    guide_subtitle:
      "Aprenda como começar na Blurt Blockchain em apenas 5 passos simples.",

    step1_short: "1",
    step2_short: "2",
    step3_short: "3",
    step4_short: "4",
    step5_short: "5",

    step1_title: "Crie sua conta na Blurt",
    step1_text:
      "Vá até blurtplugin.online/account/ e crie sua conta gratuitamente. Escolha um nome de usuário único e anote suas chaves de acesso em um local seguro. É como criar um perfil em uma rede social, mas com superpoderes! 💪 Basta acessar o site, escolher um nome legal e clicar em 'Criar Conta'. A criação é totalmente GRATUITA! 🎉",
    step1_tip:
      "💡 Dica: Salve suas chaves em um local seguro, de preferência offline.",

    step2_title: "Entenda suas chaves",
    step2_text:
      "Você receberá 4 chaves: Posting (para publicar conteúdo), Active (para transações), Owner (a chave mestra) e Memo (para mensagens privadas). Guarde-as com segurança! Imagine que suas chaves são senhas de um cofre de tesouros 🗝️💰 — cada uma tem um papel especial. A Posting é a que você mais usa, a Active é para coisas importantes, a Owner é a chave mestra (guarde MUITO bem!) e a Memo serve para mensagens secretas. Sempre anote e guarde tudo em um lugar seguro!",

    keybox_title: "🔐 Suas 4 chaves",
    key_posting: "<b>Posting:</b> Para postar, comentar e votar.",
    key_active: "<b>Active:</b> Para transações de BLURT.",
    key_owner: "<b>Owner:</b> Chave mestre — use apenas em emergências.",
    key_memo: "<b>Memo:</b> Para mensagens privadas.",
    step2_tip:
      "📘 Resumo: Posting para o dia a dia. Active apenas quando mexer com dinheiro.",

    step3_title: "Use o WhaleVault (recomendado)",
    step3_text:
      "Instale a extensão WhaleVault no seu navegador para armazenar suas chaves com segurança e facilitar o login em aplicativos da Blurt. O WhaleVault é como um cofre de baleia 🐋 que guarda suas chaves com segurança! Você instala, adiciona suas chaves uma única vez e depois faz login com apenas 1 clique. É mais prático, mais seguro e evita erros!",
    whalevault_title: "🔒 WhaleVault",
    whalevault_note: "Recomendado para manter sua conta mais segura e prática.",
    step3_tip: "🛡️ Segurança: Nunca compartilhe suas chaves com ninguém.",

    step4_title: "Faça seu primeiro post",
    step4_text:
      "Acesse Blurt.blog, faça login e publique seu primeiro conteúdo. Você pode escrever sobre qualquer assunto que goste! Hora de brilhar ✨ — clique em 'Novo Post', coloque um título legal, escreva algo que você gosta e, se quiser, adicione uma imagem bonita. Depois é só clicar em 'Publicar' e comemorar! 🎉 Dicas: use emojis, responda comentários e visite outros posts para interagir!",
    step4_note_title: "💡 Dica",
    step4_note_text:
      "Fale sobre você, seus interesses ou algo útil para a comunidade.",

    step5_title: "Ganhe recompensas e interaja",
    step5_text:
      "Conforme pessoas votam em seu conteúdo, você ganha tokens BLURT. Interaja com a comunidade, comente outros posts e faça parte do ecossistema! As recompensas liberam após 24 horas — é como ganhar um presente 🎁 por compartilhar coisas legais. Quanto mais você participa, mais a comunidade reconhece você!",
    step5_note_title: "🎉 Sabia?",
    step5_note_text:
      "Participar, comentar e criar conteúdo ajuda você a crescer mais rápido.",
    step5_tip:
      "🚀 Dica: Interagir com outros usuários aumenta sua visibilidade.",

    // Resources
    resources_title: "Recursos e Ferramentas",
    resources_subtitle:
      "Explore o ecossistema Blurt através destas ferramentas e recursos essenciais.",
    resource1_title: "Blurt Wallet",
    resource1_text:
      "Carteira oficial para gerenciar sua conta Blurt e fazer transações.",
    resource2_title: "Blurt.blog",
    resource2_text:
      "Plataforma de blogging descentralizada para publicar conteúdo.",
    resource3_title: "Explorador de Blocos",
    resource3_text:
      "Explore transações e blocos na blockchain Blurt em tempo real.",
    resource4_title: "Documentação",
    resource4_text:
      "Documentação completa para desenvolvedores da Blurt Blockchain.",
    access: "Acessar",

    // Footer
    footer_description:
      "A Blurt é uma blockchain de mídia social descentralizada que recompensa criadores de conteúdo com criptomoedas, garantindo liberdade de expressão e propriedade dos dados.",
    footer_title1: "Blurt",
    footer_title2: "Desenvolvedores",
    footer_title3: "Comunidade",
    footer_link1: "Início",
    footer_link2: "Recursos",
    footer_link3: "Estatísticas",
    footer_link4: "Guia",
    footer_link5: "Recursos",
    footer_link6: "Documentação",
    footer_link7: "GitHub",
    footer_link8: "Explorador de Blocos",
    footer_link9: "WhaleVault",
    footer_link10: "Blurt Wallet",
    footer_link11: "Blurt.blog",
    footer_link12: "Discord",
    footer_link13: "Telegram",
    footer_link14: "Twitter",
    footer_link15: "Site Oficial",
    footer_rights: "Todos os direitos reservados por @bgo.",
    footer_open_source:
      "A Blurt é uma blockchain de código aberto e descentralizada.",
    footer_tip:
      "Dica: Use o WhaleVault para uma experiência mais segura e fácil na Blurt!",
    resources_blurtstats_description:"Estimativa de curation.",
    resources_blurtmedia_description: "Compartilhe video",
    resources_microblog_description: "Focado para conteudo pequenos, parecido com o X",
    resources_beblurt_description: "Plataforma de blogging descentralizada para publicar conteúdo.",

  },
  en: {
    // Menu Section
    head_menu_home: "Home",
    head_menu_features: "Features",
    head_menu_stats: "Stats",
    head_menu_guide: "Guide",
    head_menu_resources: "Resources",
    head_menu_register: "Create Account",
    head_menu_buy: "Buy BLURT",
    // Hero Section
    hero_title: "The Decentralized Social Media Blockchain",
    hero_subtitle:
      "Blurt is a social media blockchain that rewards content creators with cryptocurrency. Our mission is to return power to users, eliminating intermediaries and ensuring freedom of expression.",
    hero_button1: "Get Started Now",
    hero_button2: "Explore Blog",
    live_data: "Real-time data from the Blurt blockchain",
    live_activity: "Live Activity",

    // Blockchain Info
    blockchain_info: "Blockchain Information",
    current_block: "Current Block",
    block_time: "Block Time",
    accounts: "Accounts",
    witnesses: "Witnesses",
    transactions: "Transactions (24h)",
    blurt_price: "BLURT Price",
    recent_transactions: "Recent Transactions",
    loading: "Loading...",

    // Features
    features_title: "Blurt Blockchain Features",
    features_subtitle:
      "Blurt is a blockchain that serves as the technological foundation for building decentralized social networks.",

    feature1_title: "Native reward system",
    feature1_text:
      "A native token distribution system based on Blurt Power, allowing users to vote on content and earn rewards through social interactions.",

    feature2_title: "Censorship resistance",
    feature2_text:
      "Content published on Blurt is stored immutably on the blockchain, making censorship or removal impossible.",

    feature3_title: "Fast transactions",
    feature3_text:
      "With an average block time of around 3 seconds, Blurt delivers a fast and responsive user experience for all interactions.",

    feature4_title: "Block validation",
    feature4_text:
      "A validation system based on witnesses, who are responsible for producing blocks and validating transactions on the network.",

    feature5_title: "Decentralized governance",
    feature5_text:
      "Each user can vote for the witnesses who represent them using their Blurt Power, actively participating in network governance.",

    feature6_title: "Active community",
    feature6_text:
      "A global community of content creators, developers, and enthusiasts who value decentralization and freedom of expression.",

    // Stats
    stats_title: "Blurt in Numbers",
    stats_subtitle:
      "The Blurt Blockchain is constantly growing with an active and engaged community.",
    stat1_label: "Million Blocks",
    stat2_label: "Thousand Accounts",
    stat3_label: "Seconds per Block",
    stat4_label: "Consensus Witnesses",

    // Guide
    guide_title: "Beginner's Guide",
    guide_subtitle:
      "Learn how to get started on the Blurt Blockchain in just 5 simple steps.",

    step1_short: "1",
    step2_short: "2",
    step3_short: "3",
    step4_short: "4",
    step5_short: "5",

    step1_title: "Create Your Blurt Account",
    step1_text:
      "Go to blurtplugin.online/account/ and create your account for free. Choose a unique username and write down your access keys in a safe place. It’s like creating a social media profile — but with superpowers! 💪 Just access the website, choose a cool username, and click 'Create Account'. The registration is completely FREE! 🎉",
    step1_tip: "💡 Tip: Save your keys in a safe place, preferably offline.",

    step2_title: "Understand Your Keys",
    step2_text:
      "You will receive 4 keys: Posting (for publishing content), Active (for transactions), Owner (the master key), and Memo (for private messages). Keep them safe! Think of your keys as passwords to a treasure vault 🗝️💰 — each one has a special role. Posting is the one you use most often, Active is for important operations, Owner is the master key (keep it VERY safe!), and Memo is used for secret messages. Always write everything down and store it securely!",

    keybox_title: "🔐 Your 4 Keys",
    key_posting: "<b>Posting:</b> For posting, commenting, and voting.",
    key_active: "<b>Active:</b> For BLURT transactions.",
    key_owner: "<b>Owner:</b> Master key — use it only in emergencies.",
    key_memo: "<b>Memo:</b> For private messages.",
    step2_tip:
      "📘 Summary: Posting for daily use. Active only when dealing with funds.",

    step3_title: "Use WhaleVault (Recommended)",
    step3_text:
"Install the WhaleVault extension in your browser to securely store your keys and easily log in to Blurt applications. WhaleVault is like a whale vault 🐋 that safely guards your keys! You install it, add your keys once, and then log in with just one click. It's more practical, safer, and avoids errors!",    whalevault_title: "🔒 WhaleVault",
    whalevault_note:
      "Recommended to keep your account safer and more convenient.",
    step3_tip: "🛡️ Security: Never share your keys with anyone.",

    step4_title: "Make Your First Post",
    step4_text:
      "Visit Blurt.blog, log in, and publish your first content. You can write about anything you like! Time to shine ✨ — click 'New Post', choose a nice title, write something you enjoy, and if you want, add a beautiful image. Then just click 'Publish' and celebrate! 🎉 Tips: use emojis, reply to comments, and visit other posts to interact!",
    step4_note_title: "💡 Tip",
    step4_note_text:
      "Talk about yourself, your interests, or something useful for the community.",

    step5_title: "Earn Rewards and Interact",
    step5_text:
      "As people vote on your content, you earn BLURT tokens. Interact with the community, comment on other posts, and be part of the ecosystem! Rewards are released after 24 hours — it’s like receiving a gift 🎁 for sharing cool content. The more you participate, the more the community recognizes you!",
    step5_note_title: "🎉 Did You Know?",
    step5_note_text:
      "Participating, commenting, and creating content helps you grow faster.",
    step5_tip: "🚀 Tip: Interacting with other users boosts your visibility.",

    // Resources
    resources_title: "Resources & Tools",
    resources_subtitle:
      "Explore the Blurt ecosystem through these essential tools and resources.",
    resource1_title: "Blurt Wallet",
    resource1_text:
      "Official wallet to manage your Blurt account and make transactions.",
    resource2_title: "Blurt.blog",
    resource2_text: "Decentralized blogging platform to publish content.",
    resource3_title: "Block Explorer",
    resource3_text:
      "Explore transactions and blocks on the Blurt blockchain in real time.",
    resource4_title: "Documentation",
    resource4_text: "Complete documentation for Blurt Blockchain developers.",
    access: "Access",

    // Footer
    footer_description:
      "Blurt is a decentralized social media blockchain that rewards content creators with cryptocurrency, ensuring freedom of expression and data ownership.",
    footer_title1: "Blurt",
    footer_title2: "Developers",
    footer_title3: "Community",
    footer_link1: "Home",
    footer_link2: "Features",
    footer_link3: "Statistics",
    footer_link4: "Guide",
    footer_link5: "Resources",
    footer_link6: "Documentation",
    footer_link7: "GitHub",
    footer_link8: "Block Explorer",
    footer_link9: "WhaleVault",
    footer_link10: "Blurt Wallet",
    footer_link11: "Blurt.blog",
    footer_link12: "Discord",
    footer_link13: "Telegram",
    footer_link14: "Twitter",
    footer_link15: "Official Site",
    footer_rights: "All rights reserved @bgo.",
    footer_open_source: "Blurt is an open source and decentralized blockchain.",
    footer_tip:
      "Tip: Use WhaleVault for a safer and easier experience on Blurt!",
      resources_blurtstats_description: "Estimated curation rewards.",
resources_blurtmedia_description: "Share videos.",
resources_microblog_description: "Focused on short-form content, similar to X.",
resources_beblurt_description: "A decentralized blogging platform for publishing content.",

  },
};
