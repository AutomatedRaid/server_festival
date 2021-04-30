export class Restaurante {
  _id: string;
  nombre: string;
  imagen: string[];
  horario: string;
  localizacion: string;

  constructor(id = '', nombre = '', imagen= [], horario= '', localizacion = '') {
    this._id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.horario = horario;
    this.localizacion = localizacion;
  }

}
