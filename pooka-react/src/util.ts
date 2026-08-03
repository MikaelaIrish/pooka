enum ThingType {
    HTML = "HTML", MARKDOWN = "MARKDOWN"
}

interface Thing {
    id: string;
    name: string;
    author: string | undefined;
    timestamp: Date;
    tags: string[] | undefined;
    type: ThingType | undefined;
    path: string;
}

const thingDefaults: Pick<Thing, 'tags' | 'type'> = {
    tags: [],
    type: ThingType.HTML
}

function parseThing(json: any): Thing {
    return {
        ...thingDefaults,
        id: json.id,
        name: json.name,
        tags: json.tags,
        type: json.type,
        author: json.author,
        timestamp: json.timestamp,
        path: json.path
    }
}

function parseThings(json: any[]): Thing[] {
    return json.map(item => parseThing(item))
}

async function getThings(url: string): Promise<Thing[]> {
    return fetch(url)
        .then(response => response.text())
        .then(text => parseThings(JSON.parse(text)));
}

async function getThing(thing: Thing, root?: string): Promise<string> {
    const path = (root ?? "") +  "/" + thing.path
    console.log("fetching from " + thing.path, root)
    return fetch(path)
        .then(response => response.text())
}

export {getThings, getThing, ThingType};
export type { Thing };
