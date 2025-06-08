'use client'

import { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Text3D, Center, Edges } from '@react-three/drei';


export default function GridWireCube({ scale = 1, rotateCube = false, post }: { scale?: number; rotateCube?: boolean; post: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)

  const lines = useMemo(() => {
    const segments: THREE.Vector3[] = []
    const divisions = 2 // 👉 2x2 grid = 3 lines per axis
    const step = 1 / divisions
    const half = 0.5

    const createGrid = (
      normal: THREE.Vector3,
      tangent: THREE.Vector3,
      bitangent: THREE.Vector3
    ) => {
      for (let i = 0; i <= divisions; i++) {
        const offset = -half + i * step

        // Horizontal line
        segments.push(
          new THREE.Vector3().addScaledVector(tangent, -half).addScaledVector(bitangent, offset).addScaledVector(normal, half),
          new THREE.Vector3().addScaledVector(tangent, half).addScaledVector(bitangent, offset).addScaledVector(normal, half)
        )

        // Vertical line
        segments.push(
          new THREE.Vector3().addScaledVector(tangent, offset).addScaledVector(bitangent, -half).addScaledVector(normal, half),
          new THREE.Vector3().addScaledVector(tangent, offset).addScaledVector(bitangent, half).addScaledVector(normal, half)
        )
      }
    }

    const faces = [
      [new THREE.Vector3(0, 0, 1.5), new THREE.Vector3(1.5, 0, 0), new THREE.Vector3(0, 1.5, 0)],  // front
      [new THREE.Vector3(0, 0, -1.5), new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(0, 1.5, 0)], // back
      [new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(1.5, 0, 0), new THREE.Vector3(0, 0, -1.5)],  // top
      [new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(1.5, 0, 0), new THREE.Vector3(0, 0, 1.5)],  // bottom
      [new THREE.Vector3(1.5, 0, 0), new THREE.Vector3(0, 0, -1.5), new THREE.Vector3(0, 1.5, 0)],  // right
      [new THREE.Vector3(-1.5, 0, 0), new THREE.Vector3(0, 0, 1.5), new THREE.Vector3(0, 1.5, 0)]   // left
    ]

    faces.forEach(([normal, tangent, bitangent]) =>
      createGrid(normal, tangent, bitangent)
    )

    const geometry = new THREE.BufferGeometry().setFromPoints(segments)
    return geometry
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    if (rotateCube) {
      groupRef.current.rotation.x += 0.002
      groupRef.current.rotation.y += 0.001
    } else {
      // Reset rotation when scrolling up
      groupRef.current.rotation.x = 0
      groupRef.current.rotation.y = 0
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={post}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <Center position={[-0.3,0.2,0]}>
        <group scale={0.8}>
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.45}
          height={0.9}
          curveSegments={8}
          bevelEnabled={false}
        >
          MAXX
          <meshStandardMaterial color="#5EC3E9" transparent opacity={0} />
          <Edges
            color="#00ffff"
            scale={0.9}
            threshold={7}
          />
        </Text3D>
        </group>
      </Center>
    </group>
  )
}
