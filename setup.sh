#!/bin/bash
############################
# setup.sh
# This script creates symlinks from the home directory to any desired dotfiles in ~/dotfiles
# Assumes 'sudo' is installed
############################

###########################################################################
## Heavily modified from Michael Smalley's original.                     ##
## Original can be found at: https://github.com/michaeljsmalley/dotfiles ##
###########################################################################

########## Variables

dir=~/dotfiles                    # dotfiles directory
olddir=~/dotfiles_old             # old dotfiles backup directory
files="i3 vim vimrc Xdefaults xinitrc zshrc zprofile"    # list of files/folders to symlink in homedir


##########

# create dotfiles_old in homedir
echo -n "Creating $olddir for backup of any existing dotfiles in ~ ... "
mkdir -p $olddir
echo "done"

# change to the dotfiles directory
echo -n "Changing to the $dir directory ... "
cd $dir
echo "done"

# move any existing dotfiles in homedir to dotfiles_old directory, then create symlinks from the homedir to any files in the ~/dotfiles directory specified in $files
for file in $files; do

    #config files for i3 window manager need to be in ~/.config
    if [[ ! -d ~/.config ]]; then
        mkdir ~/.config
    fi
    if [ $file == 'i3' ]; then
        if [[ -d ~/.config/i3 ]]; then
            mv ~/.config/i3 $olddir
        fi
        if [[ -d ~/.config/i3status ]]; then
            mv ~/.config/i3status $olddir
        fi

        echo -n "Creating symlink to config/i3/config in home directory ... "
        ln -s $dir/config/i3 ~/.config/i3
        echo "done"
        echo -n "Creating symlink to config/i3status/config in home directory ... "
        ln -s $dir/config/i3status ~/.config/i3status
        echo "done"

    #dotfiles that belong in home directory
    else
        mv ~/.$file $olddir
        echo -n "Creating symlink to $file in home directory ... "
        ln -s $dir/$file ~/.$file
        echo "done"
    fi
done

echo "Pre-existing dotfiles were backed up to ~$olddir"

install_zsh () {

    #initialize and clone oh-my-zsh repository as submodule
    git submodule init
    git submodule update



    # Test to see if zshell is installed.  If it is:
    if [ -f /bin/zsh -o -f /usr/bin/zsh ]; then
        # Set the default shell to zsh if it isn't currently set to zsh
        if [[ $(echo $SHELL) != $(which zsh) ]]; then
            chsh -s $(which zsh)
        fi
    else
        # If zsh isn't installed, get the platform of the current machine
        platform=$(uname);
        # If the platform is Linux, try to install zsh and then recurse
        if [[ $platform == 'Linux' ]]; then
           
            #try to find which linux distro user is running
            if [ -f /etc/os-release ]; then
                source /etc/os-release
            fi
            
            case $NAME in
                'Arch Linux')
                    sudo pacman -S zsh
                    ;;
                'Ubuntu')
                    sudo aptitude install zsh
                    ;;
                'Debian')
                    sudo apt-get install zsh
                    ;;
                *)
                    echo 'zsh could not be installed. Please install zsh manually.'
                    return
                    ;;
            esac
            install_zsh
        fi
    fi
}

install_zsh
