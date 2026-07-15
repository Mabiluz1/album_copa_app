<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/about" />
        </ion-buttons>
        <ion-title>Política de Privacidade</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding legal-content">
      <h1>Política de Privacidade</h1>
      <p><strong>Última atualização:</strong> 15 de julho de 2026.</p>
      <p>
        O aplicativo armazena localmente os dados necessários ao cadastro, à
        autenticação e ao acompanhamento da coleção. Esses dados incluem nome,
        e-mail, credencial protegida e progresso das figurinhas.
      </p>
      <h2>Finalidade do tratamento</h2>
      <p>
        Os dados são utilizados para manter a sessão, separar a coleção de cada
        usuário, calcular estatísticas, ranking, favoritos, histórico e
        conquistas.
      </p>
      <h2>Armazenamento</h2>
      <p>
        As informações são persistidas no banco SQLite do aplicativo. O projeto
        não prevê o envio automático desses dados para servidores externos.
      </p>
      <h2>Controle do usuário</h2>
      <p>
        O usuário pode encerrar a sessão a qualquer momento. A remoção do
        aplicativo ou dos dados locais do dispositivo pode excluir as
        informações armazenadas, conforme o comportamento do sistema
        operacional.
      </p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue'
</script>

<style scoped>
.legal-content {
  --padding-bottom: 40px;
}

h1,
h2,
p {
  max-width: 760px;
  margin-inline: auto;
}
</style>
