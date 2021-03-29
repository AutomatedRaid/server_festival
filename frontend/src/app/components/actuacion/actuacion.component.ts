import { Component, OnInit } from '@angular/core';
import axios from 'axios';

declare const M: any;

let imagePreview;
let imageUploader;
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djlgdcqhg/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'rdzzccwc';
@Component({
  selector: 'app-actuacion',
  templateUrl: './actuacion.component.html',
  styleUrls: ['./actuacion.component.css']
})

export class ActuacionComponent implements OnInit {

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    imagePreview = document.getElementById('img-preview');
    imageUploader = document.getElementById('img-uploader');
    M.AutoInit();
    imageUploader.addEventListener('change', async (e) => {

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress(e) {
            let progress = Math.round((e.loaded * 100.0) / e.total);
            console.log(progress);
          }
        }
      );
      console.log(res);
      imagePreview.src = res.data.url;
    });
  }
}
