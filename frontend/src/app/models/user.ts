export class User {
  _id: string;
  email: String;
  nombre: String;
  password: String;

  constructor(id = "", email = "", nombre = "", password = "") {
    this._id = id;
    this.email = email;
    this.password = nombre;
  }
}
