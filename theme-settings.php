<?php

use Drupal\node\Entity\NodeType;

function palm_form_system_theme_settings_alter(
    &$form,
    \Drupal\Core\Form\FormStateInterface &$form_state,
    $form_id = null
) {
    // Work-around for a core bug affecting admin themes. See issue #943212.
    if (isset($form_id)) {
        return;
    }

    $options[] = t('-- please choose --');
    foreach (NodeType::loadMultiple() as $key => $type) {
        $options[$type->get('type')] = $type->get('name');
    }

    $form['palm_settings'] = [
        '#type'   => 'details',
        '#title'  => t('advanced theme settings'),
        '#description' => t('Administrate settings for the palm theme'),
        '#open'   => true,
    ];

    $form['palm_settings']['palm_initial_nodetypes'] = [
        '#type'           => 'select',
        '#title'          => t('Initial letter'),
        '#multiple'       => true,
        '#options'        => $options,
        '#description'    => t('Please select, which of your nodetypes should start with an intitial letter.'),
        '#default_value'  => theme_get_setting('palm_initial_nodetypes'),
        '#size'           => 10
    ];

    $form['palm_footer_settings'] = [
      '#type'   => 'details',
      '#title'  => t('footer settings'),
      '#description' => t('Administrate settings for the footer.'),
      '#open'   => true,
    ];

    $form['palm_footer_settings']['palm_footer_link'] = [
        '#type'           => 'textfield',
        '#title'          => t('Node ID for footer link'),
        '#description'    => t('Please provide a Node ID for the link at the bottom of the page around "Karl Barth".'),
        '#default_value'  => theme_get_setting('palm_footer_link'),
        '#size'           => 10,
    ];

    $form['palm_footer_settings']['palm_footer_link_title'] = [
        '#type'           => 'textfield',
        '#title'          => t('title for footer link'),
        '#description'    => t('Please provide a title for the link at the bottom of the page around "Karl Barth".'),
        '#default_value'  => theme_get_setting('palm_footer_link_title'),
    ];

    $form['palm_footer_settings']['palm_footer_cancellation_button_link'] = [
      '#type'           => 'textfield',
      '#title'          => t('URL for the cancellation button link'),
      '#description'    => t('Please provide the url of the cancellation form.'),
      '#default_value'  => theme_get_setting('palm_footer_cancellation_button_link'),
    ];
    $form['palm_footer_settings']['palm_footer_cancellation_button_link_title'] = [
      '#type'           => 'textfield',
      '#title'          => t('title for cancellation button link'),
      '#description'    => t('Please provide a title for the cancellation button in the footer.'),
      '#default_value'  => theme_get_setting('palm_footer_cancellation_button_link_title'),
    ];

    $form['palm_promo_settings'] = [
      '#type'   => 'details',
      '#title'  => t('promo settings'),
      '#description' => t('Administrate settings promo elements such as the promo button or the promo banner.'),
      '#open'   => true,
    ];

    $form['palm_promo_settings']['palm_header_promo_button_link'] = [
        '#type'           => 'textfield',
        '#title'          => t('URL for the promo button link'),
        '#description'    => t('Please provide the url of the promo link. Leave empty to disable the promo button.'),
        '#default_value'  => theme_get_setting('palm_header_promo_button_link'),
    ];
    $form['palm_promo_settings']['palm_header_promo_button_link_title'] = [
        '#type'           => 'textfield',
        '#title'          => t('title for promo button link'),
        '#description'    => t('Please provide a title for the promo button in the footer.'),
        '#default_value'  => theme_get_setting('palm_header_promo_button_link_title'),
    ];

    //settings for the promo banner on the bottom of the page
    $form['palm_promo_settings']['palm_promo_banner_state'] = [
      '#type'           => 'select',
      '#title'          => t('State for promo banner'),
      '#description'    => t('Please provide a state for the promo banner.'),
      '#default_value'  => theme_get_setting('palm_promo_banner_state'),
      '#options'        => [0 => t('inactive'), 1 => t('active')],
    ];
    // The setting keeps its old name "theme"; it chooses the graphic in the title of the banner.
    $form['palm_promo_settings']['palm_promo_banner_theme'] = [
      '#type'           => 'select',
      '#title'          => t('Graphic of the promo banner'),
      '#description'    => t('Shown at the right of the title, drawn in the text colour of the banner.'),
      '#default_value'  => theme_get_setting('palm_promo_banner_theme') ?: 'standard',
      '#options'        => [
        'none'     => t('no graphic'),
        'standard' => t('palm'),
        'winter'   => t('palm in a snow globe'),
      ],
    ];
    // What the close button does (palm_preprocess_page(), js/promo.js).
    $form['palm_promo_settings']['palm_promo_banner_close'] = [
      '#type'           => 'radios',
      '#title'          => t('Closing the promo banner'),
      '#default_value'  => theme_get_setting('palm_promo_banner_close') ?: 'day',
      '#options'        => [
        'page' => t('Only on the current page: it shows again on every page'),
        'day'  => t('Logged in users: gone for the rest of the day (anonymous users: only on the current page)'),
      ],
      '#description'    => t('With the second option the banner shows again the next day and as soon as anything of it is changed here.'),
    ];
    $form['palm_promo_settings']['palm_promo_banner_title'] = [
      '#type'           => 'textfield',
      '#title'          => t('title for promo banner'),
      '#description'    => t('Please provide a title for the promo banner.'),
      '#default_value'  => theme_get_setting('palm_promo_banner_title'),
    ];
    $form['palm_promo_settings']['palm_promo_banner_claim'] = [
      '#type'           => 'textfield',
      '#title'          => t('Claim for promo banner'),
      '#description'    => t('Please provide a claim for the promo banner.'),
      '#default_value'  => theme_get_setting('palm_promo_banner_claim'),
    ];
    $form['palm_promo_settings']['palm_promo_banner_description'] = [
      '#type'           => 'textfield',
      '#title'          => t('Description for promo banner'),
      '#description'    => t('Please provide a description for the promo banner.'),
      '#default_value'  => theme_get_setting('palm_promo_banner_description'),
    ];
    $form['palm_promo_settings']['palm_promo_banner_link'] = [
      '#type'           => 'textfield',
      '#title'          => t('Link for promo banner'),
      '#description'    => t(
        'Please provide a link for the promo banner. It should be either a full URL or relative starting with a /.'
      ),
      '#default_value'  => theme_get_setting('palm_promo_banner_link'),
    ];
    $form['palm_promo_settings']['palm_promo_banner_image_url'] = [
      '#type'           => 'textfield',
      '#title'          => t('Image url for promo banner'),
      '#description'    => t(
        'Please provide a url for the promo banner image. It should be relative starting with a /.'
      ),
      '#default_value'  => theme_get_setting('palm_promo_banner_image_url'),
    ];

    // Colours of the promo banner with a live preview and its contrast (js/promo-settings.js).
    $swatches = palm_promo_swatches();
    $form['palm_promo_settings']['palm_promo_banner_colors'] = [
      '#type'       => 'container',
      '#attributes' => ['class' => ['palm-promo-settings']],
      '#attached'   => [
        'library'        => ['palm/promo-settings'],
        'drupalSettings' => ['palmPromoSettings' => ['swatches' => $swatches]],
        // The fonts of the banner for the preview, which the admin theme does not load.
        'html_head'      => [[[
          '#tag'   => 'style',
          '#value' => \Drupal\Core\Render\Markup::create(palm_promo_preview_fonts()),
        ], 'palm_promo_preview_fonts']],
      ],
    ];
    $form['palm_promo_settings']['palm_promo_banner_colors']['palm_promo_banner_background'] = [
      '#type'           => 'color',
      '#title'          => t('Background colour of the promo banner'),
      '#default_value'  => theme_get_setting('palm_promo_banner_background') ?: PALM_PROMO_BACKGROUND,
      '#attributes'     => ['data-palm-promo-color' => 'background'],
    ];
    $form['palm_promo_settings']['palm_promo_banner_colors']['palm_promo_banner_text_color'] = [
      '#type'           => 'color',
      '#title'          => t('Text colour of the promo banner'),
      '#default_value'  => theme_get_setting('palm_promo_banner_text_color') ?: PALM_PROMO_TEXT_COLOR,
      '#attributes'     => ['data-palm-promo-color' => 'text'],
    ];
    // Without own handlers Drupal only calls the validation of the form class, so it has to stay in the list.
    $form['#validate'] = $form['#validate'] ?? ['::validateForm'];
    $form['#validate'][] = 'palm_promo_settings_validate';

}

/**
 * Validates the colours of the promo banner and warns about a low contrast.
 *
 * A low contrast does not prevent saving, the editors decide.
 */
function palm_promo_settings_validate(&$form, \Drupal\Core\Form\FormStateInterface $form_state)
{
    $colors = [];
    foreach (['palm_promo_banner_background', 'palm_promo_banner_text_color'] as $key) {
        $value = strtolower((string) $form_state->getValue($key));
        if (!preg_match('/^#[0-9a-f]{6}$/', $value)) {
            $form_state->setErrorByName($key, t('Please choose a colour in the format #rrggbb.'));
            return;
        }
        $form_state->setValue($key, $value);
        $colors[] = $value;
    }
    $ratio = palm_contrast_ratio($colors[0], $colors[1]);
    if ($ratio < 4.5) {
        \Drupal::messenger()->addWarning(t(
            'The colours of the promo banner have a contrast of @ratio:1, less than the 4.5:1 its text needs (WCAG 2.2 AA).',
            // Rounded down like the preview, so 4.497 does not read as 4.50; German with a decimal comma.
            ['@ratio' => \Drupal::languageManager()->getCurrentLanguage()->getId() === 'de'
                ? number_format(floor($ratio * 100) / 100, 2, ',', '.')
                : number_format(floor($ratio * 100) / 100, 2)]
        ));
    }
}

/**
 * Returns the font faces of the promo banner (Playfair and Droid Sans in bold, Font Awesome 4) from the legacy bundle.
 *
 * Read from bundle/palm.css, as the file names of the fonts change with every build of blaetter-theme.
 */
function palm_promo_preview_fonts(): string
{
    $css = @file_get_contents(__DIR__ . '/bundle/palm.css') ?: '';
    preg_match_all('/@font-face\{[^}]*\}/', $css, $matches);
    $faces = array_filter($matches[0], function ($face) {
        // Font Awesome 4 for the close icon.
        if (str_contains($face, 'font-family:FontAwesome;')) {
            return true;
        }
        return preg_match('/font-family:(playfair|droid-sans);/', $face)
            && str_contains($face, 'font-weight:700')
            && !str_contains($face, 'font-style:italic');
    });
    return implode("\n", $faces);
}
