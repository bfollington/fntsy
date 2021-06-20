import { animated, useSpring } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import fonts from './fonts/fonts'
import KEYS from './useInput/keys'
import { useInput } from './useInput/useInput'

const Cube = ({ position, selected, index }) => {
  const ref = useRef()
  const styles = useSpring({
    scale: selected ? [1.1, 1.1, 1] : [0.8, 0.8, 0.8],
  })

  useFrame(({ delta, clock }) => {
    const cube = ref.current
    const radius = 0.5
    const power = 0.15
    const phase = index * (Math.PI / 8.0)

    cube.rotation.y = radius * Math.sin(clock.elapsedTime + phase) * power
    cube.rotation.x = radius * Math.cos(clock.elapsedTime + phase) * power

    cube.position.x = position[0] + radius * Math.sin(clock.elapsedTime + phase) * power
    cube.position.y = position[1] + radius * Math.cos(clock.elapsedTime + phase) * power
    cube.position.z =
      position[2] +
      radius * Math.sin(clock.elapsedTime + phase) * power +
      (selected ? 0.1 : 0)
  })

  const colors = [
    '#d62411',
    '#ff8426',
    '#ffd100',
    '#ff80a4',
    '#ff2674',
    '#94216a',
    '#007899',
    '#68aed4',
    '#10d275',
  ]
  const col = colors[index]

  const labels = ['a', 'R', 'b', 'n', 'D', 'L', 'c', 'h', 'p', 'u']

  return (
    <animated.group ref={ref} {...styles} position={position} rotation={[0, 0.2, 0]}>
      <mesh>
        <boxGeometry args={[0.5, 0.4, 0.2]} />
        <meshStandardMaterial attach="material" color={selected ? 'white' : col} />
      </mesh>
      <text
        position={[-0.08, 0, 0.2]}
        text={labels[index]}
        font={fonts['IconBitTwo']}
        fontSize={0.3}
        fontWeight={'bold'}
        outlineColor="red"
        // outlineWidth={0.2}
        anchorX="left"
        anchorY="middle"
      >
        <meshPhongMaterial attach="material" color={selected ? 'black' : 'white'} />
      </text>
    </animated.group>
  )
}

const Cursor = ({ position }) => {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 4]}>
      <meshStandardMaterial attach="material" color="blue" />
      <coneGeometry args={[0.3 / 2, 0.5 / 2, 4]} />
    </mesh>
  )
}

const GAMES = [
  { title: 'Super b0nk®', author: 'Meticulous LLC', year: '2002' },
  { title: 'GoGo Quest!', author: 'Insidiuous Co.', year: '2001' },
  { title: 'ABYSS', author: 'Studio 48', year: '2003' },
  { title: 'Reqiuem', author: 'Jade Games', year: '2003' },
  { title: 'YumYum Cafe', author: 'Rachel Gomez', year: '2000' },
  { title: 'FRIEND PARTY', author: 'HappyBoy', year: '2005' },
  { title: 'that night', author: 'Cozy Studios', year: '2003' },
  { title: 'Cosmos 20XX', author: 'Confounding Co.', year: '2000' },
  { title: 'Cyber Rancher', author: 'Dennis Games', year: '2001' },
]

const Menu = ({ position }) => {
  const [[x, y], setCursor] = useState([0, 0])
  const selectedIndex = y * 3 + x

  const { up, down, left, right } = useInput(
    {
      up: [KEYS.up_arrow],
      down: [KEYS.down_arrow],
      left: [KEYS.left_arrow],
      right: [KEYS.right_arrow],
    },
    {
      left: {
        onReleased: () => setCursor([x - 1, y]),
      },
      right: {
        onReleased: () => setCursor([x + 1, y]),
      },
      up: {
        onReleased: () => setCursor([x, y - 1]),
      },
      down: {
        onReleased: () => setCursor([x, y + 1]),
      },
    }
  )

  const cols = [...Array(3).keys()]
  const rows = [...Array(3).keys()]

  const spacing = 0.7
  return (
    <group position={position}>
      {rows.map((r) =>
        cols.map((c) => {
          return (
            <Cube
              key={`${c}${r}`}
              index={r * 3 + c}
              position={[c * spacing, -r * spacing, 0]}
              selected={x === c && y === r}
            />
          )
        })
      )}

      <text
        position={[6, 32, -100]}
        rotation={[0, 0, 0]}
        text={GAMES[selectedIndex].title}
        font={fonts['m5x7']}
        fontSize={8}
        fontWeight={'bold'}
        outlineColor="red"
        // outlineWidth={0.2}
        anchorX="left"
        anchorY="middle"
      >
        <meshPhongMaterial attach="material" color={'#FFF'} />
      </text>
      <text
        position={[6, 25, -100]}
        rotation={[0, 0, 0]}
        text={GAMES[selectedIndex].author}
        font={fonts['m5x7']}
        fontSize={8}
        fontWeight={'bold'}
        outlineColor="red"
        // outlineWidth={0.2}
        anchorX="left"
        anchorY="middle"
      >
        <meshPhongMaterial attach="material" color={'#AAA'} />
      </text>
      <text
        position={[6, 17, -100]}
        rotation={[0, 0, 0]}
        text={GAMES[selectedIndex].year}
        font={fonts['m5x7']}
        fontSize={8}
        fontWeight={'bold'}
        outlineColor="red"
        // outlineWidth={0.2}
        anchorX="left"
        anchorY="middle"
      >
        <meshPhongMaterial attach="material" color={'#AAA'} />
      </text>

      <text
        position={[15, -16, -100]}
        rotation={[0, 0, 0]}
        text={'FNTSY v0.0.0'}
        font={fonts['m5x7']}
        fontSize={8}
        fontWeight={'bold'}
        outlineColor="red"
        // outlineWidth={0.2}
        anchorX="left"
        anchorY="middle"
      >
        <meshPhongMaterial attach="material" color={'#777777'} />
      </text>
    </group>
  )
}

export default Menu
