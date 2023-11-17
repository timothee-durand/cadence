<script setup lang="ts">
import {useVModel} from "@vueuse/core";



const props = defineProps<{
  code: string
}>()

const emits = defineEmits(['update:code'])

const vmodel = useVModel(props, 'code', emits)

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
  minimap: {
    enabled: false
  }
}
</script>

<template>
  <VueMonacoEditor
      class="min-h-[400px] mt-3"
      v-model:value="vmodel"
      theme="vs-dark"
      language="typescript"
      :options="MONACO_EDITOR_OPTIONS"
  />
</template>