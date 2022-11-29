<script setup lang="ts">
import Sharee from '../lib/Sharee'
import {onMounted, onUnmounted, ref} from 'vue';
import LangName from "../common/LangName";
import Lang from "../common/Lang";

interface ShareeOptions {
  lang?: LangName;
  langs?: { [key: string]: Lang };
  onLoad?: Function;
  drivers?: string[];
  showTransitionDuration?: string;
  shareLink?: string;
  shareText?: string;
  ripple?: boolean;
  mode?: 'dropdown' | 'dropdownRow' | 'dropdownGrid' | 'text' | 'normal' | 'fixed';
  modeOptions?: any
}

const props = defineProps<ShareeOptions>()
const shareeEl = ref<HTMLElement | null>(null)
const sharee = ref<Sharee | null>(null)

onMounted(() => {
  // @ts-ignore
  sharee.value = new Sharee(shareeEl.value!, props)
})

onUnmounted(() => {
  sharee.value?.destroy()
})

</script>
<template>
  <div ref="shareeEl"></div>
</template>
