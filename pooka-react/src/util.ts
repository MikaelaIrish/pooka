enum ThingType {
    HTML, MARKDOWN
}

interface Thing {
    id: string;
    name: string;
    author: string | undefined;
    timestamp: Date;
    tags: string[] | undefined;
    type: ThingType | undefined;
    relativePath: string;
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
        relativePath: json.relativePath
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

async function getThing(thingRoot: URL, thing: Thing): Promise<string> {
    return fetch(new URL(thing.relativePath, thingRoot))
        .then(response => response.text())
}

export {getThings, getThing, ThingType};
export type { Thing };
