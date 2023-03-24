import { BufferGeometry, Mesh, MeshBasicMaterial, Scene, SphereGeometry, Vector3 } from "three";

class Body {
  private static bodies: Body[] = [];
  private static meshes: Mesh[] = [];

  public static renderAll(scene: Scene): void {
    const meshes = this.bodies.map(b => b.getMesh());
    scene.add(...meshes);
  }

  public static animateAll(t: number): void {
    let i = 0;
    for (let body of this.bodies) {
      const mesh = this.meshes[i];
      const vector = body.getPosition(t);
      mesh.position.x = vector.x;
      mesh.position.y = vector.y;
      mesh.position.z = vector.z;
      i++;
    }
  }

  public enable(): void {
    Body.bodies.push(this);
  }

  protected getTextureColor(): number {
    return 0xFFFFFF;
  }

  protected getTextureRadius(): number {
    return 0.5;
  }

  protected getMeshMaterial(): MeshBasicMaterial {
    return new MeshBasicMaterial({
      color: this.getTextureColor(),
      wireframe: true,
    });
  }

  protected getGeometry(): BufferGeometry {
    return new SphereGeometry(this.getTextureRadius());
  }

  public getMesh(): Mesh {
    return new Mesh(this.getGeometry(), this.getMeshMaterial());
  }

  /**
   * Calculate the current position of the object
   * @param t: relative integer time in seconds
   * @returns body position vector
   */
  public getPosition(t: number): Vector3 {
      const angle = (t / 10) % (Math.PI * 2);
      const radius = 2;
      return new Vector3(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
      );
  }
}

export default Body;
