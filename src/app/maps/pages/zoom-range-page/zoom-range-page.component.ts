import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit {

   // Usamos el ? porque en algún momento es null or undefined
   @ViewChild('map') divMap?: ElementRef;


   ngAfterViewInit(): void {
     // console.log(this.divMap);

     if (!this.divMap) throw 'El elemento htm,l no fue encontrado'

     const map = new Map({
       /* container: 'map', // container ID */
       container: this.divMap?.nativeElement, // container ID
       style: 'mapbox://styles/mapbox/streets-v12', // style URL
       center: [-74.5, 40], // starting position [lng, lat]
       zoom: 9, // starting zoom
     });
   }

}
