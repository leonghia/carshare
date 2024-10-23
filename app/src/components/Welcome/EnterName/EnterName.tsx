import classes from './EnterName.module.scss';
import { Button, TextInput } from '@mantine/core';
import { useField } from '@mantine/form';

export default function EnterName({ onNext }: { onNext: (value: string) => void }) {
  const field = useField({
    initialValue: '',
    validate: (value) => (value.trim().length < 1 ? 'Tên không được để trống' : null),
  });

  const handleClick = async () => {
    const result = await field.validate();
    if (result) return;
    onNext(field.getValue());
  };

  return (
    <>
      <div className={classes.titleAndInput}>
        <h1 className={classes.title}>Chúng mình có thể gọi bạn là?</h1>
        <TextInput
          {...field.getInputProps()}
          placeholder="Nhập tên của bạn..."
          classNames={{
            root: classes.textInputRoot,
            input: classes.textInputInput,
            error: classes.textInputError,
          }}
        />
      </div>
      <Button
        onClick={handleClick}
        classNames={{
          root: classes.buttonRoot,
          label: classes.buttonLabel,
        }}
      >
        Tiếp theo
      </Button>
    </>
  );
}
