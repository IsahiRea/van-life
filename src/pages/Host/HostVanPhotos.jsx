import { useOutletContext } from "react-router"
import "../../css/pages/host/host-van-photos.css"

export default function HostVanPhotos() {
    const { currentVan } = useOutletContext()

    // Create placeholder images for the gallery (using the same van image)
    const galleryImages = [
        { id: 1, url: currentVan.imageUrl, alt: `${currentVan.name} - Photo 1` },
        { id: 2, url: currentVan.imageUrl, alt: `${currentVan.name} - Photo 2` },
        { id: 3, url: currentVan.imageUrl, alt: `${currentVan.name} - Photo 3` },
        { id: 4, url: currentVan.imageUrl, alt: `${currentVan.name} - Photo 4` }
    ]

    return (
        <div className="host-van-photos">
            <h3 className="photos-heading">Image Gallery</h3>

            <div className="photos-gallery-grid">
                {galleryImages.map(image => (
                    <div key={image.id} className="gallery-image-container">
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="gallery-image"
                        />
                    </div>
                ))}
            </div>

            <div className="photos-upload-section">
                <div className="upload-icon-container">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect x="4" y="4" width="24" height="24" rx="4" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="#FF8C38" strokeWidth="2"/>
                        <path d="M28 20L22 14L8 28" stroke="#FF8C38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h4 className="upload-heading">Add More Photos</h4>
                <p className="upload-description">
                    High-quality images help attract more renters. Upload additional photos of your van.
                </p>
                <button className="upload-button" onClick={() => {}}>
                    Upload Photos
                </button>
            </div>
        </div>
    )
}