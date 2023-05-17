import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  // Usamos el ? porque en algún momento es null or undefined
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 5;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-5.263116670532753, 36.96611979824614);


  ngAfterViewInit(): void {
    // console.log(this.divMap);

    if (!this.divMap) throw 'El elemento htm,l no fue encontrado'

    this.map = new Map({
      /* container: 'map', // container ID */
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners()
  }

  ngOnDestroy(): void {
    /* Así lo haríamos si quisieramos borrar un listener en particular */
    /* this.map?.off('move', (ev) => {
      this.currentLngLat = this.map!.getCenter()
    }) */
    /* Así borramos todos los listeners que tenga el objeto */
    this.map?.remove()
  }

  mapListeners() {
    if (!this.map) throw 'El mapa no existe'

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return
      this.map!.zoomTo(18)
    })

    this.map.on('move', (ev) => {
      this.currentLngLat = this.map!.getCenter()
      /* Con esto podriamos sacar por separado las coordenadas
      const { lng, lat } = this.currentLngLat */
    })
  }

  zoomIn() {
    this.map?.zoomIn()
  }

  zoomOut() {
    this.map?.zoomOut()
  }

  zoomChanged(value: string) {
    this.zoom = Number(value)
    this.map!.zoomTo(this.zoom)
  }

}
