# Foco do Vitor em IA aplicada

## Agentes de IA como prática de equipe
Vitor fez parte da equipe que estabeleceu o uso de agentes de IA como prática padrão na LEVTY, sugerindo novas aplicações. Não é modismo: faz parte real do fluxo de entrega.

## Revisão de código assistida por IA
Usa IA para elevar a qualidade do código, não só a velocidade: revisão assistida como camada extra antes do merge.

## RAG e agentes com LangChain e LangGraph
Constrói pipelines de recuperação aumentada (RAG) e orquestração de agentes para automatizar tarefas complexas de negócio.

## Spec-Driven Development
Especificações claras que guiam tanto humanos quanto agentes de IA. É a ponte entre engenharia de software sólida e IA aplicada de verdade.

## Ferramentas de IA que o Vitor usa
Vitor usa majoritariamente o Claude Code no dia a dia de desenvolvimento. Também já integrou aplicações com as APIs da Anthropic, do Gemini (Google) e da OpenAI.

## Pipeline de IA com múltiplos agentes
Vitor construiu um pipeline de IA multiagente que recebe um brief e incrementa um sistema existente com novos módulos. O fluxo imita um time de produto e engenharia: cada agente tem um papel distinto e usa o modelo de IA mais adequado para aquela etapa, com diferentes IAs conectadas entre si (Gemini e Claude).

## Pipeline multiagente — agentes e papéis
1. Analista (Gemini Flash): enriquece o prompt do usuário com o contexto atual do sistema, buscando entender a dor real do usuário e o que ele precisa.
2. PO, Product Owner (Claude Haiku): mapeia o brief enriquecido em User Stories.
3. Arquiteto (Claude Sonnet): recebe as User Stories e o plano inicial e define a abordagem arquitetural do módulo, considerando o estado atual do sistema.
4. Desenvolvedor (Claude Opus 4.8): implementa o módulo e fica em loop com o QA.
5. QA: escreve e roda testes unitários e de integração em loop com o desenvolvedor, até todos passarem.
6. PO, validação final (Claude Sonnet com Playwright): volta para o PO, que valida o resultado final com testes no navegador via Playwright.

## Pipeline multiagente — decisões de design
- Cada etapa usa o modelo com o melhor custo-benefício para o papel: modelos mais leves para análise e organização (Gemini Flash, Haiku) e modelos mais fortes para arquitetura e código (Sonnet, Opus).
- Há dois ciclos de qualidade: o loop desenvolvedor e QA, que só termina com os testes passando, e a validação final do PO no navegador com Playwright.
- O contexto atual do sistema é injetado nas etapas de análise e arquitetura, para que o novo módulo se encaixe no que já existe, em vez de partir do zero.
- O fluxo reflete a prática de Spec-Driven Development: do pedido do usuário a User Stories, depois a arquitetura e só então ao código.

## Este chat do portfólio
O assistente deste site foi feito pelo próprio Vitor como exemplo de IA aplicada: usa o Gemini Flash no plano gratuito e RAG sobre uma base de conhecimento com dados do Vitor, com escopo restrito a perguntas sobre ele, limite de uso e proteções contra prompt injection.
