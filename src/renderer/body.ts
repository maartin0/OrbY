import {
  BufferGeometry,
  Camera,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Scene,
  SphereGeometry,
  Vector3,
} from 'three';
import AnimationState, { subscribe } from '../animationState';

export default class Body {
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
    subscribe((state: AnimationState) => this.update(state));
    this.displayName = displayName;
    this.textureRadius = textureRadius;
    this.textureColor = textureColor;
    this.timingFunction = timingFunction;
  }

  protected init(): void {
    this.mesh = this.getMesh();
    this.scene.add(this.mesh);
    if (this.focused) this.focus();
    this.ready = true;
    this.plot();
  }

  protected update(state: AnimationState): void {
    if (!this.ready) {
      this.scene = state.viewport.scene;
      this.camera = state.viewport.camera;
      this.init();
    }

    const pos: Vector3 = this.getPosition(state.time.ms);
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.mesh.position.z = pos.z;
  }

  public focus(): void {
    console.log('try focus');
    this.camera.position.set(
        this.mesh.position.x,
        this.mesh.position.y,
        this.mesh.position.z + 200,
    );
    this.focused = true;
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
        new LineBasicMaterial({ color: 0xff0000 }),
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
