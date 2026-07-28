'use client'

import { useState } from 'react'

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null)

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="border rounded-lg p-6 bg-gray-50">

      <h3 className="text-lg font-semibold mb-4">
        Upload de Imagem
      </h3>

      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
      />

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg border"
          />
        </div>
      )}

    </div>
  )
}