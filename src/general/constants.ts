import { Page } from './types.ts';

export const basePath = '/cicd-react-test/';
export const pages: Page[] = [
  { title: 'Home', path: basePath },
  { title: 'Quick Training', path: basePath + 'train' },
  { title: 'Configure', path: basePath + 'configure' },
  { title: 'About', path: basePath + 'about' },
];
export const appName = 'Anstimmen Trainer';
