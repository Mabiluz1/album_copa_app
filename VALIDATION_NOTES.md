# Notas de validação

## Compatibilidade do SQLite no navegador

Durante a validação web, o `jeep-sqlite` apresentou `WebAssembly.instantiate(): Import #34 "a" "I": function import requires a callable` com `sql.js` 1.14.1. As discussões técnicas abaixo registram a mesma incompatibilidade e indicam fixar `sql.js` em 1.12.0 (ou anterior compatível) e copiar o `sql-wasm.wasm` da mesma versão para `public/assets`.

- https://github.com/capacitor-community/sqlite/issues/631
- https://github.com/sql-js/sql.js/issues/605
- https://github.com/capacitor-community/sqlite/issues/652

A correção aplicada no projeto foi: dependência direta `sql.js` 1.12.0, arquivo `public/assets/sql-wasm.wasm` copiado da instalação correspondente, registro do componente `jeep-sqlite` no bootstrap e chamada de `initWebStore()` antes da conexão. Após a correção, a aplicação abriu a tela de login normalmente no navegador.
