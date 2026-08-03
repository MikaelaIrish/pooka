import React, {type FC, type JSX, type ReactElement, useEffect, useState} from "react";
import parse from "html-react-parser";
import {getThing, type Thing, ThingType} from "./util.js";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function render(content: string, type: ThingType | undefined): ReactElement {
    let output: ReactElement;

    switch(type) {
        case ThingType.HTML:
            // @ts-ignore
            output = <div> { parse(content) } </div>;
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

interface ThingBoxProps {
    thing: Thing,
    root?: string
}

const ThingBox: React.FC<ThingBoxProps> = (props: ThingBoxProps) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        getThing(props.thing, props.root).then(text => setContent(text))
    }, [props]);

    return render(content, props.thing?.type);
}

export default ThingBox;
