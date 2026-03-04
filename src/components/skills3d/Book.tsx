import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import type { SkillMeta } from '../../data/skillsMeta'

const BOOK_WIDTH = 0.9
const BOOK_HEIGHT = 0.5
const BOOK_DEPTH = 0.12
const SPINE_WIDTH = BOOK_WIDTH / 2
const COVER_WIDTH = BOOK_WIDTH / 2
const BOOK_GAP = 0.08
const LERP = 0.12

export interface BookProps {
  name: string
  meta: SkillMeta
  color: string
  index: number
  startX: number
  isSelected: boolean
  onSelect: () => void
  onReportPosition: (position: THREE.Vector3) => void
}

export function Book({ name, meta, color, index, startX, isSelected, onSelect, onReportPosition }: BookProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pivotRef = useRef<THREE.Group>(null)
  const interiorRef = useRef<THREE.Group>(null)
  const openRef = useRef(0)

  useFrame(() => {
    const target = isSelected ? 1 : 0
    openRef.current += (target - openRef.current) * LERP
    const open = openRef.current
    if (pivotRef.current) {
      pivotRef.current.rotation.y = -open * Math.PI * 0.5
    }
    if (interiorRef.current) {
      interiorRef.current.visible = open > 0.35
    }
    if (isSelected && groupRef.current) {
      const world = new THREE.Vector3()
      groupRef.current.getWorldPosition(world)
      onReportPosition(world)
    }
  })

  const spineMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color).multiplyScalar(0.7),
        roughness: 0.8,
        metalness: 0.1,
      }),
    [color]
  )

  const coverMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.6,
        metalness: 0.05,
      }),
    [color]
  )

  const pageMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f5f0e6',
        roughness: 0.95,
        metalness: 0,
      }),
    []
  )

  return (
    <group ref={groupRef} position={[startX + index * (BOOK_WIDTH + BOOK_GAP), 0, 0]}>
      {/* Spine half (fixed) */}
      <mesh position={[-COVER_WIDTH / 2, 0, 0]} material={spineMaterial}>
        <boxGeometry args={[SPINE_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
      </mesh>
      {/* Spine label (on the left face) */}
      <Text
        position={[-BOOK_WIDTH / 2 - 0.02, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.08}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        maxWidth={BOOK_HEIGHT - 0.05}
      >
        {name}
      </Text>
      {/* Cover half (opens) */}
      <group ref={pivotRef} position={[0, 0, 0]}>
        <mesh position={[COVER_WIDTH / 2, 0, 0]} material={coverMaterial} onClick={(e) => (e.stopPropagation(), onSelect())}>
          <boxGeometry args={[COVER_WIDTH, BOOK_HEIGHT, BOOK_DEPTH]} />
        </mesh>
      </group>
      {/* Interior (visibility toggled in useFrame when open > 0.35) */}
      <group ref={interiorRef} position={[0, 0, BOOK_DEPTH / 2 + 0.01]} visible={false}>
        <mesh position={[0.2, 0.1, 0]} material={pageMaterial}>
          <planeGeometry args={[BOOK_WIDTH * 0.85, BOOK_HEIGHT * 0.8]} />
        </mesh>
        <Text position={[0.2, 0.15, 0.02]} fontSize={0.1} color="#1a1a1a" anchorX="center" anchorY="top">
          {name}
        </Text>
        <Text position={[0.2, 0.02, 0.02]} fontSize={0.06} color="#333" anchorX="center" anchorY="middle">
          {meta.years === '—' ? '—' : `${meta.years} years`}
        </Text>
        <Text
          position={[0.2, -0.12, 0.02]}
          fontSize={0.045}
          color="#444"
          anchorX="center"
          anchorY="middle"
          maxWidth={BOOK_WIDTH * 0.7}
        >
          {meta.description}
        </Text>
      </group>
    </group>
  )
}
