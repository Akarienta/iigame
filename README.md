# I&I Game

#### Table of Contents
1. [About](#about)
	1. [Connection with Manna](#connection-with-manna)
	1. [Disclaimer](#disclaimer)
	1. [Use Cases](#use-cases)
1. [Demo](#demo)
1. [Installation](#installation)
1. [Usage Howto](#usage-howto)
	1. [Initial Startup](#initial-startup)
	1. [Passwords Setup](#passwords-setup)
	1. [Passwords Check](#passwords-check)
	1. [Forgotten Password](#forgotten-password)
	1. [Changing Password](#changing-password)
	1. [Changing E-mail](#changing-e-mail)
	1. [Account Deletion](#account-deletion)
	1. [Re-enabling and Re-disabling Users Creation](#re-enabling-and-re-disabling-users-creation)
1. [What's in Plan](#whats-in-plan)
1. [Changelog](#changelog)
1. [License](#license)

## About
Everyone needs relaxing sometimes, almost everyone loves sex and most of us like playing games. This app is here to connect all these three things together and improve your sexual experiences.

### Connection with Manna
[Manna Francis](http://www.mannazone.org/) wrote a great fiction called The Administration and this app is loosely inspired by it. However, if you haven't read it it doesn't matter - I can highly recommend it but it doesn't affort usage of this app. Only name of Investigation & Interrogation division was taken from the fiction and this is exactly what this app is about. Of course, if you are fan of Manna's work, feel free to name your accounts after Toreth and Warrick :-)

### Disclaimer
**Warning:** If you know nothing about BDSM or don't like it, this app probably isn't for you. The same thing is when you are under 18 or simply under law in your country. Anyway, author doesn't take any consequences for possible injury got by usaging this app.

### Use Cases
#### ...if your are dom (top)
Your partner knows a secret password. He/she thinks that he/she will never ever tell you even if you do whatever you are able to, whatever you can or whatever you want to do. Do you think he/she is right?

#### ...if you are sub (bottom)
You know a secret password and your partner really wants to know. He/she can do whatever is able to, whatever he/she can and whatever he/she wants to do. Oh, really? God be with you.

This app is here to help you realize this scenario. It helds the passwords and is able to validate them. No cheats, no mistakes, simply setup, short preparation - just you, your partner and your investigation and interrogation game. And computer or mobile phone, of course. 

## Demo
Demo of this app can be found [here](https://iigame-demo.firebaseapp.com). **The demo isn't set for your game** so don't use it that way. Everybody can delete your passwords or accounts anytime there.

You can see the app and try it there. If you like the app and want to have your own copy please see the installation section.

## Installation
Installation is simple and doesn't require any technical knowledge or payment. Everyone can deploy and use their own copy absolutely free. If you are interested please follow the steps below.

1. You need a Firebase account. If you don't have one you can create it for free [here](https://www.firebase.com/signup) (Google account is required).
1. Create new Firebase app on your [dashboard](https://www.firebase.com/account). You will use your Firebase app name again during the installation.
1. If you don't have installed [Node.js](https://nodejs.org) yet, do it now. Don't forget to add `npm` on `PATH` during the installation if you are using Windows. 
1. Open your terminal or command line and install Firebase Tools by command `npm install -g firebase-tools`. If you see the error saying that command npm hasn't been found you probably didn't add `npm` on the system `PATH`. Fix it or reinstall Node.js in this case.
1. Download I&I Game files. All of them are placed in `dist` folder on this web and on [releases page](https://github.com/akarienta/iigame/releases) ([download the last release now](https://github.com/akarienta/iigame/releases/download/1.0.0/iigame.zip)).
1. Open file `firebase.json` and:
   * Change variable named `firebase` to your own Firebase app name from the step 2.
   * *[Optional]* If you are interested you can also change the app language here - it is done by variable `language`. Supported languages are **en** (English) and **cs** (Czech) for now. If you wish to translate the app into another language please write me an e-mail on <akarienta@gmail.com>.
   * *[Optional]* You can also setup behaviour of alerts here. If you wish to keep relevant alerts visible until you close them, set a variable `alertsHistory` to `true`. If you keep it as `false`, every new alert overwrites the old one and you see one alert only everytime.
1. You are almost done. Before you continue please doublecheck your `firebase.json` file. You should see something like this (this is a conf file of the demo app):
 
 ```
{
      "firebase": "iigame-demo",
      "language": "en",
      "alertsHistory": false,
      "public": ".",
      "rules": ".security_allowed.json"
}
```
1. If you wish to deploy the app now type this command: `firebase deploy`.
1. You can open your app by command `firebase open` or by visiting site `https://<your-firebase-app-name>.firebaseapp.com`.
   * *[Optional]* App can be removed from internet anytime by command `firebase disable:hosting`.
1. Please check Usage Howto section to learn how to use the app and perform initial startup steps.

## Usage Howto
App has two menus, the left menu contains game items, the right menu contains settings items. 

Once you have installed your own copy you are required to make **initial startup** steps. Then you can perform **passwords setup** steps and **password checking** whenever you want. 

There are also some other use cases, please read the doc bellow to discover them.

#### Initial Startup
1. Go to **Right Menu > Users** and create user accounts there. You need at least one account for dom/top and one account for sub/bottom.
1. Disable creation of new accounts by instructions given.   

#### Passwords Setup
1. Log in in with your sub/bottom account on page **Right Menu > Log In**. 
1. Go to **Left Menu > Passwords** and setup your passwords here. You can setup as many passwords as you want. Every password can be set as real or fake - it depends what behaviour you want to set up for the password phrase. You can use fake passwords to provoke your dom/top partner and real passwords to end the game. 
1. If you want to delete some passwords use trash icon on the end of the line of the password you want to delete. 
1. Don't forget to log out on page **Right Menu > Log Out**.

#### Passwords Check
1. This action doesn't require to be logged in into the app.
1. Go to **Left Menu > Home** (this is also the app homepage).
1. Every user account (user role doesn't matter) can be used as an employer username. This is here only for fun to improve the feeling from role playing.
1. Both real and fake passwords can be used as an employer password. This is not connected with real user account passwords - you can log in there only with passwords from **Left Menu > Passwords** section. 
1. If you don't know any password, don't waste your time with this app and try to ask your sub/bottom partner. If he/she knows, he/she must tell, get it done. :-)
1. You can be pissed off with fake password. Whenever you enter some of the fake passwords a derisive message is shown and you have to try again better. 
1. Whenever you enter some of the real passwords the game is over, uh, at least within the scope of this app. :-)

#### Forgotten Password
1. Go to **Right Menu > Log In**.
1. There is a link placed to password reset on the bottom of Log In Form - use it.
1. Fill in the given form. You will recieve an e-mail with temporary password.
1. Temporary password can be used to log in and then you can change your password as it is described bellow. This temporary password is valid for 24 hours and then is destroyed. Your old password is still valid throughout this time until you change it. 
1. Once you change the password the old one as well as the temporary one are destroyed immediately.

#### Changing Password
1. Log in on page **Right Menu > Log In**. 
1. Go to **Right Menu > Settings** and select option **Change Password**.
1. You can log out on page **Right Menu > Log Out**.

#### Changing E-mail
1. Log in on page **Right Menu > Log In**. 
1. Go to **Right Menu > Settings** and select option **Change E-mail**.
1. You can log out on page **Right Menu > Log Out**.

#### Account Deletion
1. Only user himself/herself can delete his/her account. There is no option how to do it as admin without knowing the user password.
1. Log in on page **Right Menu > Log In**.
1. Go to **Right Menu > Settings** and select option **Change Password**.
1. You can log out on page **Right Menu > Log Out**.

#### Re-enabling and Re-disabling Users Creation
1. To perform this action you need to have access into Firebase where the app is installed.
1. Log in on page **Right Menu > Log In**. 
1. Go to **Right Menu > Users**. Follow the instructions. 
1. Don't forget to log out on page **Right Menu > Log Out**.

## What's in Plan
* more translations
* countdown timer
  
## Changelog
* 1.0.0 - The First Release

## License
[The MIT License](https://github.com/akarienta/iigame/blob/master/LICENSE.md)
