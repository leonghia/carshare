import { Key, useState } from 'react';
import classes from './PasswordInputWithStrength.module.scss';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Eye, EyeSlash } from 'iconsax-react';
import { PasswordInput, Popover, Progress, rem } from '@mantine/core';

function VisibilityToggleIcon({ reveal }: { reveal: boolean }) {
  return reveal ? <EyeSlash variant="Bold" /> : <Eye variant="Bold" />;
}

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <div className={classes.requirement} data-meets={meets}>
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{' '}
      <span className={classes.requirementLabel}>{label}</span>
    </div>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Bao gồm một chữ số (0-9)' },
  { re: /[a-z]/, label: 'Bao gồm một chữ cái viết thường' },
  { re: /[A-Z]/, label: 'Bao gồm một chữ cái in hoa' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Bao gồm một ký tự đặc biệt' },
];

export const getPasswordStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

export default function PasswordInputWithStrength({
  keyValue,
  password,
  ...props
}: {
  keyValue: Key;
  password: string;
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const strength = getPasswordStrength(password);

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));

  return (
    <Popover
      opened={popoverOpened}
      // opened={true}
      position="bottom"
      width="target"
      transitionProps={{ transition: 'pop' }}
      classNames={{ dropdown: classes.dropdown }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            key={keyValue}
            placeholder="Nhập mật khẩu bạn muốn đặt..."
            id="password"
            classNames={{
              wrapper: classes.wrapper,
              input: classes.input,
              innerInput: classes.innerInput,
              visibilityToggle: classes.visibilityToggle,
              error: classes.error,
            }}
            visibilityToggleIcon={VisibilityToggleIcon}
            {...props}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress
          value={strength}
          size={5}
          classNames={{ root: classes.progressRoot, section: classes.progressSection }}
          data-strength={strength === 100 ? 'strong' : strength > 50 ? 'medium' : 'weak'}
        />
        <PasswordRequirement label="Độ dài tối thiểu 6 ký tự" meets={password.length > 5} />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
