import { useEffect, useState } from 'react'
import './GalleryModal.css'

interface GalleryModalProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  title: string
}

const GalleryModal = ({ images, isOpen, onClose, title }: GalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, images.length, onClose])

  if (!isOpen) return null

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-modal-header">
          <h2 className="gallery-modal-title">{title}</h2>
          <button className="gallery-modal-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>
        
        <div className="gallery-modal-main">
          <button 
            className="gallery-modal-nav gallery-modal-nav-prev" 
            onClick={handlePrevious}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          
          <div className="gallery-modal-image-container">
            <img 
              src={images[currentIndex]} 
              alt={`${title} - Imagen ${currentIndex + 1}`}
              className="gallery-modal-image"
            />
            <div className="gallery-modal-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
          
          <button 
            className="gallery-modal-nav gallery-modal-nav-next" 
            onClick={handleNext}
            aria-label="Imagen siguiente"
          >
            ›
          </button>
        </div>

        {images.length > 1 && (
          <div className="gallery-modal-thumbnails">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Miniatura ${index + 1}`}
                className={`gallery-modal-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GalleryModal
