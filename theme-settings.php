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

}
