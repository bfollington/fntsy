import { Vector3 } from 'three'

export function tov3(v: number[]) {
  return new Vector3(v[0], v[1], v[2])
}
export function fromv3(v: Vector3) {
  return [v.x, v.y, v.z]
}
export function printv3(v: Vector3, precision: number = 2) {
  return `(${v.x.toFixed(precision)},${v.y.toFixed(precision)},${v.z.toFixed(precision)})`
}
