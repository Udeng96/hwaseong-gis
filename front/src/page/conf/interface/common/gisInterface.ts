import L, {DivIcon, Icon, LatLngExpression, LatLngTuple, LeafletEventHandlerFnMap, Marker, MarkerOptions} from "leaflet";
import {MapMoveEnum} from "../../const/common/gisConst";

export interface MapMove {
    latlng: LatLngTuple,
    mapMoveType: MapMoveEnum
}

export interface MapLayerType {
    [key:string] : MapLayerItemType
}

export interface MapLayerItemType {
    type : string,
    url : string
}

export interface FacIconType {
    [key:string] : string
}

export interface SearchAddrType {
    title : string,
    road : string,
    parcel : string,
    x : string,
    y : string,
}

interface DataMarkerOptions<T> extends MarkerOptions {
    data: T
}

export class DataMarker<T = any> {
    private marker: Marker;
    private data: T;

    constructor(latlng: LatLngExpression, options: DataMarkerOptions<T>) {
        this.marker = new Marker(latlng, options);
        this.data = options.data;
    }

    getLeafletMarker(): Marker {
        return this.marker;
    }

    getData(): T {
        return this.data;
    }

    addTo(map: L.Map): this {
        this.marker.addTo(map);
        return this;
    }

    remove(): this {
        this.marker.remove();
        return this;
    }

    on<TEvent extends keyof LeafletEventHandlerFnMap>(
        type: TEvent,
        fn: LeafletEventHandlerFnMap[TEvent],
        context?: any
    ): this;
    on(events: LeafletEventHandlerFnMap): this;

    on(
        typeOrEvents: any,
        fn?: any,
        context?: any
    ): this {
        this.marker.on(typeOrEvents as any, fn, context);
        return this;
    }

    setIcon(
        icon : Icon | DivIcon
    ) : this{
        this.marker.setIcon(icon);
        return this;
    }

    off<TEvent extends keyof LeafletEventHandlerFnMap>(
        type: TEvent,
        fn?: LeafletEventHandlerFnMap[TEvent],
        context?: any
    ): this;
    off(events: LeafletEventHandlerFnMap): this;

    off(
        typeOrEvent:any,
        fn? : any,
        context?: any
    ):this{
        this.marker.off(typeOrEvent as any, fn, context);
        return this;
    }
}
