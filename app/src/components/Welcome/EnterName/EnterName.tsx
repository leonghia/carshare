import classes from "./EnterName.module.scss";
import { TextInput } from "@mantine/core";
import { GetInputPropsReturnType } from "@mantine/form/lib/types";

export default function EnterName(props: GetInputPropsReturnType) {

    return (
        <TextInput
            {...props}
            placeholder="Nhập tên của bạn..."
            classNames={{
                input: classes.input,
                root: classes.root,
                wrapper: classes.wrapper,
                error: classes.error,
            }}

        />
    );
}