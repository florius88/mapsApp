import { Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string
  marker: Marker
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  // Usamos el ? porque en algún momento es null or undefined
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 5;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-3.7033253741194585, 40.41656431180323);
  public markers: MarkerAndColor[] = []


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

    /* Podemos crearnos un elemento Html a nuestro gusto y asignarselo al marker
    const markerHtml = document.createElement('div')
    markerHtml.innerHTML = 'Flor' */

    /* Esta es una forma de crearse un marker
    const marker = new Marker({
      //color: 'red'
      //element: markerHtml
    })
      .setLngLat(this.currentLngLat)
      .addTo(this.map) */

  }

  /**
   * Crea un marcador nuevo
   */
  createMarker() {
    if (!this.map) return

    // Nos crea un color en hexadecimal aleatorio
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16))
    const lngLat = this.map.getCenter()

    this.addMarker(lngLat, color)
  }

  /**
   * Añade un marcador a la lista de marcadores
   *
   * @param lngLat
   * @param color
   */
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return

    const marker = new Marker({
      color: color,
      draggable: true, //el marcador se puede mover
    })
      .setLngLat(lngLat)
      .addTo(this.map)

    this.markers.push({ color, marker })
  }

  /**
   * Elimina un marcador
   *
   * @param index índice del marcador a eliminar
   */
  deleteMarker(index: number) {
    // Eliminamos el marcador
    this.markers[index].marker.remove()
    // Lo eliminamos de la lista
    this.markers.splice(index, 1)
  }

  /**
   * Sitúa el mapa en el punto pasado por parámetro
   *
   * @param marker
   */
  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    })
  }

}
