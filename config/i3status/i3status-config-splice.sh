#!/bin/sh
cat $HOME/.config/i3status/config.core
echo

if [ -f $HOME/.config/i3status/config.`hostname` ]; then
    cat $HOME/.config/i3status/config.`hostname`
fi
