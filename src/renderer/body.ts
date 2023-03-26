import {
  BufferGeometry,
  Camera,
  Color,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Raycaster,
  Scene,
  SphereGeometry,
  Vector3
} from 'three';

export default abstract class Body {
  public static bodies: Body[] = [];

  public static renderAll(scene: Scene, camera: Camera): void {
    const meshes: Mesh[] = this.bodies.map(b => {
      b.mesh = b.getMesh();
      b.scene = scene;
      b.camera = camera;
      return b.mesh;
    });
    scene.add(...meshes);
    // Let individual bodies setup any required children
    this.bodies.forEach(b => b.init());
  }

  public static animateAll(iteration: number, sec: number, raycaster: Raycaster, click: boolean): void {
    for (let body of this.bodies) {
      const mesh = body.mesh;

      // Translate position based on timingFunction
      const vector = body.getPosition(iteration, sec);
      mesh.position.x = vector.x;
      mesh.position.y = vector.y;
      mesh.position.z = vector.z;

      // Trigger mouse events
      if (raycaster.intersectObject(mesh).length >= 1) {
        if (!body.hoverActive) {
          body.hoverActive = true;
          body.hoverStart();
        }
        if (click) {
          body.click();
        }
      } else if (body.hoverActive) {
        body.hoverActive = false;
        body.hoverEnd();
      }
    }
  }

  protected mesh: Mesh;
  protected scene: Scene;
  protected camera: Camera;
  private hoverActive = false;
  protected focused = false;

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

  public focus(): void {
    console.log('try focus');
    this.camera.position.set(
        this.mesh.position.x,
        this.mesh.position.y,
        this.mesh.position.z + 200,
    );
    //this.camera.translateY(1000);
    //console.log('test');
    this.scene.background = new Color(Math.random());
    Body.bodies.forEach(b => b.focused = false);
    this.focused = true;
  }

  protected init(): void {
  }

  protected hoverStart(): void {
  }

  protected hoverEnd(): void {
  }

  protected click(): void {
  }
}

export class SimpleBody extends Body {
  private readonly textureRadius: number;
  private readonly textureColor: number;
  private readonly timingFunction: (iteration: number, sec: number) => Vector3;
  private pathPoints: Vector3[] = [];
  private line: Line;

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

  protected init() {
    this.line = new Line(
        new BufferGeometry(),
        new LineBasicMaterial({ color: 0xff0000 }),
    );
    this.scene.add(this.line);
  }

  protected getMesh(): Mesh {
    return new Mesh(
      new SphereGeometry(this.textureRadius),
      new MeshBasicMaterial({
        color: this.textureColor,
        wireframe: false,
      }
    ));
  }

  protected getPosition(iteration: number, sec: number): Vector3 {
    const pos = this.timingFunction(iteration, sec);
    this.pathPoints.push(pos);
    this.line.geometry = this.line.geometry.setFromPoints(this.pathPoints);
    return pos;
  }

  protected hoverStart() {
    (this.mesh.material as MeshBasicMaterial).color.set(0xffffff);
  }

  protected hoverEnd() {
    (this.mesh.material as MeshBasicMaterial).color.set(this.textureColor);
  }

  protected click() {
    this.focus();
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
