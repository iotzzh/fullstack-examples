<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Health = {
  ok: boolean
  service: string
  time: string
}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'
const health = ref<Health | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchHealth() {
  loading.value = true
  error.value = null
  try {
    const base = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl
    const res = await fetch(`${base}/health`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    health.value = (await res.json()) as Health
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHealth()
})
</script>

<template>
  <div class="app">
    <el-container class="container">
      <el-header class="header">
        <div class="title">Fullstack Monorepo</div>
        <div class="subtitle">Vue3 + Element Plus / NestJS + Prisma</div>
      </el-header>

      <el-main>
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>后端健康检查</span>
              <el-button :loading="loading" type="primary" @click="fetchHealth">刷新</el-button>
            </div>
          </template>

          <el-alert
            v-if="error"
            type="error"
            show-icon
            :title="`请求失败：${error}`"
            class="mb"
          />

          <el-descriptions v-if="health" :column="1" border>
            <el-descriptions-item label="ok">{{ health.ok }}</el-descriptions-item>
            <el-descriptions-item label="service">{{ health.service }}</el-descriptions-item>
            <el-descriptions-item label="time">{{ health.time }}</el-descriptions-item>
            <el-descriptions-item label="baseURL">{{ apiBaseUrl }}</el-descriptions-item>
          </el-descriptions>

          <el-empty v-else-if="!loading && !error" description="暂无数据" />
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 24px;
  box-sizing: border-box;
}
.container {
  max-width: 980px;
  margin: 0 auto;
}
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 0 16px;
}
.title {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
}
.subtitle {
  margin-top: 6px;
  color: var(--el-text-color-secondary);
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.mb {
  margin-bottom: 12px;
}
</style>
