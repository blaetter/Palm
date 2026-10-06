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
 * "clean" deletes carts and orders that were created after "mark", belong to
 * anonymous users or to the test user "styletest", and are not completed
 * (status new, in_address or in_payment), together with their cart items,
 * order products and order history. Carts that anonymous visitors create on
 * the local site during the capture are removed as well.
 */

$action = $extra[0] ?? '';
$file = $extra[1] ?? '';
if (!in_array($action, ['mark', 'clean'], TRUE) || '' === $file) {
  fwrite(STDERR, "Usage: drush php:script cleanup.php -- mark|clean <file>\n");
  exit(1);
}

$db = \Drupal::database();
$max = static fn (string $table, string $id): int => (int) $db->query("SELECT MAX($id) FROM {" . $table . '}')->fetchField();

if ('mark' === $action) {
  file_put_contents($file, json_encode([
    'order' => $max('nodeshop_orders', 'order_id'),
    'cart' => $max('nodeshop_carts', 'cart_id'),
  ]));
  return;
}

$marks = json_decode((string) @file_get_contents($file), TRUE);
if (!is_array($marks) || !isset($marks['order'], $marks['cart'])) {
  fwrite(STDERR, "No marks in $file, nothing cleaned.\n");
  exit(1);
}

$entity_type_manager = \Drupal::entityTypeManager();
$owners = [0];
$test_users = $entity_type_manager->getStorage('user')->loadByProperties(['name' => 'styletest']);
if ($test_users) {
  $owners[] = (int) reset($test_users)->id();
}

$order_storage = $entity_type_manager->getStorage('nodeshop_order');
$order_ids = $order_storage->getQuery()->accessCheck(FALSE)
  ->condition('order_id', $marks['order'], '>')
  ->condition('user_id', $owners, 'IN')
  ->condition('order_status', ['new', 'in_address', 'in_payment'], 'IN')
  ->execute();
if ($order_ids) {
  $product_storage = $entity_type_manager->getStorage('nodeshop_order_product');
  $product_storage->delete($product_storage->loadMultiple(
    $product_storage->getQuery()->accessCheck(FALSE)->condition('order_id', $order_ids, 'IN')->execute()
  ));
  $db->delete('nodeshop_order_history')->condition('order_id', $order_ids, 'IN')->execute();
  $order_storage->delete($order_storage->loadMultiple($order_ids));
}

$cart_storage = $entity_type_manager->getStorage('nodeshop_cart');
$cart_ids = $cart_storage->getQuery()->accessCheck(FALSE)
  ->condition('cart_id', $marks['cart'], '>')
  ->condition('user_id', $owners, 'IN')
  ->execute();
// Keep carts that a remaining (e.g. completed) order still refers to.
if ($cart_ids) {
  $referenced = $order_storage->getQuery()->accessCheck(FALSE)->condition('cart_id', $cart_ids, 'IN')->execute();
  if ($referenced) {
    foreach ($order_storage->loadMultiple($referenced) as $order) {
      unset($cart_ids[$order->get('cart_id')->target_id]);
    }
  }
}
if ($cart_ids) {
  $item_storage = $entity_type_manager->getStorage('nodeshop_cart_item');
  $item_storage->delete($item_storage->loadMultiple(
    $item_storage->getQuery()->accessCheck(FALSE)->condition('cart_id', $cart_ids, 'IN')->execute()
  ));
  $cart_storage->delete($cart_storage->loadMultiple($cart_ids));
}

@unlink($file);
echo sprintf("Removed %d orders and %d carts created by the capture.\n", count($order_ids), count($cart_ids));
