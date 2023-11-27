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
        '#open'   => true,
    ];

    $form['palm_settings']['palm_footer_link'] = [
        '#type'           => 'textfield',
        '#title'          => t('Node ID for footer link'),
        '#description'    => t('Please provide a Node ID for the link at the bottom of the page around "Karl Barth".'),
        '#default_value'  => theme_get_setting('palm_footer_link'),
        '#size'           => 10,
    ];

    $form['palm_settings']['palm_footer_link_title'] = [
        '#type'           => 'textfield',
        '#title'          => t('title for footer link'),
        '#description'    => t('Please provide a title for the link at the bottom of the page around "Karl Barth".'),
        '#default_value'  => theme_get_setting('palm_footer_link_title'),
    ];

    $form['palm_settings']['palm_footer_cancellation_button_link'] = [
      '#type'           => 'textfield',
      '#title'          => t('URL for the cancellation button link'),
      '#description'    => t('Please provide the url of the cancellation form.'),
      '#default_value'  => theme_get_setting('palm_footer_cancellation_button_link'),
    ];
    $form['palm_settings']['palm_footer_cancellation_button_link_title'] = [
      '#type'           => 'textfield',
      '#title'          => t('title for cancellation button link'),
      '#description'    => t('Please provide a title for the cancellation button in the footer.'),
      '#default_value'  => theme_get_setting('palm_footer_cancellation_button_link_title'),
    ];

    $form['palm_settings']['palm_header_promo_button_link'] = [
        '#type'           => 'textfield',
        '#title'          => t('URL for the promo button link'),
        '#description'    => t('Please provide the url of the promo link. Leave empty to disable the promo button.'),
        '#default_value'  => theme_get_setting('palm_header_promo_button_link'),
    ];
    $form['palm_settings']['palm_header_promo_button_link_title'] = [
        '#type'           => 'textfield',
        '#title'          => t('title for promo button link'),
        '#description'    => t('Please provide a title for the promo button in the footer.'),
        '#default_value'  => theme_get_setting('palm_header_promo_button_link_title'),
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
}
