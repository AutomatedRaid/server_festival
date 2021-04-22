export class Taller {
  _id: string;
  nombre: String;
  horario: String;
  descripcion: String;
  zona: String;
  img: String;
  img_mapa: String;


  constructor(id = "", nombre = "", horario = "", descripcion = "", zona = "", img = "", img_mapa = "") {
    this._id = id;
    this.nombre = nombre;
    this.horario = horario;
    this.descripcion = descripcion;
    this.zona = zona;
    this.img = img;
    this.img_mapa = img_mapa;
  }
}
