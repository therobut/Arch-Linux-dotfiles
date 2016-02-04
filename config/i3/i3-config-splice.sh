#!/bin/sh
cat $HOME/.config/i3/config.core
echo

if [ -f $HOME/.config/i3/config.`hostname` ]; then
    cat $HOME/.config/i3/config.`hostname`
fi
