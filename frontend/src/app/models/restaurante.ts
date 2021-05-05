export class Restaurante {
  _id: string;
  nombre: string;
  imagen: string;
  imagenes_carta: string[];
  horario: string;
  img_mapa: string;
  localizacion: string;

  constructor(id = '', nombre = '', imagen = '', imagenes_carta= [], horario= '', img_mapa = '', localizacion = '') {
    this._id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.imagenes_carta = imagenes_carta;
    this.horario = horario;
    this.img_mapa = img_mapa;
    this.localizacion = localizacion;
  }

}
