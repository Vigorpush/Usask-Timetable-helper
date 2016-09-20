## Setting up Eclipse


### Installing Javascript support
- Help->Install new software->(Dropdown menu)->Select your update site -> `Neon - http://download.eclipse.org/releases/neon`
	- The update site is differnet depending on your version of eclipse. If you have Juno, look for `Juno - http://download.eclipse.org/releases/juno`
- Select **Programming languages** -> **JavaScript Development Tools**
- Near the bottom, click `Next` button and install the plugin
- This [stackoverflow answer](http://stackoverflow.com/a/15772176/2089675) can assist you with the installation


### Installing Git

- Use [this link](https://marketplace.eclipse.org/content/egit-git-team-provider) to install EGit
- Simply drag the `install` button to your eclipse workspace


### Install Aptana plugin
- http://www.aptana.com/products/studio3/success_plugin.html

------------------------------------------------------------------

### Setting up ssh connection to gitlab (this allows you to commit and push)

#### Setting up SSH on Gitlab
- Use the following [link][gen ssh] to generate an ssh key which can be used for gitlab (save it somewhere you can remember, eg `/V/ssh/id_rsa_gitlab`)
- On gitlab.com, click your profile and select `profile settings`, then `SSH keys`
- Open the file where your ssh key was generated (open the one ending in `.pub`)
- Copy the contents of that file and paste it into gitlab
- Optionally give it a name, then add the key


#### Setting up SSH on eclipse
- https://wiki.eclipse.org/EGit/User_Guide


------------------------------------------------------------------

### Debugging issues with git on eclipse
If for some reason, something goes wrong with pushing, you can try these steps

- Right-click the project and select `Team` -> `Disconnect`
- Right-click the project again and select `Team` -> `Share project` -> `Git` -> Select the repo and press `Finish`

------------------------------------------------------------------

### Misc

#### Pushing changes to gitlab
- Pull first before trying to push changes
- Save changes and added into Staged Changes, then Commit and push
- If those succeed, then you will get message from slack.

#### How to set user Author and Committer?
- `Windows` -> `Preferences` -> `Team` -> `git` -> `Configuration`
- Under `User Settings` or `Repository Settings` -> `Add Entry`
- To add your name, the key is `user.name` -> Enter your Gitlab name
- To add your email, the key is `user.email` -> Enter your Gitlab email

[gen ssh]: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

------------------------------------------------------------------

#### Tamper Monkey Documentation
- https://tampermonkey.net/documentation.php

------------------------------------------------------------------

#### Tamper Monkey - Greasy Fork - safe and useful user scripts
- https://greasyfork.org/en
- https://openuserjs.org/

------------------------------------------------------------------

#### How to set SSH into Linux machine
- http://www.codeproject.com/Articles/497728/HowplustoplusUseplusSSHplustoplusAccessplusaplusLi
- this will be similar with setting the SSH in WINOWS
