<?php

/**
 * @file
 * Removes the shop data that a style diff capture creates.
 *
 * Visiting the cart and the checkout creates carts and orders. Run "mark"
 * before a capture and "clean" after it:
 *
 *   drush php:script cleanup.php -- mark <file>
 *   drush php:script cleanup.php -- clean <file>
 *
 * Both remove all carts and all not completed orders of the test user
 * "styletest", so every capture starts with an empty cart, even after an
 * interrupted capture. "clean" also deletes the carts and orders of anonymous
 * users that were created after "mark" and are not completed (status new,
 * in_address or in_payment). Cart items, order products and order history of
 * deleted carts and orders are deleted as well. Carts that anonymous visitors
 * create on the local site during the capture are removed, too.
 */

$action = $extra[0] ?? '';
$file = $extra[1] ?? '';
if (!in_array($action, ['mark', 'clean'], TRUE) || '' === $file) {
  fwrite(STDERR, "Usage: drush php:script cleanup.php -- mark|clean <file>\n");
  exit(1);
}

$db = \Drupal::database();
$entity_type_manager = \Drupal::entityTypeManager();
$order_storage = $entity_type_manager->getStorage('nodeshop_order');
$cart_storage = $entity_type_manager->getStorage('nodeshop_cart');

/**
 * Deletes orders and carts with their dependent data.
 *
 * Carts that a remaining order refers to (e.g. a completed one) are kept.
 *
 * @return int[]
 *   The number of deleted orders and carts.
 */
$delete = static function (array $order_ids, array $cart_ids) use ($db, $entity_type_manager, $order_storage, $cart_storage): array {
  if ($order_ids) {
    $product_storage = $entity_type_manager->getStorage('nodeshop_order_product');
    $product_storage->delete($product_storage->loadMultiple(
      $product_storage->getQuery()->accessCheck(FALSE)->condition('order_id', $order_ids, 'IN')->execute()
    ));
    $db->delete('nodeshop_order_history')->condition('order_id', $order_ids, 'IN')->execute();
    $order_storage->delete($order_storage->loadMultiple($order_ids));
  }
  if ($cart_ids) {
    $referenced = $order_storage->getQuery()->accessCheck(FALSE)->condition('cart_id', $cart_ids, 'IN')->execute();
    foreach ($order_storage->loadMultiple($referenced) as $order) {
      unset($cart_ids[$order->get('cart_id')->target_id]);
    }
  }
  if ($cart_ids) {
    $item_storage = $entity_type_manager->getStorage('nodeshop_cart_item');
    $item_storage->delete($item_storage->loadMultiple(
      $item_storage->getQuery()->accessCheck(FALSE)->condition('cart_id', $cart_ids, 'IN')->execute()
    ));
    $cart_storage->delete($cart_storage->loadMultiple($cart_ids));
  }
  return [count($order_ids), count($cart_ids)];
};

// Everything of the test user except completed orders, regardless of the marks.
$deleted = [0, 0];
$test_users = $entity_type_manager->getStorage('user')->loadByProperties(['name' => 'styletest']);
if ($test_users) {
  $test_uid = (int) reset($test_users)->id();
  $deleted = $delete(
    $order_storage->getQuery()->accessCheck(FALSE)
      ->condition('user_id', $test_uid)
      ->condition('order_status', 'completed', '<>')
      ->execute(),
    $cart_storage->getQuery()->accessCheck(FALSE)->condition('user_id', $test_uid)->execute()
  );
}

if ('mark' === $action) {
  $max = static fn (string $table, string $id): int => (int) $db->query("SELECT MAX($id) FROM {" . $table . '}')->fetchField();
  file_put_contents($file, json_encode([
    'order' => $max('nodeshop_orders', 'order_id'),
    'cart' => $max('nodeshop_carts', 'cart_id'),
  ]));
  if ($deleted[0] || $deleted[1]) {
    echo sprintf("Removed %d orders and %d carts of the test user left from an earlier capture.\n", ...$deleted);
  }
  return;
}

$marks = json_decode((string) @file_get_contents($file), TRUE);
if (!is_array($marks) || !isset($marks['order'], $marks['cart'])) {
  fwrite(STDERR, "No marks in $file, anonymous carts and orders not cleaned.\n");
  exit(1);
}

// Anonymous carts and orders created during the capture.
$anonymous = $delete(
  $order_storage->getQuery()->accessCheck(FALSE)
    ->condition('order_id', $marks['order'], '>')
    ->condition('user_id', 0)
    ->condition('order_status', ['new', 'in_address', 'in_payment'], 'IN')
    ->execute(),
  $cart_storage->getQuery()->accessCheck(FALSE)
    ->condition('cart_id', $marks['cart'], '>')
    ->condition('user_id', 0)
    ->execute()
);

@unlink($file);
echo sprintf("Removed %d orders and %d carts created by the capture.\n", $deleted[0] + $anonymous[0], $deleted[1] + $anonymous[1]);
