<?php

/**
 * @file
 * Creates or updates the local test user "styletest" for the style diff.
 *
 * Usage: drush php:script test-user.php -- <role>
 *
 * The user gets a fixed test address, the mail address styletest@example.invalid
 * and exactly the given role. Prints the user id. Only for local development
 * sites; run it again after importing a database copy.
 */

use Drupal\user\Entity\Role;
use Drupal\user\Entity\User;

$role = $extra[0] ?? '';
if ('' === $role || !Role::load($role)) {
  fwrite(STDERR, "Unknown role: '$role'\n");
  exit(1);
}

$users = \Drupal::entityTypeManager()->getStorage('user')->loadByProperties(['name' => 'styletest']);
$user = $users ? reset($users) : User::create([
  'name' => 'styletest',
  'pass' => \Drupal::service('password_generator')->generate(32),
]);
$user->setEmail('styletest@example.invalid');
$user->activate();
foreach ($user->getRoles(TRUE) as $existing) {
  if ($existing !== $role) {
    $user->removeRole($existing);
  }
}
$user->addRole($role);

$address = [
  'field_title' => 'Frau',
  'field_salutation' => 'Frau',
  'field_first_name' => 'Stil',
  'field_last_name' => 'Test',
  'field_street' => 'Teststraße 1',
  'field_zip' => '10115',
  'field_city' => 'Berlin',
  'field_country' => 'Deutschland',
];
foreach ($address as $field => $value) {
  if ($user->hasField($field)) {
    $user->set($field, $value);
  }
}
$user->save();

echo $user->id();
