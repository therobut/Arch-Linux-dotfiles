#!/bin/bash
############################
# setup.sh
# This script attempts to install the tools and programs which my dotfiles are relevant to
# Assumes 'sudo' is installed
#
# EXIT CODES:
# 0 - success
# 1 - not running linux
# 2 - could not determine Linux distro
# 3 - could not find relevant tools-<distro>.txt file
############################

########## Variables

# make sure we're on linux
platform=$(uname);

# sets $NAME variable, if supplied by the linux distro
if [[ $platform == 'Linux' ]]; then
    if [ -f /etc/os-release ]; then
        source /etc/os-release
    fi
fi

case $NAME in
    'Arch Linux')
        distro='arch'
        ;;
    'Ubuntu')
        distro='ubuntu'
        ;;
    'Debian')
        distro='debian'
        ;;
    *)
        distro=false
        ;;
esac

##########

if [[ $platform != 'Linux' ]]; then
    #stop script execution
    echo "Looks like you aren't running Linux. This script is only designed for Linux, unfortunately."
    exit 1
fi

install_tool () {
    
    case $distro in
        'arch')
            sudo pacman -S --noconfirm $1
            ;;
        'ubuntu')
            sudo aptitude install $1
            ;;
        'debian')
            sudo apt-get install $1
            ;;
        *)
            echo "Unable to determine Linux Distro"
            exit 2
            ;;
    esac
}

chsh_zsh () {
    # Test to see if zshell is installed.  If it is:
    if [ -f /bin/zsh -o -f /usr/bin/zsh ]; then
        # Set the default shell to zsh if it isn't currently set to zsh
        if [[ $(echo $SHELL) != $(which zsh) ]]; then
            chsh -s $(which zsh)
        fi
    else
        install_tool zsh
        chsh_zsh
    fi
}

if [ -f tools-$distro.txt ]; then
    while read tool
    do
        install_tool $tool
    done < tools-$distro.txt
else
    echo "tools-$distro.txt not found."
    exit 3
fi

chsh_zsh

exit 0
