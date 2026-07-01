'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls, Html } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import { Mesh } from 'three'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface GalleryImage {
  id: number
  src: string
  title: string
  width: number
  height: number
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/gallery-1.png',
    title: 'Moment One',
    width: 400,
    height: 300,
  },
  {
    id: 2,
    src: '/gallery-2.png',
    title: 'Moment Two',
    width: 400,
    height: 300,
  },
  {
    id: 3,
    src: '/gallery-3.png',
    title: 'Moment Three',
    width: 400,
    height: 300,
  },
  {
    id: 4,
    src: '/gallery-4.png',
    title: 'Moment Four',
    width: 400,
    height: 300,
  },
]

function GalleryFrame({ image, position }: { image: GalleryImage; position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <planeGeometry args={[2.4, 1.8]} />
      <meshStandardMaterial color="#1a1a1a" />
      <Html transform scale={0.001} position={[0, 0, 0.1]}>
        <div className="w-96 h-72 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={image.src}
            alt={image.title}
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </Html>
    </mesh>
  )
}

function Scene() {
  const positions: [number, number, number][] = [
    [-3, 0, 0],
    [-1, 0, -2],
    [1, 0, -2],
    [3, 0, 0],
  ]

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#d4af37" />

      {/* Gallery Frames */}
      {galleryImages.map((image, index) => (
        <GalleryFrame key={image.id} image={image} position={positions[index % positions.length]} />
      ))}
    </>
  )
}

export function ThreeDGallery() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-background to-gray-900">
      <Canvas
        style={{
          width: '100%',
          height: '100%',
        }}
        camera={{ position: [0, 0, 8] }}
      >
        <Scene />
      </Canvas>

      {/* Overlay Info */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center z-10"
        >
          <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Explore the gallery</p>
          <p className="text-gray-500 text-xs">Drag • Zoom • Rotate</p>
        </motion.div>
      </div>
    </div>
  )
}
