<script setup lang="ts">

import {ref} from "vue";
import CodeEditor from "@/components/ui/codeeditor/CodeEditor.vue";

const code = ref('const coucou = "coucou"');
</script>

<template>
  <main>
    <CodeEditor v-model:code="code" />
  </main>
</template>
