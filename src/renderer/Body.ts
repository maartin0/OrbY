import {
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three';
import { animationState, subscribe } from '../animationState';
import { camera, orbitControls, renderRoot, scene, size } from './index';

export default class Body {
  public static bodies: Body[] = [];

  protected mesh: Mesh;
  protected ready: boolean = false;
  public focused: boolean = false;

  public readonly displayName: string;
  public readonly textureRadius: number;
  public readonly textureColor: number;
  protected readonly timingFunction: PositionFunction;
  private line: Line;

  public constructor(
      displayName: string,
      textureRadius: number,
      textureColor: number,
      timingFunction: PositionFunction
  ) {
    subscribe(() => this.update());
    this.displayName = displayName;
    this.textureRadius = textureRadius;
    this.textureColor = textureColor;
    this.timingFunction = timingFunction;
    Body.bodies.push(this);
  }

  protected init(): void {
    this.mesh = this.getMesh();
    scene.add(this.mesh);
    if (this.focused) this.focus();
    this.ready = true;
    this.plot();
  }

  public getProjection(): Vector2 | null {
    if (!this.ready) return null;
    const projection: Vector3 = this.mesh.position.project(camera);
    const normalized: Vector2 = new Vector2(
        size.x * ((projection.x + 1) / 2),
        size.y * (1 - ((projection.y + 1) / 2)) + renderRoot.offsetTop,
    );
    if (normalized.x > size.x || normalized.x < 0 || normalized.y > size.y || normalized.y < 0) return null;
    return normalized;
  }

  protected update(): void {
    if (!this.ready) this.init();
    const pos: Vector3 = this.getPosition(animationState.time.ms);
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.mesh.position.z = pos.z;
    if (this.focused) this.keepFocus();
    this.line.visible = animationState.animation.orbits;
  }

  public focus(): void {
    Body.bodies.forEach((b: Body): void => { b.focused = false });
    this.focused = true;
    this.keepFocus();
  }

  private keepFocus(): void {
    orbitControls.target.copy(this.mesh.position);
  }

  protected getMesh(): Mesh {
    return new Mesh(
        new SphereGeometry(this.textureRadius),
        new MeshBasicMaterial({
              color: this.textureColor,
              wireframe: false,
            },
        ));
  }

  protected plot(): void {
    this.line = new Line(
        new BufferGeometry(),
        new LineBasicMaterial({ color: this.textureColor }),
    );
    const points: Vector3[] = [];
    const passed: boolean[] = [false, false, false];
    let start: Vector3 | undefined = undefined;
    let t: bigint = BigInt(0);
    while (points.length < 100000 && (!passed[0] || !passed[1] || !passed[2])) {
      let end = this.getPosition(t);
      points.push(end);
      if (!start) start = end;
      else if (start.equals(end)) break;
      t++;
    }
    this.line.geometry = this.line.geometry.setFromPoints(points);
    scene.add(this.line);
  }

  protected getPosition(ms: bigint): Vector3 {
    return this.timingFunction(ms);
  }
}

export type PositionFunction = (ms: bigint) => Vector3;

export const circularOrbit = (radius: number, speed?: number) => ((ms: bigint) => {
  const angle: number = ((Number(ms) / 1000) * (speed ?? 1)) % (Math.PI * 2);
  return new Vector3(
    radius * Math.cos(angle),
    0,
    radius * Math.sin(angle)
  );
});
