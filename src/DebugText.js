import React from 'react'
import fonts from './fonts/fonts'

const DebugText = React.forwardRef(({ value, position, size = 1.5 }, ref) => {
  return (
    <text
      ref={ref}
      position={position}
      rotation={[0, 0, 0]}
      text={value}
      font={fonts['m5x7']}
      fontSize={size}
      fontWeight={'bold'}
      outlineColor="black"
      outlineWidth={0.1}
      anchorX="left"
      anchorY="middle"
    >
      <meshPhongMaterial attach="material" color={'#AAA'} />
    </text>
  )
})

export default DebugText
