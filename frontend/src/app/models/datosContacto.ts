export class DatosContacto {
  _id: string;
  numero: string;
  correo: string;

  constructor(id = "", numero = "", correo = "") {
    this._id = id;
    this.numero = numero;
    this.correo = correo;
  }
}
