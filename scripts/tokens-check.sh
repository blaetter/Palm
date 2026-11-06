#!/bin/sh
# Checks the colours of the theme against blaetter-design (see README, "Colours"):
# 1. css/blaetter-tokens.css is a verbatim copy of dist/tokens.css of blaetter-design,
# 2. css/tokens.css does not redefine a --palm-color-* name of that copy,
# 3. the theme's own CSS and stories set no colour values (hex, rgb, hsl, colour
#    keywords) outside comments; they use the custom properties instead.
# css/drupal-layer.css (generated from core) and bundle/ (built by blaetter-theme,
# checked there) are left out.
#   scripts/tokens-check.sh [path to a blaetter-design checkout]
set -eu
cd "$(dirname "$0")/.."
design=${1:-../../../../../blaetter-design}
status=0

if [ ! -f "$design/dist/tokens.css" ]; then
    echo "$design/dist/tokens.css not found, set DESIGN_DIR"
    exit 1
fi
if cmp -s "$design/dist/tokens.css" css/blaetter-tokens.css; then
    echo "ok   css/blaetter-tokens.css matches $design/dist/tokens.css"
else
    echo "FAIL css/blaetter-tokens.css differs from $design/dist/tokens.css: make tokens"
    status=1
fi

names=$(grep -oE -- '--palm-color-[a-z-]+:' css/blaetter-tokens.css | tr -d ':' | sort -u | paste -sd'|' -)
if grep -nE -- "($names):" css/tokens.css; then
    echo "FAIL css/tokens.css redefines colours of css/blaetter-tokens.css (above)"
    status=1
else
    echo "ok   css/tokens.css adds only its own tokens"
fi

files=$(find css components -type f \( -name '*.css' -o -name '*.twig' \) ! -name blaetter-tokens.css ! -name drupal-layer.css | sort)
found=$(for f in $files; do
    perl -0pe 's#/\*.*?\*/|\{\#.*?\#\}#"\n" x (() = $& =~ /\n/g)#gse' "$f" \
        | grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|:[[:space:]]*(red|white|black|grey|gray|green|blue|silver|yellow|orange)[[:space:]]*[;!]' \
        | sed "s|^|$f:|" || true
done)
if [ -n "$found" ]; then
    echo "FAIL colour values in the theme's CSS or stories, use --palm-color-* :"
    echo "$found"
    status=1
else
    echo "ok   no colour values in css/ and components/ besides the tokens"
fi
exit $status
