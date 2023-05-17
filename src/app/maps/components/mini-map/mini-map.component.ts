import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {

  // Usamos el ? porque en algún momento es null or undefined
  @ViewChild('map') divMap?: ElementRef;

  @Input() lngLat?: [number, number]

  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw "Map Div not found"
    if (!this.lngLat) throw "LngLat can't be null"

    this.map = new Map({
      /* container: 'map', // container ID */
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false, // no se puede interactuar con el mapa
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map)

  }

}
