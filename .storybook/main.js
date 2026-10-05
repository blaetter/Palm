/**
 * Storybook for the Palm components.
 *
 * Stories are written in Twig next to each component (*.stories.twig) and
 * compiled to *.stories.json with `npm run stories`. Drupal renders every
 * story, so Storybook always shows the real component markup.
 */
export default {
  stories: ['../components/**/*.stories.json'],
  framework: {
    name: '@storybook/server-webpack5',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};
