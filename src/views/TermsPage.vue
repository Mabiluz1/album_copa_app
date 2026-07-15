<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/about" />
        </ion-buttons>
        <ion-title>Termos de Uso</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding legal-content">
      <h1>Termos de Uso</h1>
      <p><strong>Última atualização:</strong> 15 de julho de 2026.</p>
      <p>
        O Álbum Digital da Copa é destinado ao acompanhamento pessoal de uma
        coleção de figurinhas. Ao utilizar o aplicativo, o usuário concorda em
        fornecer informações verdadeiras no cadastro e manter a segurança de
        sua senha.
      </p>
      <h2>Uso permitido</h2>
      <p>
        O aplicativo deve ser utilizado de forma lícita. É proibido tentar
        comprometer seu funcionamento, acessar dados de terceiros ou utilizar
        o software para finalidades abusivas.
      </p>
      <h2>Disponibilidade e alterações</h2>
      <p>
        Funcionalidades, catálogo e regras de pontuação podem ser atualizados
        para aperfeiçoar a experiência. Os dados locais permanecem sujeitos às
        rotinas de armazenamento e backup do dispositivo.
      </p>
      <h2>Responsabilidade</h2>
      <p>
        O aplicativo é uma ferramenta acadêmica de organização de coleção e não
        representa nem substitui serviços oficiais de fabricantes ou entidades
        esportivas.
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
