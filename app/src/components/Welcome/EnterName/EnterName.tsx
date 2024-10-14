import classes from "./EnterName.module.scss";

import { useState } from "react";
import { TextInput } from "@mantine/core";

export default function EnterName() {
    const [value, setValue] = useState("");

    return (
        <TextInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            placeholder="Nhập tên của bạn..."

            classNames={{
                input: classes.input,
                root: classes.root,
            }}

        />
    );
}