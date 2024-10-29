import { Eye, EyeSlash } from 'iconsax-react';

export const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) => {
  return reveal ? <EyeSlash variant="Outline" /> : <Eye variant="Outline" />;
};
