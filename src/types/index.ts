//<----MediaCard----->
export interface mediaItem {
    id: string,
    type: string;
    src: string;
    title: string;
    slotname: string,
    options: {
        PT: boolean
        zoom: boolean,
        mic: boolean;
        volume: boolean;
        style: any
    };
}
export interface ControlEvent {
    type: string;
    value?: number;
}
//<----MediaCard----->
//<----alarm------->
export interface alarm {
    title: string,
    armed: boolean,
    authentication: boolean,
}
//<----alarm------->
//<-----button----->
export interface button {
    name: String,
    status: Boolean,
    Options: {
        icon: {
            on: {
                name: string,
                color: string,
            },
            off: {
                name: string,
                color: string,
            },
            size: number,
        },
        style: any
    },
}
//<-----button----->
//<-----slider----->
export interface slider extends button {
    range: number
}
//<-----slider----->
//<-----entity----->
export interface entity {
    title: string;
    value: number | string,
    unit: string
}
//<-----entity----->
//<-----entity2----->
export interface entity2 {
    friendlyName: string,
    value: boolean,
    roundTo: number,
    unit?: string,
    isSwitchable: boolean,
    icon: {
        true: string,
        false: string
    },
    text: {
        true: string,
        false: string,
    },
    style: Object,
}
export interface toggle {
    friendlyName: string,
    value: boolean,
    roundTo: number,
    unit?: string,
    icon: {
        true: string,
        false: string
    },
    text: {
        true: string,
        false: string,
    }
}
export interface analog {
    friendlyName: string,
    value: boolean,
    roundTo: number,
    unit?: string,
}
export interface digital {
    friendlyName: string,
    value: boolean,
    text: {
        true: string,
        false: string
    },
    icon: {
        true: string,
        false: string
    }
}
//<-----entity2----->
//<-----entities----->
export type icon_key = 'icon' | 'icon_color'
export type icon_object_key = 'on' | 'off'

//icon
export interface icon {
    on: string,
    off: string
}
//iconColor
export interface icon_color {
    on: string,
    off: string
}

//entitiesItem
export interface entitiesItem {
    title: string,
    value: number | boolean,
    unit?: string,
    options: {
        isSwitchable: boolean,
        condition?: string,
        conditionValue?: number,
        icon: {
            on: {
                name: string,
                color: string,
            },
            off: {
                name: string,
                color: string,
            },
        },
    },
}
//entities
export interface entities {
    title: string;
    items: Array<entitiesItem>
}
//<-----entities----->

//<-----glance----->
//glance item
export interface glanceItem {
    name: string,
    status: boolean,
    Options: {
        icon: {
            on: {
                name: string,
                color: string,
            },
            off: {
                name: string,
                color: string,
            },
        },
    },
}
//glance 
export interface glance {
    name: string,
    items: Array<glanceItem>
}
//<-----glance----->
//<-----logbook----->
//logbook item
export interface logbookItem {
    icon: string,
    status: boolean,
    title: string,
    Date: string
}
//logbook
export interface logbook {
    name: string,
    Date: string,
    items: Array<logbookItem>
}
//<-----logbook----->
//<-----markdown----->
export interface markdown {
    title: string,
    content: string
}
//<-----markdown----->

//<-----music player----->
export interface musicPlayerItem {
    title: string,
    artist: string,
    src: string,
}
export interface musicPlayer {
    items: Array<musicPlayerItem>
}
//<-----music player----->
//<-----webpage----->
export interface webpage {
    title: string,
    src: string,
    height: string
}
//<-----webpage----->
//<-----Todo----->
//Todo item
export interface todoItem {
    id: number,
    title: string,
    status: boolean,
}
//Todo
export interface todo {
    name: string
    items: Array<todoItem>
}
//<-----Todo----->
//<-----graph----->
export interface graph {
    title: string,
    options: object,
    data: Array<any>
}
//<-----graph----->
//<-----audio----->
export interface audioItem {
    title: string;
}
//<-----audio----->
//<-----horizontal card----->
export interface horizontal_card {
    title: string,
    totalItems: number,
}
//<-----horizontal card----->
//<-----gauge card----->
export interface gauge {
    value: number,
    unit: string,
    friendlyName: string
}
//<-----gauge card----->

//<-----history graph----->
export interface history_graph {
    title: string,
    data: Array<any>
}
//<-----history graph----->
//<-----Map----->
export interface map {
    title: string,
    options: {
        style: any
    };
    items: Array<{
        id: string,
        lat: string,
        long: string,
    }>
}
//<-----Map----->
//<-----pictureElement----->

//pictureElement icon item
export interface pictureElementIconItem {
    id: string,
    status: boolean,
    on: {
        name: string,
        color: string,
    },
    off: {
        name: string,
        color: string,
    },
    position: {
        top: number,
        left: number,
        rotate: number,
    },
}
//pictureElement component----->
export interface pictureElement {
    title: string,
    src: string,
    icons: Array<pictureElementIconItem>
}
//<-----/pictureElement----->

//<-----sensor----->
export interface sensor {
    entity: entity,
    graph: {
        categories: Array<string>,
        series: Array<{
            name: string,
            data: Array<number>
        }>
    }
}
//<-----sensor----->
//<-----vertical card----->
export interface vertical_card {
    title: string,
    totalItems: number,
}
//<-----vertical card----->

//<-----Picture Glance----->
export interface pictureGlanceItem {
    id: string,
    status: boolean,
    Options: {
        icon: {
            on: {
                name: string,
                color: string,
            },
            off: {
                name: string,
                color: string,
            },
        },
    }
}
export interface pictureGlance {
    title: string,
    items: Array<pictureGlanceItem>
}
//<-----Picture Glance----->
//<-----conditional----->

export interface conditionalItem {
    src: string, title: string,
    items: Array<{
        id: string,
        status: boolean,
        Options: {
            icon: {
                on: {
                    name: string,
                    color: string,
                },
                off: {
                    name: string,
                    color: string,
                },
            },
        }
    }>
}
export interface conditional {
    type: string,
    condition: Array<boolean>,
    item: conditionalItem
}
//<-----/conditional----->
