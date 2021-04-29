export class Comollegar {
  _id: string;
  nombre: string;
  ubicompleta: string;
  urlmapa: string;
  img: string;

  constructor(id = "", nombre = "", ubicompleta = "", urlmapa = "", img = "") {
    this._id = id;
    this.nombre = nombre;
    this.ubicompleta = ubicompleta;
    this.urlmapa = urlmapa;
    this.img = img;
  }
}
