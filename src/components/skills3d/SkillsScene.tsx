import React, { useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Shelf } from './Shelf'
import profileData from '../../data/profile.json'

const CAMERA_LERP = 0.04
const HOME_POSITION = new THREE.Vector3(0, 1.5, 5)
const HOME_LOOKAT = new THREE.Vector3(0, 0.5, 0)
const ZOOM_OFFSET = new THREE.Vector3(0, 0, 2.2)

const SHELF_ROWS = [
  { key: 'skills.frontend', labelKey: 'skills.frontend', skills: profileData.skills.frontend },
  { key: 'skills.backend', labelKey: 'skills.backend', skills: profileData.skills.backend },
  { key: 'skills.databases', labelKey: 'skills.databases', skills: profileData.skills.databases },
  { key: 'skills.tools', labelKey: 'skills.tools', skills: profileData.skills.tools },
] as const

export type SelectedBook = { categoryKey: string; skillName: string } | null

function SceneContent({
  selectedBook,
  onSelectBook,
  categoryLabels,
}: {
  selectedBook: SelectedBook
  onSelectBook: (categoryKey: string, skillName: string) => void
  categoryLabels: Record<string, string>
}) {
  const { camera } = useThree()
  const targetPosition = useRef(new THREE.Vector3().copy(HOME_POSITION))
  const targetLookAt = useRef(new THREE.Vector3().copy(HOME_LOOKAT))
  const selectedBookPosition = useRef(new THREE.Vector3(0, 0, 0))

  const reportBookPosition = useCallback((position: THREE.Vector3) => {
    selectedBookPosition.current.copy(position)
  }, [])

  useFrame(() => {
    if (selectedBook) {
      targetPosition.current.copy(selectedBookPosition.current).add(ZOOM_OFFSET)
      targetLookAt.current.copy(selectedBookPosition.current)
    } else {
      targetPosition.current.copy(HOME_POSITION)
      targetLookAt.current.copy(HOME_LOOKAT)
    }
    camera.position.lerp(targetPosition.current, CAMERA_LERP)
    const lookAt = targetLookAt.current
    // Simple look-at by lerping forward direction
    const dir = new THREE.Vector3().subVectors(lookAt, camera.position).normalize()
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, -1),
      dir
    )
    camera.quaternion.slerp(quat, CAMERA_LERP)
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, 3]} intensity={0.4} />
      <group position={[0, -1.5, 0]}>
        {SHELF_ROWS.map((row, index) => (
          <Shelf
            key={row.key}
            categoryKey={row.key}
            categoryLabel={categoryLabels[row.labelKey] ?? row.labelKey}
            skills={row.skills}
            rowIndex={index}
            selectedBook={selectedBook}
            onSelectBook={onSelectBook}
            onReportBookPosition={reportBookPosition}
          />
        ))}
      </group>
    </>
  )
}

// useThree must be used inside Canvas; wrap content in a component that uses it
function SceneWithCamera({
  selectedBook,
  setSelectedBook,
  categoryLabels,
}: {
  selectedBook: SelectedBook
  setSelectedBook: React.Dispatch<React.SetStateAction<SelectedBook>>
  categoryLabels: Record<string, string>
}) {
  const handleSelect = useCallback(
    (categoryKey: string, skillName: string) => {
      setSelectedBook((prev: SelectedBook) =>
        prev?.categoryKey === categoryKey && prev?.skillName === skillName
          ? null
          : { categoryKey, skillName }
      )
    },
    [setSelectedBook]
  )

  return (
    <SceneContent
      selectedBook={selectedBook}
      onSelectBook={handleSelect}
      categoryLabels={categoryLabels}
    />
  )
}

export interface SkillsSceneProps {
  categoryLabels: Record<string, string>
}

export function SkillsScene({ categoryLabels }: SkillsSceneProps) {
  const [selectedBook, setSelectedBook] = useState<SelectedBook>(null)

  return (
    <div className="skills-3d-container">
      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => setSelectedBook(null)}
      >
        <SceneWithCamera
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          categoryLabels={categoryLabels}
        />
      </Canvas>
    </div>
  )
}
