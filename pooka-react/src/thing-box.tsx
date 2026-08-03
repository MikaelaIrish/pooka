import React, {type JSX, type ReactElement, useEffect, useState} from "react";
import parse from "html-react-parser";
import {getThing, type Thing, ThingType} from "./util.js";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function render(content: string, type: ThingType | undefined): ReactElement {
    let output: ReactElement;

    switch(type) {
        case ThingType.HTML:
            output = <div> { parse.default(content) } </div>;
            break;
        case ThingType.MARKDOWN:
            output = <Markdown remarkPlugins={[remarkGfm]}>
                { content }
            </Markdown>;
            break;
        default:
            output = <div> { content } </div>;
    }

    return output;
}

function ThingBox(thingRoot: URL, thing: Thing): JSX.Element {
    const [content, setContent] = useState("");

    useEffect(() => {
        getThing(thingRoot, thing).then(text => setContent(text))
    }, [thing]);

    return render(content, thing.type);
}

export default ThingBox;
