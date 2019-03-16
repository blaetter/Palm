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
