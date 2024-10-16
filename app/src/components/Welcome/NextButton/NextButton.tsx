import { Button } from '@mantine/core';
import classes from "./NextButton.module.scss";
import {TbCircleArrowRight} from "react-icons/tb";
import { MouseEventHandler } from 'react';

export default function NextButton({onClick}: {onClick: MouseEventHandler<HTMLButtonElement>}) {

    return (
    <Button 
    onClick={onClick}
    variant="gradient"
    rightSection={<TbCircleArrowRight />}
    classNames={{
        root: classes.root,
        label: classes.label,
        section: classes.section
    }}
    >Tiếp theo</Button>);
}