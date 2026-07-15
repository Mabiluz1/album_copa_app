# Plano de implementação

**Projeto:** Álbum Digital da Copa
**Escopo:** requisitos de 10/06, 01/07, 08/07 e 15/07/2026

## Diagnóstico

O projeto é um aplicativo Ionic Vue com Capacitor Android e `@capacitor-community/sqlite`. O ZIP já contém alterações não commitadas relacionadas a autenticação, figurinhas, raridade e conquistas, mas a implementação está incompleta. A inicialização do banco não é chamada corretamente em `App.vue`, a coleção é global em vez de associada ao usuário, a sessão existe apenas em memória, as conquistas usam `USER_ID = 1`, as abas de Estatísticas e Conquistas não estão integradas e os campos `favorite` e `collected_at` não existem.

## Arquitetura adotada

A aplicação continuará separada em `components`, `views`, `composables`, `services`, `database` e `models`. O catálogo de figurinhas será persistido na tabela `stickers`; os estados variáveis de cada usuário ficarão em `user_stickers`. Dessa forma, usuários distintos podem ter coleções, favoritos, histórico, estatísticas, ranking e conquistas independentes.

| Camada | Responsabilidade |
|---|---|
| `models` | Tipos de domínio para usuário, figurinha, conquista, estatísticas e ranking |
| `database` | Esquema SQL versionado e catálogo inicial usado somente no primeiro carregamento |
| `services` | Inicialização, migrações e consultas parametrizadas ao SQLite |
| `composables` | Estado reativo de autenticação, álbum, estatísticas e conquistas |
| `components` | Cartões de figurinha e componentes visuais reutilizáveis |
| `views` | Telas de álbum, coleção, estatísticas, conquistas, perfil e sobre |

## Esquema SQLite

| Tabela | Campos principais | Finalidade |
|---|---|---|
| `usuarios` | `id`, `nome`, `email`, `senha`, `created_at` | Cadastro e login persistentes |
| `app_session` | `id`, `user_id`, `updated_at` | Restauração do usuário autenticado |
| `stickers` | `id`, `nome`, `selecao`, `foto`, `raridade` | Catálogo persistido |
| `user_stickers` | `user_id`, `sticker_id`, `coletada`, `favorite`, `collected_at` | Estado individual da coleção |
| `achievements` | `id`, `nome`, `descricao`, `icone`, `meta`, `tipo`, `selecao` | Definições de conquistas |
| `user_achievements` | `user_id`, `achievement_id`, `data_desbloqueio` | Desbloqueios persistidos |

As migrações serão idempotentes. Dados legados das colunas `stickers.coletada`, `stickers.favorite` e `stickers.collected_at`, quando existentes, serão migrados para `user_stickers` para o primeiro usuário cadastrado. O banco será inicializado antes da montagem da aplicação.

## Regras de cálculo

As consultas de coleção e filtros serão executadas diretamente no SQLite. Estatísticas serão agregadas com `COUNT`, `SUM` e condições SQL. A pontuação será calculada por raridade: comum vale 1 ponto, rara vale 5 e brilhante vale 10. O nível será Bronze de 0 a 100, Prata de 101 a 250, Ouro de 251 a 500 e Diamante acima de 500.

As conquistas serão recalculadas após cada alteração do status de coleta. Um desbloqueio será inserido com `INSERT OR IGNORE`, preservando a primeira data mesmo se a figurinha for posteriormente desmarcada. Além das dez insígnias especificadas, haverá uma conquista de coleção específica para completar todas as figurinhas do Brasil, atendendo ao requisito de conclusão de coleções específicas.

## Navegação e interface

A barra de abas será reorganizada para acomodar Álbum, Coleção, Estatísticas, Conquistas e Perfil. A página Sobre ficará acessível pelo Perfil para evitar excesso de abas. Serão usados `IonCard`, `IonBadge`, `IonProgressBar`, `IonIcon`, `IonButton`, `IonChip`, `IonList`, `IonItem` e `IonLabel` conforme os requisitos.

## Validação

A entrega será validada com checagem TypeScript, build de produção, lint quando aplicável e testes unitários para funções determinísticas de ranking. Também serão verificados o esquema SQL, consultas parametrizadas, ausência de estados principais mockados em memória e consistência das rotas.
