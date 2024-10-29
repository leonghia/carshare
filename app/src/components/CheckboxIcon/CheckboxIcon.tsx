import AnimatedTick from '../AnimatedTick/AnimatedTick';

export const CheckboxIcon: React.FC<{
  indeterminate: boolean | undefined;
  className: string;
  isChecked: boolean;
}> = ({ indeterminate, className, isChecked }) => {
  return <AnimatedTick className={className} isChecked={isChecked} />;
};
