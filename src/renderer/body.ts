import {
  BufferGeometry,
  Camera,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Scene,
  SphereGeometry, Vector2,
  Vector3,
} from 'three';
import { animationState, subscribe } from '../animationState';

export default class Body {
  public static bodies: Body[] = [];

  protected mesh: Mesh;
  protected scene: Scene;
  protected camera: Camera;
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
    this.scene = animationState.viewport.scene;
    this.camera = animationState.viewport.camera;
    this.mesh = this.getMesh();
    this.scene.add(this.mesh);
    if (this.focused) this.focus();
    this.ready = true;
    this.plot();
  }

  public getProjection(): Vector2 {
    const projection: Vector3 = this.mesh.position.project(this.camera);
    return new Vector2(
        (projection.x + 1) / 2,
        1 - (projection.y + 1) / 2,
    );
  }

  protected update(): void {
    if (!this.ready) this.init();
    const pos: Vector3 = this.getPosition(animationState.time.ms);
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.mesh.position.z = pos.z;
    if (this.focused) this.keepFocus();
    this.line.visible = !animationState.orbitsDisabled;
  }

  public focus(): void {
    Body.bodies.forEach((b: Body): void => { b.focused = false });
    this.focused = true;
    this.keepFocus();
  }

  private keepFocus(): void {
    animationState.viewport.controls.target.copy(this.mesh.position);
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
    this.scene.add(this.line);
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
