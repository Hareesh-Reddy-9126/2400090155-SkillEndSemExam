import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // Image preview state (data URL)
  const [imageSrc, setImageSrc] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('previewImage')
      if (saved) setImageSrc(saved)
    } catch (e) {
      console.error('Failed to read image from localStorage', e)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      setImageSrc(dataUrl)
      try {
        localStorage.setItem('previewImage', dataUrl)
      } catch (err) {
        console.error('Failed to save image to localStorage', err)
      }
    }
    reader.readAsDataURL(file)
  }

  const chooseFile = () => inputRef.current && inputRef.current.click()

  const removeImage = () => {
    setImageSrc(null)
    try {
      localStorage.removeItem('previewImage')
    } catch (e) {
      console.error('Failed to remove image from localStorage', e)
    }
    if (inputRef.current) inputRef.current.value = null
  }

  return (
    <div className="app">
      <main className="glass-card">
        <header className="header">
          <p className="eyebrow">Profile avatar</p>
          <h1 className="title">Drop in a new vibe</h1>
          <p className="subtitle">Upload any square or rectangular photo—the preview keeps it perfectly round like a profile avatar. Saved privately in this browser via localStorage.</p>
        </header>

        <section className="avatar-section">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <button className="avatar-frame" onClick={chooseFile} type="button">
            {imageSrc ? (
              <img src={imageSrc} alt="Selected profile" className="avatar-img" />
            ) : (
              <span className="avatar-placeholder">Tap to upload</span>
            )}
          </button>

          <div className="controls">
            <button className="primary" onClick={chooseFile} type="button">
              {imageSrc ? 'Choose another photo' : 'Upload photo'}
            </button>
            {imageSrc && (
              <button className="ghost" onClick={removeImage} type="button">
                Remove image
              </button>
            )}
          </div>
        </section>

        <footer className="footer">
          <small>✨ Nothing leaves your device. We only keep the preview in localStorage.</small>
        </footer>
      </main>
    </div>
  )
}

export default App
