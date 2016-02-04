#!/bin/sh

$HOME/.config/i3/i3-config-splice.sh > $HOME/.config/i3/config
$HOME/.config/i3status/i3status-config-splice.sh > $HOME/.config/i3status/config

i3-msg reload
