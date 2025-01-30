import { defineEventHandler } from 'h3'
import { getStore } from '@netlify/blobs'

export default defineEventHandler(async (event) => {
  // const { id } = event.body
  const id = 'test'

  // if (!id) {
  //   return new Response('Missing required parameter', { status: 400 })
  // }

  try {
    const store = getStore({ name: 'my-blob-store' })

    await store.set(id, new Blob(['test']))

    return new Response('Blob successfully written', { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('Error writing blob', { status: 500 })
  }
})
