import { BufferGeometry, Mesh, MeshBasicMaterial, Scene, SphereGeometry, Vector3 } from 'three';

export default abstract class Body {
  private static bodies: Body[] = [];
  private static meshes: Mesh[] = [];

  public static renderAll(scene: Scene): void {
    this.meshes = this.bodies.map(b => b.getMesh());
    scene.add(...this.meshes);
  }

  public static animateAll(iteration: number, sec: number): void {
    let i = 0;
    for (let body of this.bodies) {
      const mesh = this.meshes[i];
      const vector = body.getPosition(iteration, sec);
      mesh.position.x = vector.x;
      mesh.position.y = vector.y;
      mesh.position.z = vector.z;
      i++;
    }
  }

  protected constructor() {
    Body.bodies.push(this);
  }

  protected abstract getMesh(): Mesh;

  /**
   * Calculate the current position of the object
   * @returns body position vector
   * @param iteration frame number
   * @param sec time since start in seconds
   */
  protected abstract getPosition(iteration: number, sec: number): Vector3;
}

export class SimpleBody extends Body {
  private readonly textureRadius: number;
  private readonly textureColor: number;
  private readonly timingFunction: (iteration: number, sec: number) => Vector3;
  public constructor(
    textureRadius: number,
    textureColor: number,
    timingFunction: (iteration: number, sec: number) => Vector3
  ) {
    super();
    this.textureRadius = textureRadius;
    this.textureColor = textureColor;
    this.timingFunction = timingFunction;
  }
  public getMesh(): Mesh {
    return new Mesh(
      new SphereGeometry(this.textureRadius),
      new MeshBasicMaterial({
        color: this.textureColor,
        wireframe: true,
      }
    ));
  }

  protected getPosition(iteration: number, sec: number): Vector3 {
    return this.timingFunction(iteration, sec);
  }
}

export const circularOrbit = (radius: number, speed?: number) => ((iteration: number, sec: number) => {
  const angle = (sec * (speed ?? 1)) % (Math.PI * 2);
  return new Vector3(
    radius * Math.cos(angle),
    0,
    radius * Math.sin(angle)
  );
});
