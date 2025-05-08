# Seen_It

## Table of Contents

1. [Overview](#overview)
2. [Compatibility](#compatibility)
3. [Installation](#installation)

## <a name="#overview"> Overview </a>

This is a application made for the raspberry pi to serve as an archiving app. Allowing users to create accounts, upload, and download files. It also provides a user-friendly interface for navigating user submitted content. This application is meant to serve on a private local network. This application was designed was designed with the Portable Network Kit server. For more informarion visit: <a href="communitytechlab.org">Community Tech Lab Website</a>

## <a name="#compatibility"> Compatibility </a>

Currently this application is only compatible with raspberry pi 4/5 running on the 64bit operating system.

## <a name="#installation"> Installation </a>

### Materials Required

1. Raspberry Pi 4 or 5
2. Micro SD Card (8GB min, 16GB recommended)
3. A computer with the Raspberry Pi Imager (<a href="https://www.raspberrypi.com/software/">Download Here</a>)

### Install the Raspberry Pi Lite OS onto the SD card using the Imager

After installing and opening the Imager on your computer, click on choose OS and scroll down to where it says "Other" . Look for the 64 bit Lite version of the OS and select it. Then write that OS to your Micro SD card, there will be a pop up asking if you wish to preconfigure settings such as your hostname, I suggest configuring the following...

- hostname
- username
- password
- enable SSH
- timezone & language
- wifi settings

After you have preconfigured your settings you can continue with the writing process. Once the OS is done being written, you can insert the SD card into the Raspberry Pi and remote into is using SSH.
