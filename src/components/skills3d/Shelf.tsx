import { useMemo } from 'react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { Book } from './Book'
import { getSkillMeta } from '../../data/skillsMeta'

const SHELF_WIDTH = 6
const SHELF_DEPTH = 0.4
const SHELF_HEIGHT = 0.06
const ROW_SPACING = 1.2
const BOOK_HEIGHT = 0.5
const BOOK_WIDTH = 0.9
const BOOK_GAP = 0.08

export const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#61dafb',
  backend: '#68a063',
  databases: '#336791',
  tools: '#f0ad4e',
}

export interface ShelfProps {
  categoryKey: string
  categoryLabel: string
  skills: string[]
  rowIndex: number
  selectedBook: { categoryKey: string; skillName: string } | null
  onSelectBook: (categoryKey: string, skillName: string) => void
  onReportBookPosition: (position: THREE.Vector3) => void
}

export function Shelf({
  categoryKey,
  categoryLabel,
  skills,
  rowIndex,
  selectedBook,
  onSelectBook,
  onReportBookPosition,
}: ShelfProps) {
  const color = CATEGORY_COLORS[categoryKey.split('.').pop() ?? ''] ?? '#888'
  const y = rowIndex * ROW_SPACING
  const totalBooksWidth = skills.length * (BOOK_WIDTH + BOOK_GAP) - BOOK_GAP
  const startX = -totalBooksWidth / 2 + (BOOK_WIDTH + BOOK_GAP) / 2

  const shelfMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#5c4033',
        roughness: 0.9,
        metalness: 0.05,
      }),
    []
  )

  return (
    <group position={[0, y, 0]}>
      {/* Shelf board */}
      <mesh position={[0, -BOOK_HEIGHT / 2 - SHELF_HEIGHT / 2, 0]} material={shelfMaterial}>
        <boxGeometry args={[SHELF_WIDTH, SHELF_HEIGHT, SHELF_DEPTH]} />
      </mesh>
      {/* Category label */}
      <Text
        position={[-SHELF_WIDTH / 2 - 0.5, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        fontSize={0.14}
        color="#8b7355"
        anchorX="center"
        anchorY="middle"
      >
        {categoryLabel}
      </Text>
      {/* Books */}
      {skills.map((skillName, index) => (
        <Book
          key={skillName}
          name={skillName}
          meta={getSkillMeta(skillName)}
          color={color}
          index={index}
          startX={startX}
          isSelected={selectedBook?.categoryKey === categoryKey && selectedBook?.skillName === skillName}
          onSelect={() => onSelectBook(categoryKey, skillName)}
          onReportPosition={onReportBookPosition}
        />
      ))}
    </group>
  )
}
