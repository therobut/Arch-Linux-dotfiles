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
# 4 - unable to find/install yaourt
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
            yaourt -S --noconfirm $1
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

yogurt_check() {
    if hash yaourt 2>/dev/null; then
        return 0
    else
        return 1
    fi
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

if [ $distro == "arch" ]; then
    if yogurt_check; then
        yogurt=true
    else
        echo "Yaourt not detected. Attempting to install."

        # Install Yaourt
        sudo pacman -S --noconfirm base-devel

        #package-query (yaourt dependency)
        git clone https://aur.archlinux.org/package-query.git
        cd package-query
        makepkg -si
        cd ..
        rm -rf package-query

        #yaourt
        git clone https://aur.archlinux.org/yaourt.git
        cd yaourt
        makepkg -si
        cd ..
        rm -rf yaourt

        if yogurt_check; then
            yogurt=true
            echo "Yaourt installation successful!"
        else
            echo "Yaourt installation failed. Please install manually and re-run setup.sh"
            echo "Yaourt homepage and install instructions: https://archlinux.fr/yaourt-en"
            return 4
        fi
    fi
else
    echo "Not Arch Linux. Skipping yaourt installation."
fi

echo "Attempting to install tools from tools-$distro.txt"

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
