# Troco de Aula

App de controle de gastos no campus, pensado para estudantes que querem acompanhar quanto gastam na cantina, no transporte e nos materiais de aula.

## Primeira versão

O app abre na aba **Semana**. A barra inferior permite ir ao **Histórico** e voltar. As duas telas mostram o estado vazio. A moeda com ponteiros de relógio e as cores verde-lousa e amarelo identificam o app.

## Como rodar

Use Node.js 22 LTS e npm.

```sh
git clone https://github.com/ImLuizz/troco-de-aula.git
cd troco-de-aula
npm install
npm start
```

Com o computador e o celular na mesma rede Wi-Fi, leia o QR code com o Expo Go compatível com o SDK 55. Para testar no navegador, pressione **w** no terminal. Toque nas duas abas para conferir a navegação.

## Próximas etapas

1. **Cadastro** — criar a tela com descrição, valor em reais e data. Destacar na interface um valor zero ou negativo, uma data inválida ou uma descrição vazia.
2. **Lista e resumo** — compartilhar os gastos com Context, exibir o histórico em uma `FlatList` e calcular o total dos últimos sete dias na aba Semana.
3. **Persistência** — ligar o Firebase Realtime Database, salvar com POST e buscar os registros com GET ao abrir. Conferir se um gasto fictício continua no histórico depois de fechar e reabrir.
4. **Feedback e entrega** — indicar carregamento, oferecer nova tentativa em caso de erro, testar no Expo Go e incluir no README duas capturas do app funcionando e as instruções do banco.

## Autores

Luiz Leli e Samuel Fernandes Filho · IFSP Campus Araraquara.

O projeto usa o Controle de Despesas da aula como referência. Usamos IA para propor o nome e o símbolo, preparar a navegação inicial e organizar este README.
