<script setup lang="ts">
import type { ThemeMetas } from 'magic-color'
import { computed, ref, watch } from 'vue'
import RatioTableSquare from './RatioTableSquare.vue'

const props = defineProps<{
  colors: ThemeMetas
}>()

type ContrastType = 'WCAG' | 'APCA'

const contrasts: ContrastType[] = ['APCA', 'WCAG']
const WCAG_Options = [
  { label: 'All', value: 1 },
  { label: '4.5+ (AA)', value: 4.5 },
  { label: '7+ (AAA)', value: 7 },
]
const APCA_Options = [
  { label: 'All', value: 0 },
  { label: '75%+', value: 75 },
  { label: '90%+', value: 90 },
]

const ratio = ref(APCA_Options[0]?.value ?? 0)
const type = ref<ContrastType>('APCA')
const options = computed(() => type.value === 'WCAG' ? WCAG_Options : APCA_Options)

// 计算表格列数用于自适应
const columnsCount = computed(() => Object.keys(props.colors).length + 3) // 颜色列数 + White + Black + 行标题

watch(type, () => ratio.value = options.value[0]?.value || 0)

const fixedClass = 'aspect-square p-2 text-center'
const tdBaseClass = 'aspect-square p-0'
</script>

<template>
  <section mt-8>
    <div fcc mb-4 pr>
      <ul b="~ #ccc dark:#3c3c3c" p1 rd pa top-0 left-0 fcc gap-2>
        <li
          v-for="c in contrasts" :key="c"
          px-2 cursor-pointer rd-sm
          :class="type === c ? 'bg-purple/10 text-purple' : 'text-#666 dark:text-#999'"
          @click="type = c"
        >
          {{ c }}
        </li>
      </ul>
      <h2 fcc gap-1 w-fit text-xl text-transparent bg-clip-text bg-linear-to-r from-purple to-yellow>
        Ratio
        <i class="c-yellow/90" i-carbon-table-alias />
        Table
      </h2>
      <ul b="~ #ccc dark:#3c3c3c" p1 rd pa top-0 right-0 fcc gap-2>
        <li
          v-for="opt in options" :key="opt.value"
          px-2 cursor-pointer rd-sm
          :class="ratio === opt.value ? 'bg-yellow/10 text-yellow' : 'text-#666 dark:text-#999'"
          @click="ratio = opt.value"
        >
          {{ opt.label }}
        </li>
      </ul>
    </div>

    <div
      class="table-container mx-auto max-w-70vw w-full overflow-x-auto"
      :style="{ '--columns': columnsCount }"
    >
      <table class="ratio-table w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th :class="fixedClass" />
            <th :class="fixedClass">
              <div text-op-80>
                White
              </div>
            </th>
            <th v-for="(_, k) in colors" :key="k" :class="fixedClass" text-op-80>
              <div>{{ k }}</div>
            </th>
            <th :class="fixedClass">
              <div text-op-80>
                Black
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row">
            <td :class="fixedClass">
              <div text-op-80>
                White
              </div>
            </td>
            <td :class="tdBaseClass">
              <RatioTableSquare :type background-color="#fff" color="#fff" :ratio />
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`" :class="tdBaseClass">
              <RatioTableSquare :type :background-color="v" color="#fff" :ratio />
            </td>
            <td :class="tdBaseClass">
              <RatioTableSquare :type background-color="#000" color="#fff" :ratio />
            </td>
          </tr>

          <tr v-for="(_, k) in colors" :key="k" class="table-row">
            <td :class="fixedClass">
              <div text-op-80>
                {{ k }}
              </div>
            </td>
            <td :class="tdBaseClass">
              <RatioTableSquare :type background-color="#fff" :color="colors[k]" :ratio />
            </td>
            <td v-for="(v, j) in colors" :key="`${k}${j}${v}`" :class="tdBaseClass">
              <RatioTableSquare :type :background-color="v" :color="colors[k]" :ratio />
            </td>
            <td :class="tdBaseClass">
              <RatioTableSquare :type background-color="#000" :color="colors[k]" :ratio />
            </td>
          </tr>

          <tr class="table-row">
            <td :class="fixedClass">
              <div text-op-80>
                Black
              </div>
            </td>
            <td :class="tdBaseClass">
              <RatioTableSquare :type background-color="#fff" color="#000" :ratio />
            </td>
            <td v-for="(v, k) in colors" :key="`${k}${v}`" :class="tdBaseClass">
              <RatioTableSquare :type :background-color="v" color="#000" :ratio />
            </td>
            <td :class="tdBaseClass">
              <RatioTableSquare :type background-color="#000" color="#000" :ratio />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
li {
  list-style: none;
}

.table-container {
  width: 100%;
}
</style>
