<script setup>
defineProps({
    answerByUuid: {
      // type: Array,
    // type: Object,
    required: true
  }
})
</script>

<template>
  <div>
    <table class="tableau">
        <!-- entête du tableau -->
        <thead>
            <tr>
                <th>Numéro de la question</th>
                <th>Corps de la question</th>
                <th>La réponse en texte</th>
            </tr>
        </thead>
        <!-- corps du tableau -->
        <tbody v-for="el in answerByUuid" :key="el.id">
            <tr>
                <td>{{ el.id }}</td>
                <td>{{ el.question_value}}</td>
                <td>{{ el.value }}</td>
            </tr>
        </tbody>
         
    </table>
  </div>
</template>

<style scoped>

</style>
