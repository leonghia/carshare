import { Button } from '@mantine/core';
import classes from "./NextButton.module.scss";
import {TbCircleArrowRight} from "react-icons/tb";
import {useEventListener} from "@mantine/hooks";
import { MouseEventHandler } from 'react';

export default function NextButton({onClick}: {onClick: (this: HTMLDivElement, ev: MouseEvent) => any}) {
    const ref = useEventListener("click", onClick);

    return (
    <Button 
    ref={ref}
    variant="gradient"
    rightSection={<TbCircleArrowRight size={24} />}
    classNames={{
        root: classes.root,
        label: classes.label,
        section: classes.section
    }}
    >Tiếp theo</Button>);
}