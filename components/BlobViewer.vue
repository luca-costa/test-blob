<script setup lang="ts">

interface BlobContent {
  content: string;
}

const props: { blobId: string } = { blobId: "test" };

const isLoading = ref(true);
const error = ref<string | null>(null);
const content = ref<BlobContent | null>(null);

const writeBlobContent = async (): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("content", props.blobId);

    await useFetch("/api/blob/write", {
      method: "POST",
      body: formData,
    });

  } catch (err) {
    error.value = "Failed to write blob content";
  }
};

const formattedContent = computed(() => {
  if (!content.value?.content) return "Loading...";
  return content.value.content;
});
</script>

<template>
  <div class="blob-viewer">
    <h2>Netlify Blob Writer</h2>

    <form @submit.prevent="writeBlobContent">
      <input v-model="props.blobId" type="text" placeholder="Enter blob ID" />
      <button type="submit">Write Blob</button>
    </form>

    <div v-if="isLoading" class="loading">Writing...</div>

    <pre v-if="formattedContent" class="content">{{ formattedContent }}</pre>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<style scoped>
.blob-viewer {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.loading,
.error {
  color: #ff0000;
  font-size: 14px;
}

.content {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
}
</style>
