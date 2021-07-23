import Dungeon from '2d-dungeon'
import React, { useEffect, useRef, useState } from 'react'
import Angel from './models/Angel'
import Mandala from './models/Mandala'

const around = ([x, y]) => {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],

    [x - 1, y],
    [x + 1, y],

    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
}

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export default function DungeonGenerator(props) {
  const group = useRef()

  const [walls, setWalls] = useState([])
  const [possibleArtworkPoints, setPossibleArtworkPoints] = useState([
    [0, 0],
    [0, 0],
  ])

  useEffect(() => {
    let dungeon = new Dungeon({
      max_iterations: 500,
      size: [80, 80],
      seed: 'abcd', //omit for generated seed
      rooms: {
        initial: {
          min_size: [3, 3],
          max_size: [3, 3],
          max_exits: 1,
          position: [0, 0], //OPTIONAL pos of initial room
        },
        any: {
          min_size: [2, 2],
          max_size: [5, 5],
          max_exits: 4,
        },
      },
      max_corridor_length: 6,
      min_corridor_length: 2,
      corridor_density: 0.5, //corridors per room
      symmetric_rooms: false, // exits must be in the center of a wall if true
      interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
      max_interconnect_length: 10,
      room_count: 15,
    })

    dungeon.generate()
    // dungeon.print() //outputs wall map to console.log

    const [w, h] = dungeon.size

    const walls = []
    const possibleArtworkPoints = []

    for (let piece of dungeon.children) {
      if (piece.tag) {
        const [x, y] = piece.position
        const [w, h] = piece.size
        const center = [x + w / 2, y + h / 2]
        possibleArtworkPoints.push(center)
      }
    }

    shuffle(possibleArtworkPoints)

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const wall = dungeon.walls.get([x, y])
        const surroundings = around([x, y])
        if (wall && surroundings.some((s) => dungeon.walls.get(s) === false)) {
          walls.push([x, y])
        }
      }
    }

    setWalls(walls)
    setPossibleArtworkPoints(possibleArtworkPoints)
  }, [setWalls, setPossibleArtworkPoints])

  const scale = 3
  const angelPos = [
    possibleArtworkPoints[0][0] * scale,
    possibleArtworkPoints[0][1] * scale,
    1,
  ]
  const mandalaPos = [
    possibleArtworkPoints[1][0] * scale,
    possibleArtworkPoints[1][1] * scale,
    1,
  ]

  return (
    <group {...props} ref={group} dispose={null}>
      {walls.map(([x, y]) => (
        <mesh position={[x * scale, y * scale, 0]}>
          <boxGeometry args={[scale, scale, scale]} />
          <meshPhongMaterial attach="material" color="#777" />
        </mesh>
      ))}

      <Angel position={angelPos} scale={[0.02, 0.02, 0.02]} />
      <Mandala position={mandalaPos} scale={[0.01, 0.01, 0.01]} />
    </group>
  )
}
