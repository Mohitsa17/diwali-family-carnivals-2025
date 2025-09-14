'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const galleryImages = [
  '/1g.jpg',
  '/2g.jpg',
  '/3g.jpg',
  '/4g.jpg',
  '/5g.jpg',
  '/6g.jpg',
  '/7g.jpg',
  '/8g.jpg',
  '/9g.jpg',
  '/10g.jpg',
  '/11g.jpg',
  '/12g.jpg',
  '/13g.jpg',
  '/14g.jpg',
  '/15g.jpg',
  '/16g.jpg',
  '/17g.jpg',
  '/18g.jpg',
  '/19g.jpg',
  '/20g.jpg',
  '/21g.jpg',
  '/22g.jpg',
  '/23g.jpg',
  '/24g.jpg',
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  return (
    <div className="pt-1 min-h-screen bg-gray-50">




      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Photo Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Beautiful moments captured from our celebrations
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="break-inside-avoid cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    width={500}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <Image
                src={selectedImage}
                alt="Gallery image"
                width={800}
                height={600}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

