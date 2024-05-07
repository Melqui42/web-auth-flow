'use strict';

module.exports = {
  "types": [
    { "value": "feat",     "name": "✨ feat: Uma nova funcionalidade" },
    { "value": "fix",      "name": "🐛 fix:  Correção de bug" },
    { "value": "docs",     "name": "📚 docs:  Apenas alterações na documentação" },
    { "value": "style",    "name": "💅 style:  Alterações que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula ausente, etc)" },
    { "value": "refactor", "name": "🧰 refactor:  Alteração de código que não corrige um bug nem adiciona uma funcionalidade" },
    { "value": "perf",     "name": "✨ perf:  Alteração de código que melhora o desempenho" },
    { "value": "test",     "name": "🔍 test:  Adição de testes ausentes" },
    { "value": "chore",    "name": "🚀 chore:  Alterações no processo de construção ou em ferramentas auxiliares e bibliotecas, como geração de documentação" },
    { "value": "revert",   "name": "⏪ revert:  Reverter para um commit anterior" },
],

scopes: [
  {name: 'setup'},
  {name: 'static'},
  {name: 'server'},
  {name: 'ml'},
  {name: '*'}
],

  messages: {
    type: 'Selecione o tipo de alteração que você está comprometendo:',
    scope: '\nIndique o ESCOPO desta mudança (opcional):',
    // used if allowCustomScopes is true
    customScope: 'Indique o ESCOPO desta mudança:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
    body: 'Forneça uma descrição MAIS LONGA da alteração (opcional). Use "|" para quebrar nova linha:\n',
    breaking: 'Liste quaisquer ALTERAÇÕES ÚLTIMAS (opcional):\n',
    footer: 'Liste quaisquer PROBLEMAS FECHADOS por esta mudança (opcional). Ex.: #31, #34:\n',
    confirmCommit: 'Tem certeza de que deseja prosseguir com o commit acima?'
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'perf'],

  // limit subject length
  subjectLimit: 100
};