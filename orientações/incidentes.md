
1

Automatic Zoom
Incidentes Activesoft
DRI: Zaedy Dantas Laura Tararam
Objetivo
Este documento apresenta o novo fluxo de identificação, triagem e acompanhamento de
incidentes, bugs e tarefas com o objetivo de dar mais clareza sobre quem faz o quê e
como garantir que os problemas críticos sejam tratados com a urgência e visibilidade
que exigem.
Incidente – Criticidade - Grave: Problema em funcionalidade “core” para escolas ou
famílias, problemas graves de performance que afetam a realização de ações que
impactam escolas ou RFs. Geralmente são generalizados (afetam muitos usuários) e
precisam de atuação no mesmo dia do report, com expectativa de que sejam resolvidos
em até 24hs. São direcionados para o canal #as-incidentes e #as-triagem-incidentes
Fluxo incidentes
Este fluxo será operado por meio de dois canais no Slack:
● #as-triagem-incidentes → Canal aberto para qualquer pessoa reportar
instabilidades, lentidão ou interrupções no sistema. O time de ProdTech fará a
triagem para avaliar se o caso deve ser tratado como incidente ou não.
● #as-incidentes → Canal exclusivo para o registro oficial e acompanhamento de
incidentes, feito apenas pelo time de ProdTech. Todos podem acompanhar e
interagir nas threads.
Essa estrutura nos ajuda a priorizar o que realmente importa, com visibilidade e
organização.
● Chamado recebido em N1
● Percebe-se alguma situação fora do normal e encaminha para N1+
1. Ao perceber que existem mais de 5 casos do mesmo tema, de diferentes
escolas, em um curto espaço de tempo (15 minutos):
a. Abrir o fluxo de Triagem de incidentes (#as-triagem-incidentes)
b. Enviar para N2 com WIKI preenchida
c. N2 deve criar o ticket Problema para vincular todos os tickets do
mesmo caso
2. N1+ entende que é um bug, mas é específico da escola:
a. Enviar para N2 com WIKI preenchida
b. N2 deve criar o ticket Problema para vincular todos os tickets do
mesmo caso
Após triagem ser aberta no canal #as-triagem-incidentes, o time de ProdTech deve
avaliar se é realmente um incidente ou não:
1. ProdTech entendeu que era realmente incidente:
a. Um incidente é aberto no canal #as-incidentes pelo próprio time de
ProdTech.
i. Ticket PROBLEMA em Aberto é ajustado para INCIDENTE ou
INTERMITÊNCIA DO SISTEMA
ii. Quando resolvido, todos os tickets INCIDENTES vinculados ao
PROBLEMA devem ser ajustados para INCIDENTE no campo Definição
do tipo de incidente
2. ProdTech entendeu que não era incidente:
a. Uma resposta na thread de #as-triagem-incidentes é enviada ao time de
N2 suporte que deve ser aberto um card de bug no Linear no canal
#as-prodtech-n3
i. Ticket PROBLEMA em aberto é ajustado para BUG
ii. Quando resolvido, todos os tickets INCIDENTES vinculados ao
PROBLEMA devem ser ajustados para BUG no campo: Definição do
tipo de incidente.
Quinzenalmente, o time de ProdTech realiza uma reunião para entender se um incidente
realmente era um incidente ou se um caso registrado como bug deveria ter sido
incidente. Caso esses casos sejam ajustados, o time de ProdTech deve avisar o time de
Suporte N2 para que os tickets sejam ajustados para a categorização correta no campo:
Definição do tipo de incidente. Isso será possível, pois o ticket no suporte só será Fechado,
ou seja, não pode ser modificado após 16 dias corridos.