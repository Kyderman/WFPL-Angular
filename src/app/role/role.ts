export class Role {

  public id: number = null;
  public name: string = '';

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
  }

}
